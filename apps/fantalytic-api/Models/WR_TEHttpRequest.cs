using System;
namespace Pmt.FantalyticApi.Models
{
  public class WR_TEHttpRequest
  {
    public IEnumerable<WR_TE> Receivers { get; set; }
  }

  public class WR_TEHttpDeleteRequest
  {
    public int Year { get; set; }
  }
}

