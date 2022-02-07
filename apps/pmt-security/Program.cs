using Microsoft.EntityFrameworkCore;
using pmt_security.Contexts;

var builder = WebApplication.CreateBuilder(args);

// Add app settings json
// builder.Configuration.AddJsonFile("appsettings.json");

// Add services to the container.
String corsPolicy = "MY_CORS";
builder.Services.AddCors(options => {
    options.AddPolicy(name: corsPolicy,
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:4200");
                      });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Entity Framework
builder.Services.AddDbContext<UserContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("postgres")));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
  var services = scope.ServiceProvider;

  var context = services.GetRequiredService<UserContext>();
  context.Database.EnsureCreated();
}

app.UseCors(corsPolicy);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
