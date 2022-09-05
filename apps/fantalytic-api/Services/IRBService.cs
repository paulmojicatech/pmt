using System;
using System.Collections.Generic;
using Pmt.FantalyticApi.Models;

namespace Pmt.FantalyticApi.Services
{
  public interface IRBService
  {
    Task<IEnumerable<RB>> GetRBs();
    Task AddRBs(IEnumerable<RB> rbs);

  }
}

