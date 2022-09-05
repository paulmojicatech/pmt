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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
