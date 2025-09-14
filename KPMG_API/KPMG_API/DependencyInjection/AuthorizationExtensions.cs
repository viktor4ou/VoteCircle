using API.Data.Constants;

namespace KPMG_API.DependencyInjection
{
    public static class AuthorizationExtensions
    {
        public static IServiceCollection AddAuthorizationPolicies(this IServiceCollection services)
        {
            services.AddAuthorization(o =>
            {
                o.AddPolicy("AdminOnly", p => p.RequireRole(UserRole.Admin));
                o.AddPolicy("UserOnly", p => p.RequireRole(UserRole.User));
            });
            return services;
        }
    }
}
