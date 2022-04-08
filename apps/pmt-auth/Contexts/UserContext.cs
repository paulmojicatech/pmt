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


  }
}

