namespace KPMG_API.DependencyInjection
{
    public static class CORSExtensions
    {
        public static IServiceCollection AddCORSPolicy(this IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("AllowReactApp",
            policy => policy.WithOrigins("http://localhost:5174", "http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()));
            return services;
        }
    }
}
