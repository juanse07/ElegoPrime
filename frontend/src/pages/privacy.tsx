import LastSection from '@/components/LastSection';
import styles from '../styles/privacy.module.css';

import type { NextPage } from "next";

const Terms: NextPage = () => {
  return (
    <>
      <div className={styles.privacyContainer}>
        <h2>Privacy Policy</h2>
        <p>     
        1. Introduction
        At Elego Prime we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website and use our services.
          <br />
          2. Information We Collect
            Personal Information: Name, email, phone number, address, and payment details.

            Technical Data: IP address, browser type, device information, and cookies.

            Service Data: Information about requested services and customer preferences.
          <br />
          3. How We Use Your Information
            We use your data to:

            Provide and manage our handyman services.

            Process payments and transactions.

            Improve our website and customer experience.

            Communicate with you regarding your inquiries or appointments.

            Comply with legal obligations.
          <br />
          4. Data Protection
            We implement security measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no online transmission is 100% secure.
          <br />
          5. Data Sharing
            We do not sell or rent your personal data. However, we may share information with:

            Service providers assisting in our business operations.

            Legal authorities if required by law.
          <br />
          6. Cookies and Tracking Technologies
            Our website uses cookies to enhance your browsing experience. You can modify your browser settings to decline cookies if preferred.
          <br />    
          7. Third-Party Links
            Our website may contain links to third-party websites. We are not responsible for their privacy practices.
          <br />
          8. Your Rights
            You have the right to:

            Access, update, or delete your personal data.

            Opt-out of marketing communications.

            Request information about how we process your data.
          <br />
          9. Policy Updates
            We may update this Privacy Policy from time to time. Any changes will be posted on this page.
            <br />
          10. Contact Us
            If you have any questions about this Privacy Policy, please contact us at [email] or [phone].

            Effective Date: [Date]
        </p>
      </div>

      <LastSection />
    </>
  );
};

export default Terms;