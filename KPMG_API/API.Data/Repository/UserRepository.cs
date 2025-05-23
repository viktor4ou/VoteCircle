using API.Data.Data;
using API.Data.Interfaces;
using API.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext db;

        public UserRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        public async Task AddAsync(ApplicationUser entity)
        {
            await db.Users.AddAsync(entity);
        }

        public void Delete(ApplicationUser entity)
        {
            db.Users.Remove(entity);
        }

        public async Task<IEnumerable<ApplicationUser>> GetAllAsync()
        {
            return await db.Users.ToListAsync();
        }

        public Task<ApplicationUser> GetUserByRefreshTokenAsync(string refreshToken)
        {
            return db.Users
                .Include(u => u.RefreshTokens)
                .SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));
        }

        public Task SaveChangesAsync()
        {
            return db.SaveChangesAsync();
        }

        public void Update(ApplicationUser entity)
        {
            db.Users.Update(entity);
        }
    }
}
