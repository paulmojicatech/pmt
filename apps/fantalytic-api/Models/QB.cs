using System;
using System.ComponentModel.DataAnnotations;

namespace Pmt.FantalyticApi.Models
{
  public class QB
  {
    [Key]
    public Guid Id
    { get; set; }

    public string Player
    {
      get; set;
    }

    public int Week
    { get; set; }

    public int Year
    { get; set; }

    public int PassingYds
    { get; set; }

    public int Ints
    { get; set; }

    public float PassingYdsPerAttempt
    {
      get; set;
    }

    public int Tds
    { get; set; }

  }
}

