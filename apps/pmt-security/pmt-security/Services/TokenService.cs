
using System;
using pmt_security.Contexts;
using pmt_security.Models;
using pmt_security.Services.Interfaces;

namespace pmt_security.Services
{
  public class TokenService : ITokenService
  {

    private UserContext _ctx;
    public TokenService(UserContext ctx)
    {
      _ctx = ctx;
    }

    public bool Authenticate(string user, string password)
    {
      bool isAuthenticated = false;

      User? foundUser = _ctx.Users?.FirstOrDefault(u => u.UserName == user && u.IsActive);
      if (user == null)
      {
        return isAuthenticated;
      }

      return isAuthenticated;
      
 
    }

  }
}

