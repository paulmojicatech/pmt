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

    public void AddDefenses(IEnumerable<Defense> defenses)
    {
      try
      {
        foreach (Defense def in defenses)
        {
          _ctx.Defenses.Add(def);
        }

        _ctx.SaveChanges();
      }
      catch
      {
        throw;
      }
    }

    public IEnumerable<Defense> GetDefenses()
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

    public void DeleteDefenses(int year)
    {
      try
      {
        _ctx.Defenses.RemoveRange(_ctx.Defenses.Where(def => def.Year == year));
        _ctx.SaveChanges();
      }
      catch
      {
        throw;
      }
    }
  }
}

