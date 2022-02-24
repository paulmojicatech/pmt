import PmtHeader from '../../components/header/header';
import PmtFooter from '../../components/footer/footer';
import style from './payment.module.scss';
import { Fragment } from 'react';

export const Payment = () => {
  return (
    <Fragment>
      <PmtHeader backgroundUrl="./images/payments.jpg" />
      <main className={style.container}>
        <h3>Make a Payment</h3>
        <p>
          {`To make a payment with your credit card, click the link below. You'll
          be taken to PayPal's Website, where you can complete the payment to me
          safely and securely.`}
        </p>
        <a
          href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=DGD2XS6K2ZZEE"
          target={'blank'}
        >
          {`Pay Now Via PayPal`}
        </a>
      </main>
      <PmtFooter />
    </Fragment>
  );
};

export default Payment;
