using CarShare.Data;
using CarShare.Repositories;
using CarShare.Repository;
using CarShare.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using CarShare.Hubs;


public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    // Register services here
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddDbContext<AppDbContext>(options =>
        options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

        // Swagger with JWT support
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "CarShare API", Version = "v1" });

            var jwtSecurityScheme = new OpenApiSecurityScheme
            {
                BearerFormat = "JWT",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                Description = "Input your Bearer token below:",
                Reference = new OpenApiReference
                {
                    Id = JwtBearerDefaults.AuthenticationScheme,
                    Type = ReferenceType.SecurityScheme
                }
            };

            options.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                { jwtSecurityScheme, Array.Empty<string>() }
            });
        });

        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", builder =>
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader());
        });

        // Repositories
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ICarRepository, CarRepository>();
        services.AddScoped<IFeedbackRepository, FeedbackRepository>();
        services.AddScoped<IUserRequest, UserRequest>();
        services.AddScoped<IProposalRepository, ProposalRepository>();

        // Services
        services.AddScoped<IAuthService, AuthService>();


        // Authentication
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(Configuration["Jwt:Key"] ?? "my_super_secret_key_don't_tell_anyone"))
                };
            });

        services.AddAuthorization();

        services.AddSignalR();

        services.AddRazorPages();
    }

    public void Configure(WebApplication app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseStaticFiles();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();
        app.MapHub<NotificationHub>("/notificationhub");

    }
}
