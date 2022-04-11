using System;
using pmt_auth.Contexts;
using pmt_auth.Models;
using pmt_auth.Util;

namespace pmt_auth.Services
{
  public class TokenApi
  {
    private UserContext _ctx;

    public TokenApi(UserContext ctx)
    {
      _ctx = ctx;
    }

    public Token CreateAccessToken(User userToValidate, string passwordToValidate)
    {
      Token token;
      try
      {
        if (userToValidate.Password == passwordToValidate)
        {
          HashUtil.GenerateHash(Guid.NewGuid().ToString(), out byte[] hashedAccessToken);
          string accessToken = Convert.ToBase64String(hashedAccessToken);
          token = new Token
          {
            AccessToken = accessToken,
            IssueDate = DateTime.UtcNow,
            ExpiresDate = DateTime.UtcNow.AddDays(60),
            UserName = userToValidate.UserId
          };
          _ctx.Add(token);
          _ctx.SaveChanges();
          return token;
        }
        throw new Exception("401");
      }
      catch
      {
        throw;
      }

    }

  }
}


