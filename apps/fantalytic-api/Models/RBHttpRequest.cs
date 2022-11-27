using System;
namespace Pmt.FantalyticApi.Models
{
  public class RBHttpRequest
  {
    public IEnumerable<RB> Rbs { get; set; }
  }

  public class RBHttpDeleteRequest
  {
    public int Year { get; set; }
  }
}

