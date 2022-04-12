using Microsoft.EntityFrameworkCore;
using pmt_auth.Contexts;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers().AddJsonOptions(option => option.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase);

// CORS
builder.Services.AddCors(option => option.AddPolicy("localhost", policy => policy.WithOrigins("http://localhost:4200")));


// Entity Framework
builder.Services.AddDbContext<UserContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("postgres")));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

// Entity Framework
using (var scope = app.Services.CreateScope())
{
  var services = scope.ServiceProvider;

  var context = services.GetRequiredService<UserContext>();
  context.Database.EnsureCreated();
}
// CORS
app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();


