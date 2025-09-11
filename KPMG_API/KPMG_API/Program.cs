using API.Models.Models;
using FluentValidation;
using KPMG_API.DependencyInjection;
using KPMG_API.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Serilog;

namespace KPMG_API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services
            .AddServices()
            .ConfigureSwagger()
            .AddEndpointsApiExplorer()
            .AddValidatorsFromAssembly(typeof(Program).Assembly, includeInternalTypes: true)
            .AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies())
            .ConfigureIdentity()
            .AddCustomProblemDetails()
            .AddExceptionHandler<GlobalExceptionHandler>()
            .InjectDBContext(builder.Configuration)
            .AddCORSPolicy()
            .AddJWTAuthentication(builder.Configuration)
            .AddControllers();

        builder.Host.UseSerilogConfiguration();
        var app = builder.Build();

        app.UseSerilogRequestLogging();
        app.ConfigureSwaggerExporer();
        app.UseCors("AllowReactApp");
        app.UseExceptionHandler();
        app.MapGroup("/Identity").MapIdentityApi<ApplicationUser>();
        app.UseAuthorization();
        app.MapControllers();
        
        app.Run();
    }
}

