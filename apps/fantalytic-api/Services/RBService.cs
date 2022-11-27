using System;
using Pmt.FantalyticApi.Models;

namespace Pmt.FantalyticApi.Services
{
  public class RBService : IRBService
  {
    private FantalyticContext _context;

    public RBService(FantalyticContext ctx)
    {
      _context = ctx;
    }

    public async Task AddRBs(IEnumerable<RB> rbs)
    {
      try
      {
        foreach (RB rb in rbs)
        {
          await _context.AddAsync(rb);
        }
        _context.SaveChanges();
      }
      catch
      {
        throw;
      }
    }

    public async Task<IEnumerable<RB>> GetRBs()
    {
      return _context.RBs.ToList();
    }

    public void DeleteRBs(int year)
    {
      try
      {
        _context.RBs.RemoveRange(_context.RBs.Where(rb => rb.Year == year));
        _context.SaveChanges();
      }
      catch (Exception ex)
      {
        throw;
      }
    }
  }
}

