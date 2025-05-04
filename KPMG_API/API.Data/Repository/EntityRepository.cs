using API.Data.Data;
using API.Data.Interfaces;
using API.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repository
{
    public class EntityRepository : Repository<Entity>, IEntityRepository
    {
        public EntityRepository(ApplicationDbContext db) : base(db)
        {
        }

        public async Task<Entity> GetByIdAsync(int id)
        {
            return await set.FirstOrDefaultAsync(e => e.Id == id);
        }
        public async Task<IEnumerable<Entity>> GetAllOrderByIdAsync()
        {
            return await set.OrderBy(x => x.Id).ToListAsync();
        }

        public async Task<IEnumerable<Entity>> GetAllEntitesBySessionId(int sessionId)
        {
            return await set.Where(x => x.VotingSessionId == sessionId).ToListAsync();
        }
    }
}
