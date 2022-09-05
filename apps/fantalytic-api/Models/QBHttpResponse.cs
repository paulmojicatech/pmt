using System;
namespace Pmt.FantalyticApi.Models
{
  public class QBHttpResponse
  {

    public QBHttpResponse(IEnumerable<QB> qbItems)
    {
      Qbs = qbItems;
    }

    public IEnumerable<QB> Qbs { get; set; }
  }
}

