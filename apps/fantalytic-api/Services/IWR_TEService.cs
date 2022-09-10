using System;
using Pmt.FantalyticApi.Models;

namespace Pmt.FantalyticApi.Services
{
  public interface IWR_TEService
  {
    Task<IEnumerable<WR_TE>> GetWRTEs();
    Task AddWRTEs(IEnumerable<WR_TE> recs);
  }
}

