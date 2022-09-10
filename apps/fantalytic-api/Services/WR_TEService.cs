using System;
using Pmt.FantalyticApi.Models;

namespace Pmt.FantalyticApi.Services
{
  public class WR_TEService : IWR_TEService
  {
    private FantalyticContext _ctx;

    public WR_TEService(FantalyticContext ctx)
    {
      _ctx = ctx;
    }

    public async Task AddWRTEs(IEnumerable<WR_TE> recs)
    {
      try
      {
        foreach (WR_TE rec in recs)
        {
          _ctx.WRs_TEs.AddAsync(rec);
        }
        await _ctx.SaveChangesAsync();
      }
      catch
      {
        throw;
      }
    }

    public async Task<IEnumerable<WR_TE>> GetWRTEs()
    {
      try
      {
        return _ctx.WRs_TEs.ToList() ?? new List<WR_TE>();
      }
      catch
      {
        throw;
      }

    }
  }
}

