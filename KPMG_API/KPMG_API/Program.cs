using FluentValidation;
using KPMG_API.DependencyInjection;
using KPMG_API.Exceptions;
using Serilog;

namespace KPMG_API;

public class Program
{
    public static void Main(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);
        builder.Services
            .AddServices()
            .AddIdentity()
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
            .AddAuthorizationPolicies()
            .AddControllers();


        builder.Host.UseSerilogConfiguration();
        var app = builder.Build();
        app.UseSerilogRequestLogging();
        app.UseRouting();
        app.ConfigureSwaggerExporer();
        app.UseCors("AllowReactApp");
        app.UseExceptionHandler();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}

