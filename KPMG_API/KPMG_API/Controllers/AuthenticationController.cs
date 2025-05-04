using API.Models.DTOs.Authentication;
using API.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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

        public AuthenticationController(SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration config)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.config = config;
        }
        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(SignInDTO signInDTO)
        {
            var user = await userManager.FindByEmailAsync(signInDTO.Email);
            if (user == null || !(await userManager.CheckPasswordAsync(user, signInDTO.Password)))
            {
                return BadRequest("Username or password is incorrect");
            }

            var signInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["AppSettings:JWTSecret"]!));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                [
                    new Claim("UserId", user.Id.ToString())
                ]),
                Expires = DateTime.UtcNow.AddMinutes(10),
                SigningCredentials = new SigningCredentials(signInKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(securityToken);
            return Ok(new { token });
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout([FromBody] object empty)
        {
            if (empty != null)
            {
                await signInManager.SignOutAsync();
                return Ok();
            }
            return Unauthorized();
        }

    }
}
