var builder = WebApplication.CreateBuilder(args);
var startup = new Startup(builder.Configuration);
startup.ConfigureServices(builder.Services);


var app = builder.Build();
app.UseCors("AllowAll");
startup.Configure(app, app.Environment);

app.Run();
