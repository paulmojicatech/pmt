using System;
using pmt_auth.Contexts;
using pmt_auth.Models;

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
        byte[] passwordHash = System.Text.Encoding.UTF8.GetBytes(user.Password);
        User userInstance = new User
        {
          FirstName = user.FirstName,
          UserName = user.UserName,
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


  }
}

