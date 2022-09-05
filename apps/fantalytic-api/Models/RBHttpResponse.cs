using System;
namespace Pmt.FantalyticApi.Models
{
  public class RBHttpResponse
  {
    public RBHttpResponse(IEnumerable<RB> rbs)
    {
      Rbs = rbs;
    }

    public IEnumerable<RB> Rbs
    {
      get; set;
    }
  }
}

