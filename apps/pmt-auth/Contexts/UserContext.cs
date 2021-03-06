using System;
using Microsoft.EntityFrameworkCore;
using pmt_auth.Models;

namespace pmt_auth.Contexts
{
  public class UserContext : DbContext
  {
    public UserContext(DbContextOptions<UserContext> options)
            : base(options)
    {
    }

    public DbSet<User>? Users { get; set; }
    public DbSet<Role>? Roles { get; set; }
    public DbSet<Token>? Tokens { get; set; }
    public DbSet<UserRoles>? UserRoles { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<User>()
        .HasMany<Role>(u => u.Roles)
        .WithMany(u => u.Users)
        .UsingEntity<UserRoles>()
        .HasKey(ur => new { ur.UserId, ur.RoleId });
    }
  }
}

