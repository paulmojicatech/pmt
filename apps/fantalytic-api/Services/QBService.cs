using System;
using Pmt.FantalyticApi.Models;

namespace Pmt.FantalyticApi.Services
{
  public class QBService : IQBService
  {
    private FantalyticContext _qbContext;

    public QBService(FantalyticContext ctx)
    {
      _qbContext = ctx;
    }

    public async Task<IEnumerable<QB>> GetQBs()
    {
      try
      {
        return _qbContext.QBs.ToList();
      }
      catch
      {
        throw;
      }

    }

    public async Task AddQBs(IEnumerable<QB> qbs)
    {
      try
      {
        foreach (QB qb in qbs)
        {
          await _qbContext.AddAsync(qb);
        }
        _qbContext.SaveChanges();
      }
      catch
      {
        throw;
      }
    }

  }
}

