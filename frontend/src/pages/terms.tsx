import LastSection from '@/components/LastSection';
import styles from '../styles/terms.module.css';

import type { NextPage } from "next";

const Terms: NextPage = () => {
  return (
    <>
      <div className={styles.termsContainer}>
        <h2>Terms and Conditions</h2>
        <p>     
          1. Introduction  
          Welcome to Elego Prime. By accessing and using our website and services, you agree to comply with these Terms and Conditions. If you do not agree with these terms, please do not use our services.
          <br />
          2. Services  
          We offer repair, maintenance, and home improvement services. We reserve the right to modify or discontinue any service at any time without prior notice.
          <br />
          3. Bookings and Payments  
          - All bookings must be made through our website or direct contact.  
          - Prices may vary depending on the type of service and location.  
          - A deposit or advance payment may be required in some cases.
          <br />
          4. Cancellations and Refunds  
          - Cancellations must be made at least 24 hours in advance.  
          - Refunds will be processed according to our cancellation policy.  
          - In case of a no-show without prior notice, the payment may not be refunded.
          <br />
          5. Customer Responsibilities  
          - Provide accurate information about the service request.  
          - Ensure safe access to the location where the service will be performed.  
          - Comply with the agreed payments.
          <br />
          6. Warranty and Liability  
          - We strive to provide high-quality services but do not guarantee the resolution of unknown pre-existing issues.  
          - We are not responsible for indirect or unforeseen damages resulting from the use of our services.
          <br />
          7. Privacy  
          We respect your privacy and protect your personal data according to our Privacy Policy.
          <br />
          8. Modifications  
          We reserve the right to modify these Terms and Conditions at any time. Any changes will be posted on our website.
          <br />
          9. Contact  
          If you have any questions about these terms, you can contact us via elegoprime@gmail.com.com or (786) 490-3942 / (303) 596-2833.

          Effective Date: [Date]
        </p>
      </div>

      <LastSection />
    </>
  );
};

export default Terms;