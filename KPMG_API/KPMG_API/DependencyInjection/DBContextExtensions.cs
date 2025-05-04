using API.Data.Data;
using Microsoft.EntityFrameworkCore;

namespace KPMG_API.DependencyInjection
{
    public static class DBContextExtensions
    {
        public static IServiceCollection InjectDBContext(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(config.GetConnectionString("DefaultConnection")));
            return services;
        }
    }
}
