using System;
using System.Security.Cryptography;

namespace pmt_auth.Util
{
  public static class HashUtil
  {
    public static byte[] GenerateHash(string valueToHash)
    {
      byte[] passwordHash;

      using (var hmac = new HMACSHA512())
      {
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(valueToHash));
      }

      return passwordHash;
    }

    public static bool CompareHash(byte[] persistedValue, string valueToValidate)
    {
      byte[] hashedValue = GenerateHash(valueToValidate);
      return hashedValue == persistedValue;
    }

  }
}

