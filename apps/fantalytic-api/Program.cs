using Microsoft.EntityFrameworkCore;
using Pmt.FantalyticApi.Models;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Set up Postgres
string dbConn = builder.Configuration.GetConnectionString("Postgres");
builder.Services.AddDbContext<FantalyticContext>(options =>
  options.UseNpgsql(dbConn)
);

// Set up JsonSerializer
builder.Services.Configure<JsonSerializerOptions>(options =>
{
  options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});

// Set up CORS
// builder.Services.AddCors(options =>
// {
//   options.AddPolicy(name: "localhost",
//                      policy =>
//                      {
//                        policy.WithOrigins("http://localhost:4200", "capacitor://localhost", "http://localhost");
//                      });
// });
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(x => x
  .AllowAnyMethod()
  .AllowAnyHeader()
  .SetIsOriginAllowed(origin => true)
  .AllowCredentials());

app.UseAuthorization();

app.MapControllers();

app.Run();
