using API.Data.Constants;
using Microsoft.OpenApi.Models;

namespace KPMG_API.DependencyInjection
{
    public static class SwaggerExtensions
    {
        public static IServiceCollection ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Fill in the JWT token",
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                 {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new List<String>()
                    }
                 });
            });
            return services;
        }
        public static WebApplication ConfigureSwaggerExporer(this WebApplication app)
        {
            app.MapSwagger().RequireAuthorization(UserRole.Admin);
            app.UseSwagger();
            app.UseSwaggerUI();
            return app;
        }
    }
}
