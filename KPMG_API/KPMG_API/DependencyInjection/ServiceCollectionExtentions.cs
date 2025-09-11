using API.Data.Data;
using API.Data.Interfaces;
using API.Data.Repository;
using API.Models.Models;

namespace KPMG_API.DependencyInjection
{
    public static class ServiceCollectionExtentions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<IEntityRepository, EntityRepository>();
            services.AddScoped<IVotingSessionRepository, VotingSessionRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            return services;
        }

        public static IServiceCollection AddCustomProblemDetails(this IServiceCollection services)
        {
            services.AddProblemDetails(options =>
            {
                options.CustomizeProblemDetails = context =>
                {
                    context.ProblemDetails.Instance = $"{context.HttpContext.Request.Method} {context.HttpContext.Request.Path}";
                    context.ProblemDetails.Extensions.Add("requestId", context.HttpContext.TraceIdentifier);
                    context.ProblemDetails.Extensions.Add("date", DateTime.UtcNow.ToString("R"));
                };
            });
            return services;
        }
    }
}
