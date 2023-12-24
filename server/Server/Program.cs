using Server.Providers;

namespace Server;

using System.Reflection;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Server.Commands;
using Server.Context;
using Server.filters;
using Server.Routes;

public class Program
{
    static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        IConfiguration configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.local.json", true)
            .Build();

        var dbConnectionString = configuration.GetConnectionString("db");

        builder
            .Services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Authority = configuration["Auth0:Authority"];
                options.Audience = configuration["Auth0:Audience"];
            });
        builder.Services.AddHttpContextAccessor();

        builder
            .Services
            .AddDbContext<TodoDb>(options =>
            {
                options.UseSqlServer(dbConnectionString, b => b.MigrationsAssembly("Server"));
            });

        builder.Services.AddHealthChecks();
        builder.Services.AddEndpointsApiExplorer();
        builder
            .Services
            .AddSwaggerGen(options =>
            {
                options.SwaggerDoc(
                    "v1",
                    new OpenApiInfo { Version = "0.1.0", Title = "Backend Service" }
                );
                options.SchemaFilter<NullabilityFilter>();
                options.AddSecurityDefinition(
                    "Bearer",
                    new OpenApiSecurityScheme
                    {
                        Name = "Authorization",
                        Description = "JWT Authorization header using the Bearer scheme",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.Http,
                        Scheme = "bearer",
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    }
                );

                options.AddSecurityRequirement(
                    new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            new string[] { }
                        }
                    }
                );
            });
        builder
            .Services
            .AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });
        builder.Services.AddAuthorization();
        builder.Services.AddTransient<ITodoProvider, TodoProvider>();
        builder.Services.AddScoped<IUserContext, UserContext>();
        builder
            .Services
            .AddMediatR(
                config => config.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly())
            )
            .RegisterCommandHandlers<TodoDb>();
        builder.Services.AddAutoMapper(typeof(Program));

        var app = builder.Build();
        if (app.Configuration.GetValue<bool>("migrateDB"))
        {
            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<TodoDb>();
                await dbContext.Database.MigrateAsync();
            }
        }
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "V1");
        });
        app.UseCors();
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapHealthChecks("/healthz");
        app.MapGroup("/todo").MapTodoEndpoints();

        app.Run();
    }
}
