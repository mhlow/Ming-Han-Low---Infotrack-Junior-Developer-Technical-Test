using System.Runtime.CompilerServices;
using backend.Services;
using backend.Services.Interfaces;
// https://www.youtube.com/watch?v=5ZhlBJr95-4

namespace Startup;
public static class DependenciesConfig
{
    public static void AddDependencies(this WebApplicationBuilder builder)
    {
        // Add your dependencies here
        builder.Services.AddControllers();
        builder.Services.AddOpenApi();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddScoped<IPropertyService, PropertyService>();
    }
}