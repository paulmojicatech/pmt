using System;
using System.Security.Cryptography;

namespace pmt_security
{
  public static class Util
  {
    public static byte[] GenerateHash(string plainText)
    {
      byte[] passwordHash;
      using (var hmac = new HMACSHA512())
      {
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(plainText));
      }
      return passwordHash;
    }
  }
}

