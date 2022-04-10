using System;
using pmt_auth.Contexts;
using pmt_auth.Models;
using pmt_auth.Util;

namespace pmt_auth.Services
{
  public class UserApi
  {

    private UserContext _ctx;

    public UserApi(UserContext ctx)
    {
      _ctx = ctx;
    }

    public void RegisterUser(UserDTO user)
    {
      try
      {
        byte[] passwordHash = HashUtil.GenerateHash(user.Password);
        User userInstance = new User
        {
          FirstName = user.FirstName,
          UserId = user.UserId,
          PasswordHash = passwordHash,
          LastName = user.LastName,
          Email = user.Email
        };
        _ctx.Add(userInstance);
        _ctx.SaveChanges();
      }
      catch
      {
        throw;
      }
    }

    public User? GetUser(string userName)
    {
      return _ctx.Users.FirstOrDefault(u => u.UserId.ToLower() == userName.ToLower());
    }
  }
}

