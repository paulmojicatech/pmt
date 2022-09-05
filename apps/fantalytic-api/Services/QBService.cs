using System;
using Pmt.FantalyticApi.Models;

namespace Pmt.FantalyticApi.Services
{
  public class QBService : IQBService
  {
    private QBContext _qbContext;

    public QBService(QBContext ctx)
    {
      this._qbContext = ctx;
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

