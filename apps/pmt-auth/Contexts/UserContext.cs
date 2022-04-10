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

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<User>()
        .HasMany<Role>(u => u.Roles)
        .WithMany(u => u.Users)
        .UsingEntity(ur => ur.ToTable("UserRoles"));
    }
  }
}

