using System;
using Microsoft.EntityFrameworkCore;
using pmt_auth.Models;

namespace pmt_auth.Contexts
{
  public class TokenContext : DbContext
  {
    public TokenContext(DbContextOptions<TokenContext> options) : base(options)
    {
    }

    public DbSet<Token> Tokens { get; set; }
  }
}

