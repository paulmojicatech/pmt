using System;
using System.Security.Cryptography;
using System.Text;

namespace pmt_auth.Util
{
  public static class HashUtil
  {
    public static void GenerateHash(string valueToHash, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using (var hmac = new HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(valueToHash));
      }
    }

    public static bool CompareHash(string persistedValue, byte[] passwordHash, byte[] passwordSalt)
    {

      using (var hmac = new HMACSHA512(passwordSalt))
      {
        byte[] password = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(persistedValue));
        return password.SequenceEqual(passwordHash);
      }

    }

  }
}

