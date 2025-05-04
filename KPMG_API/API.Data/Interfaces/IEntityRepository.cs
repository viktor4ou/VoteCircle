using API.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Data.Interfaces
{
    public interface IEntityRepository : IRepository<Entity>
    {
        public Task<Entity> GetByIdAsync(int id);
        public Task<IEnumerable<Entity>> GetAllOrderByIdAsync();
        public Task<IEnumerable<Entity>> GetAllEntitesBySessionId(int sessionId);
    }
}
