using System;
namespace Pmt.FantalyticApi.Models
{
  public class DefenseHttpRequest
  {
    public IEnumerable<Defense> Defenses { get; set; }
  }

  public class DefenseHttpDeleteRequest
  {
    public int Year { get; set; }
  }
}

