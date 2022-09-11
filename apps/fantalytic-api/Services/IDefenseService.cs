using System;
using Pmt.FantalyticApi.Models;

namespace Pmt.FantalyticApi.Services
{
  public interface IDefenseService
  {
    Task AddDefenses(IEnumerable<Defense> defenses);
    Task<IEnumerable<Defense>> GetDefenses();
  }
}

