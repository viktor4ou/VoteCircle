using API.Data.Data;
using API.Models.Models;
using Microsoft.AspNetCore.Identity;

namespace KPMG_API.DependencyInjection
{
    public static class IdentityExtensions
    {
        public static IServiceCollection ConfigureIdentity(this IServiceCollection services)
        {
            services.Configure<IdentityOptions>(options =>
            {
                options.Lockout.AllowedForNewUsers = false;
                options.Lockout.MaxFailedAccessAttempts = int.MaxValue;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.Zero;
            });
            return services;
        }

        public static IServiceCollection AddIdentity(this IServiceCollection services)
        {
            services.AddIdentity<ApplicationUser, IdentityRole>() // move into extension method later
            .AddEntityFrameworkStores<ApplicationDbContext>();
            return services;
        }
    }
}
