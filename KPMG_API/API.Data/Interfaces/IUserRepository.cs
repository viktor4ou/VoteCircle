using API.Models.Models;

namespace API.Data.Interfaces
{
    public interface IUserRepository : IRepository<ApplicationUser>
    {
        public Task<ApplicationUser> GetUserByRefreshTokenAsync(string refreshToken);
    }
}
