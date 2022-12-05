using System;
using System.ComponentModel.DataAnnotations;

namespace Pmt.FantalyticApi.Models
{
  public class RB
  {

    [Key]
    public Guid Id { get; set; }

    public string Player { get; set; }
    public int RushingYds { get; set; }
    public int RushAttempts { get; set; }
    public int RushingTds { get; set; }
    public int Rushing20Yds { get; set; }
    public int Year { get; set; }
    public int Week { get; set; }
    public string? ImageUrl { get; set; }
  }
}

