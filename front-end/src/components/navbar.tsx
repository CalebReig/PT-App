import Link from 'next/link';
import styles from './styles/Navbar.module.css';

export default function Navbar() {
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles['navbar-logo']}>PT App</div>
        <ul className={styles.navlinks}>
          <li>
            <Link href="/" className={styles.navbarLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/content/exercises" className={styles.navbarLink}>
              Exercises
            </Link>
          </li>
          <li>
            <Link href="/content/diet" className={styles.navbarLink}>
              Diet
            </Link>
          </li>
          <li>
            <Link href="/pricing" className={styles.navbarLink}>
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.navbarLink}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}