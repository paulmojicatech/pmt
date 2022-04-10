using System;
using pmt_auth.Contexts;
using pmt_auth.Models;
using pmt_auth.Util;

namespace pmt_auth.Services
{
  public class TokenApi
  {
    private TokenContext _ctx;

    public TokenApi(TokenContext ctx)
    {
      _ctx = ctx;
    }

    public Token GetAccessToken(byte[] persistedPassword, string passwordToValidate)
    {
      Token token;
      bool isValidatedPassword = HashUtil.CompareHash(persistedPassword, passwordToValidate);
      string accessToken = System.Text.Encoding.UTF8.GetString(HashUtil.GenerateHash(Guid.NewGuid().ToString()));
      if (isValidatedPassword)
      {
        token = new Token
        {
          AccessToken = accessToken,
          ExpiresDate = DateTime.Now.AddDays(60)
        };
        return token;
      }
      throw new Exception();
    }
  }
}

