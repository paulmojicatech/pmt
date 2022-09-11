using System;
namespace Pmt.FantalyticApi.Models
{
  public class WR_TEHttpResponse
  {
    public WR_TEHttpResponse(IEnumerable<WR_TE> receivers)
    {
      Receivers = receivers;
    }

    public IEnumerable<WR_TE> Receivers { get; set; }
  }
}

