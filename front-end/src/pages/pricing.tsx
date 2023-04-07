import styles from '../styles/Pricing.module.css';

export default function Pricing() {
    return (
        <>
          <h1>Personal Training Packages</h1>
          <section className={styles.pricingSection}>
            <div className={styles.pricingOption}>
              <h2>Basic</h2>
              <p className={styles.price}>$50 / month</p>
              <ul className={styles.pricingList}>
                <li className={styles.pricingListItem}>One personalized workout plan per month</li>
                <li className={styles.pricingListItem}>One nutrition consultation per month</li>
                <li className={styles.pricingListItem}>Email support</li>
              </ul>
              <a href="#" className={styles.btn}>Get Started</a>
            </div>
            <div className={styles.pricingOption}>
              <h2>Advanced</h2>
              <p className={styles.price}>$100 / month</p>
              <ul className={styles.pricingList}>
                <li className={styles.pricingListItem}>Two personalized workout plans per month</li>
                <li className={styles.pricingListItem}>Two nutrition consultations per month</li>
                <li className={styles.pricingListItem}>Phone and email support</li>
              </ul>
              <a href="#" className={styles.btn}>Get Started</a>
            </div>
            <div className={styles.pricingOption}>
              <h2>Premium</h2>
              <p className={styles.price}>$200 / month</p>
              <ul className={styles.pricingList}>
                <li className={styles.pricingListItem}>Four personalized workout plans per month</li>
                <li className={styles.pricingListItem}>Four nutrition consultations per month</li>
                <li className={styles.pricingListItem}>Unlimited phone and email support</li>
              </ul>
              <a href="#" className={styles.btn}>Get Started</a>
            </div>
          </section>
        </>
      );
}