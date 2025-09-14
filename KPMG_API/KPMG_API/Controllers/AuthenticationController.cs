using API.Data.Constants;
using API.Data.Interfaces;
using API.Models.DTOs.Authentication;
using API.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace KPMG_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration config;
        private readonly IUserRepository userRepository;

        public AuthenticationController(
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration config,
            IUserRepository userRepository)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.config = config;
            this.userRepository = userRepository;
        }
        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(AuthenticationDTO dto) // Add automapper later
        {
            var user = new ApplicationUser
            {
                UserName = dto.Email,
                Email = dto.Email
            };
            var result = await userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description); // Add problem details later
                return BadRequest(new { Errors = errors });
            }
            await userManager.AddToRoleAsync(user, UserRole.User);
            return Ok("User created successfully");
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn([FromBody] AuthenticationDTO dto)
        {
            var user = await userManager.FindByEmailAsync(dto.Email);

            if (user == null || !(await userManager.CheckPasswordAsync(user, dto.Password)))
                return BadRequest("Username or password is incorrect");
            await userManager.AddToRoleAsync(user, UserRole.User);

            var jwtToken = await GenerateJwtTokenAsync(user);
            var refreshToken = GenerateRefreshToken();

            user.RefreshTokens.Add(refreshToken);
            userRepository.Update(user);
            await userRepository.SaveChangesAsync();

            SetRefreshTokenCookie(refreshToken);

            return Ok(new { Token = jwtToken });
        }

        [HttpPost("Refresh")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized("No refresh token. Please sign in!");

            var user = await userRepository.GetUserByRefreshTokenAsync(refreshToken);

            if (user == null)
                return Unauthorized("Invalid refresh token. Please sign in again!");

            var tokenEntry = user.RefreshTokens.Single(x => x.Token == refreshToken);
            if (tokenEntry.Expires < DateTime.UtcNow)
                return Unauthorized("Refresh token expired. Please sign in again!");

            // generate new tokens
            var newJwt = await GenerateJwtTokenAsync(user);
            var newRefresh = GenerateRefreshToken();

            // replace old with new
            user.RefreshTokens.Remove(tokenEntry);
            user.RefreshTokens.Add(newRefresh);
            userRepository.Update(user);
            await userRepository.SaveChangesAsync();

            SetRefreshTokenCookie(newRefresh);

            return Ok(new { Token = newJwt });
        }

        [HttpPost("Revoke")] // or Logout
        public async Task<IActionResult> Revoke()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("No token to revoke");

            var user = await userRepository.GetUserByRefreshTokenAsync(refreshToken);

            if (user == null)
                return Unauthorized();

            var token = user.RefreshTokens.Single(x => x.Token == refreshToken);
            user.RefreshTokens.Remove(token);
            userRepository.Update(user);
            await userRepository.SaveChangesAsync();

            Response.Cookies.Delete("refreshToken");
            return Ok();
        }

        private async Task<string> GenerateJwtTokenAsync(ApplicationUser user)
        {
            var roles = await userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["AppSettings:JWTSecret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: config["AppSettings:Issuer"],
                audience: config["AppSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private RefreshToken GenerateRefreshToken()
        {
            return new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.UtcNow.AddDays(30),
                Created = DateTime.UtcNow
            };
        }

        private void SetRefreshTokenCookie(RefreshToken refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = refreshToken.Expires,
                Secure = true,
                SameSite = SameSiteMode.None
            };
            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        }
    }
}
