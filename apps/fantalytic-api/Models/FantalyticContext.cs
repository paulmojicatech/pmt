using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Pmt.FantalyticApi.Models
{
  public class FantalyticContext : DbContext
  {
    public FantalyticContext(DbContextOptions<FantalyticContext> options) : base(options)
    {

    }

    public DbSet<QB> QBs { get; set; }
    public DbSet<RB> RBs { get; set; }
    public DbSet<WR_TE> WRs_TEs { get; set; }
    public DbSet<Defense> Defenses { get; set; }
  }


}

