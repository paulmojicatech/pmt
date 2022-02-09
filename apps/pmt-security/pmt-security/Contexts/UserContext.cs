using System;
using Microsoft.EntityFrameworkCore;
using pmt_security.Models;

namespace pmt_security.Contexts
{
  public class UserContext : DbContext
  {

    public UserContext(DbContextOptions<UserContext>options) : base(options) { }

    public DbSet<User>? Users { get; set; }
  }
}

