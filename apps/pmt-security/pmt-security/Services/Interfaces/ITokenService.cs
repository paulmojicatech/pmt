using System;
namespace pmt_security.Services.Interfaces
{
  public interface ITokenService
  {
    bool Authenticate(string user, string password);
  }
}

