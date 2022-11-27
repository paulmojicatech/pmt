using System;
namespace Pmt.FantalyticApi.Models
{
  public class QBHttpRequest
  {
    public IEnumerable<QB> Qbs { get; set; }
  }

  public class QBHttpDeletRequest
  {
    public int Year { get; set; }
  }
}

