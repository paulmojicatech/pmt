using System;
using System.ComponentModel.DataAnnotations;

namespace Pmt.FantalyticApi.Models
{
  public class Defense
  {
    [Key]
    public Guid Id { get; set; }

    public string Team { get; set; }
    public int RushYdsAllowed { get; set; }
    public float YdsPerCarry { get; set; }
    public int RushTdsAllowed { get; set; }
    public float CompletionPctAllowed { get; set; }
    public int PassYdsAllowed { get; set; }
    public int Ints { get; set; }
    public int Sacks { get; set; }
    public int Year { get; set; }
    public int Week { get; set; }
    public string? ImageUrl { get; set; }
  }
}

