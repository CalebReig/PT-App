import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
          <h1>Your Personal Trainer, Online</h1>
          <p>Get the best workout and nutrition guidance, wherever you are.</p>
          <Link href="/signup" className={styles.btn}>Start Your Free Trial</Link>
        </section>
        <section className={styles.features}>
          <div className={styles.feature}>
            <img src="exercise_image.jpeg" alt="Exercise Videos" />
            <h2>Exercise Videos</h2>
            <p>Access a library of professionally shot exercise videos, with clear instructions and proper form guidance.</p>
            <Link href="/content/exercises" className={styles.btn}>View Videos</Link>
          </div>
          <div className={styles.feature}>
            <img src="diet_image.jpeg" alt="Diet Info" />
            <h2>Diet Info</h2>
            <p>Get personalized nutrition advice and learn about healthy eating habits, with diet plans and grocery lists to help you stay on track.</p>
            <Link href="/content/diet" className={styles.btn}>Learn More</Link>
          </div>
          <div className={styles.feature}>
            <img src="/recommended_products.jpeg" alt="Recommended Products" />
            <h2>Recommended Products</h2>
            <p>Discover the best fitness equipment and supplements, handpicked by our expert trainers to help you achieve your goals.</p>
            <Link href="/products" className={styles.btn}>Shop Now</Link>
          </div>
        </section>
    </>
  )
}
