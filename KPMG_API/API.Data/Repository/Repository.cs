using API.Data.Data;
using API.Data.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace API.Data.Repository
{

    public abstract class Repository<T> : IRepository<T> where T : class
    {
        private ApplicationDbContext db;
        internal DbSet<T> set;
        protected Repository(ApplicationDbContext db)
        {
            this.db = db;
            set = db.Set<T>();
        }
        public void Add(T entity)
        {
            set.Add(entity);
        }

        public void Delete(T entity)
        {
            set.Remove(entity);
        }
        public void Update(T entity)
        {
            set.Update(entity);
        }

        public async Task SaveChangesAsync()
        {
            await db.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await set.ToListAsync();
        }

    }
}
