using System;
using System.ComponentModel.DataAnnotations;

namespace Pmt.FantalyticApi.Models
{
  public class WR_TE
  {
    [Key]
    public Guid Id { get; set; }

    public string Player { get; set; }
    public int Receptions { get; set; }
    public int ReceivingYds { get; set; }
    public int ReceivingTds { get; set; }
    public int Receiving20Plus { get; set; }
    public int Receiving40Plus { get; set; }
    public int ReceivingTargets { get; set; }
    public int Year { get; set; }
    public int Week { get; set; }

  }
}

