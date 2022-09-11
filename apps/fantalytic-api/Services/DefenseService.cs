using System;
using Pmt.FantalyticApi.Models;

namespace Pmt.FantalyticApi.Services
{
  public class DefenseService : IDefenseService
  {
    private FantalyticContext _ctx;

    public DefenseService(FantalyticContext ctx)
    {
      _ctx = ctx;
    }

    public async Task AddDefenses(IEnumerable<Defense> defenses)
    {
      try
      {
        foreach (Defense def in defenses)
        {
          _ctx.Defenses.Add(def);
        }

        await _ctx.SaveChangesAsync();
      }
      catch
      {
        throw;
      }
    }

    public async Task<IEnumerable<Defense>> GetDefenses()
    {
      try
      {
        return _ctx.Defenses.ToList();
      }
      catch
      {
        throw;
      }
    }
  }
}

