import styles from '@/styles/Thankyou.module.css';

const ThankYouPage = () => {
    return (
        <section className={styles.thankYou}>
            <div className={styles.content}>
                <h1>Thank you for choosing DenverBartenders!</h1>
                <p>We look forward to serving you soon</p>
            </div>
        </section>
    );
};

export default ThankYouPage;