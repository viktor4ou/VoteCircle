using Serilog;

namespace KPMG_API.DependencyInjection
{
    public static class SerilogExtensions
    {
        public static IHostBuilder UseSerilogConfiguration(this IHostBuilder hostBuilder)
        {
            hostBuilder.UseSerilog((context, services, loggerConfiguration) =>
            {
                loggerConfiguration
                    .ReadFrom.Configuration(context.Configuration)
                    .ReadFrom.Services(services)
                    .Enrich.FromLogContext();
            });
            return hostBuilder;
        }
    }
}
