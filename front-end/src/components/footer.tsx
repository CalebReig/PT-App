import Link from 'next/link';
import styles from './styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
          <div className={styles['footer-logo']}>
            <Link href="/">
                PT App
            </Link>
          </div>
          <ul>
            <li>
                <Link href="/content/exercises" className={styles.footerLink}>
                    Exercises
                </Link>
            </li>
            <li>
                <Link href="/content/diet" className={styles.footerLink}>
                    Diet
                </Link>
            </li>
            <li>
              <Link href="/pricing" className={styles.footerLink}>
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/products" className={styles.navbarLink}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.footerLink}>
                About
              </Link>
            </li>
          </ul>
        </footer>
      );
}