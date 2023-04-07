import styles from '../styles/Signup.module.css';

export default function Signup() {
  return (
    <div className={styles.signupContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Log In</h1>
        <form>
          <label>
            Email:
            <input className={styles.formInput} type="email" name="email" />
          </label>
          <label>
            Password:
            <input className={styles.formInput} type="password" name="password" />
          </label>
          <button className={styles.formButton} type="submit">Login</button>
          <button className={styles.formButton} type="submit">Sign up</button>
        </form>
        <button className={styles.googleButton}>Log in with Google</button>
      </div>
    </div>
  );
}
