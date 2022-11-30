using System;
using Pmt.FantalyticApi.Models;

namespace Pmt.FantalyticApi.Services
{
  public interface IDefenseService
  {
    void AddDefenses(IEnumerable<Defense> defenses);
    IEnumerable<Defense> GetDefenses();
    void DeleteDefenses(int year);
  }
}

