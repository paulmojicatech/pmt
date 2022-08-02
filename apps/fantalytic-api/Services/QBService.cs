using System;
using Pmt.FantalyticApi.Models;

namespace Pmt.FantalyticApi.Services
{
  public class QBService : IQBService
  {
    public QBService()
    {
    }

    public Task<IEnumerable<QB>> GetQBs()
    {
      throw new NotImplementedException();
    }

    public Task AddQBs(IEnumerable<QB> qbs)
    {
      throw new NotImplementedException();
    }
  }
}

