namespace KPMG_API.DependencyInjection
{
    public static class AuthorizationExtensions
    {
        public static IServiceCollection AddAuthorizationPolicies(this IServiceCollection services)
        {
            services.AddAuthorization(o =>
            {
                o.AddPolicy("AdminOnly", p => p.RequireRole("Admin"));
                o.AddPolicy("UserOnly", p => p.RequireRole("User"));
            });
            return services;
        }
    }
}
