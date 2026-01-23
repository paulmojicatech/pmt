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

  async sendSignedForm(
    clientName: string,
    pdfBytes: Uint8Array,
    subject: string
  ): Promise<void> {
    try {
      // Convert PDF bytes to base64
      const base64Pdf = btoa(
        Array.from(pdfBytes)
          .map((byte) => String.fromCharCode(byte))
          .join('')
      );

      const body = {
        subject: `${subject} - ${clientName}`,
        message: `Attached is the signed ${subject.toLowerCase()} for ${clientName}`,
        email: ['paulmojicatech@gmail.com', 'kirstin.abraham@marvintherapy.com'],
        attachment: {
          filename: `${subject.replace(/\s+/g, '-')}-${clientName.replace(/\s+/g, '-')}-${Date.now()}.pdf`,
          content: base64Pdf,
          contentType: 'application/pdf',
        }
      };

      await fetch(`${settings.AZURE_SEND_SIGNED_FORM_URL}`, {
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
