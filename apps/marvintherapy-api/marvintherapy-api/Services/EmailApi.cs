using System;
using System.Net;
using System.Net.Mail;
using marvintherapy_api.Services.Interfaces;

namespace marvintherapy_api.Services
{
  public class EmailApi : IEmailService
  {
    private string _smtpClient;
    private string _emailUser;
    private string _emailPwd;
    private int _port;

    public EmailApi(string smtpClient, string emailUser, string emailPwd, int port)
    {
      _smtpClient = smtpClient;
      _emailUser = emailUser;
      _emailPwd = emailPwd;
      _port = port;
    }

    public void SendEmail(string[] to, string subject, string message)
    {

      try
      {
        SmtpClient client = new SmtpClient(_smtpClient)
        {
          Port = _port,
          Credentials = new NetworkCredential(_emailUser, _emailPwd),
          EnableSsl = true
        };

        foreach (string recipent in to)
        {
          client.Send(_emailUser, recipent, subject, message);
        }
      }
      catch (Exception)
      {
        throw;
      }
    }
  }
}

