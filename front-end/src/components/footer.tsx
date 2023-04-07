import Link from 'next/link';
import styles from './styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
          <div className={styles['footer-logo']}>PT App</div>
          <ul>
            <li>
              <Link href="/" className={styles.footerLink}>
                Home
              </Link>
            </li>
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
              <Link href="/about" className={styles.footerLink}>
                About
              </Link>
            </li>
          </ul>
        </footer>
      );
}