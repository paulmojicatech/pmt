using System;
using Pmt.FantalyticApi.Models;

namespace Pmt.FantalyticApi.Services
{
  public interface IQBService
  {
    Task<IEnumerable<QB>> GetQBs();
    Task AddQBs(IEnumerable<QB> qbs);
  }
}

