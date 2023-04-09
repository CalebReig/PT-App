import Link from 'next/link';
import styles from './styles/Navbar.module.css';
import { useState } from 'react';

export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false);

  const toggleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles['navbar-logo']}>
            <Link href="/" className={styles.navbarLink}>
              PT App
            </Link>
            <button className={styles['navbar-dropdown']} onClick={toggleShowLinks} >
              <span className={styles['navbar-dropdown-icon']}>Menu</span>
            </button>
        </div>
        <ul className={showLinks ? styles['navlinks-true']: styles['navlinks-false']}>
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
            <Link href="/products" className={styles.navbarLink}>
              Products
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