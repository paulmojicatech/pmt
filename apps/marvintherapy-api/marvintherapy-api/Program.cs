using System.Text.Json;
using marvintherapy_api.Services;
using marvintherapy_api.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
  options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
// Add services to the container.
string corsPolicy = "MY_CORS";
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: corsPolicy,
                    builder =>
                    {
                      builder.WithHeaders("*");
                      builder.WithMethods("*");
                      builder.WithOrigins("*");
                    });
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
app.UseCors(corsPolicy);
app.Run();

