using System;
namespace Pmt.FantalyticApi.Models
{
  public class DefenseHttpResponse
  {

    public DefenseHttpResponse(IEnumerable<Defense> defenses)
    {
      Defenses = defenses;
    }

    public IEnumerable<Defense> Defenses { get; set; }
  }
}

