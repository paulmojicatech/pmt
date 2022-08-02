using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Pmt.FantalyticApi.Models
{
  public class QBContext : DbContext
  {
    public QBContext(DbContextOptions<QBContext> options) : base(options)
    {

    }

    public DbSet<QB> QBs { get; set; }

  }

  public class QB
  {
    public QB() { }

    [Key]
    public Guid Id
    { get; set; }

    public string Name
    {
      get; set;
    }

    public int Year
    { get; set; }

    public int PassingYds
    { get; set; }

    public int Ints
    { get; set; }

    public int PassingYdsPerAttempt
    {
      get; set;
    }

    public int TDs
    { get; set; }

  }
}

