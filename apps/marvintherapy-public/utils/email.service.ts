import * as settings from '../settings';

export class EmailService {
  private _sendEmailUrl = settings.sendEmailUrl;

  async requestAppointment(
    name: string,
    email: string,
    requestDate: string
  ): Promise<Response> {
    try {
      const body = JSON.stringify({ name, email, requestDate });
      const resp = await fetch(`${this._sendEmailUrl}appointments`, {
        method: 'POST',
        body,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': '*',
        },
      });
      return Promise.resolve(resp);
    } catch (ex) {
      return Promise.reject(ex);
    }
  }

  async sendMessage(
    name: string,
    email: string,
    phone: string,
    message: string
  ): Promise<void> {
    const body = {
      name,
      email,
      phone,
      message,
    };
    try {
      await fetch(`${settings.AZURE_SEND_EMAIL_URL}`, {
        method: 'POST',
        body: JSON.stringify(body),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': '*',
        },
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
