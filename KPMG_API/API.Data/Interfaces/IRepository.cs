using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace API.Data.Interfaces
{
    public interface IRepository<T>
    {
        public Task AddAsync(T entity);
        public void Delete(T entity);
        public void Update(T entity);
        public Task SaveChangesAsync();
        public Task<IEnumerable<T>> GetAllAsync();
    }
}
