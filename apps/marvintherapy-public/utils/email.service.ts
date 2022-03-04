import * as settings from '../settings';

export class EmailService {
  private _sendEmailUrl = settings.sendEmailUrl;

  async requestAppointment(
    name: string,
    email: string,
    requestDate: string
  ): Promise<void> {
    const body = JSON.stringify({ name, email, requestDate });
    await fetch(`${this._sendEmailUrl}appointments`, {
      method: 'POST',
      body,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
      },
    });
    return Promise.resolve();
  }
}
