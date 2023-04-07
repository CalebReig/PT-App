import styles from '../styles/About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.heading}>About Us</h1>
      </div>
      <div className={styles.content}>
        <h2 className={styles.subheading}>Who We Are</h2>
        <p className={styles.text}>
          We are a team of dedicated personal trainers with a passion for helping our clients achieve their fitness goals. Our philosophy is simple: we believe that fitness should be accessible to everyone, regardless of their age, fitness level, or experience. That's why we offer a range of personalized training programs designed to meet your individual needs and goals.
        </p>
        <h2 className={styles.subheading}>What We Do</h2>
        <p className={styles.text}>
          Our personal training programs are tailored to your specific goals, whether you're looking to lose weight, build muscle, or improve your overall fitness. We work with you to create a customized workout plan that fits your schedule and lifestyle, and we provide the support and motivation you need to stay on track and reach your goals.
        </p>
      </div>
    </div>
  );
}
