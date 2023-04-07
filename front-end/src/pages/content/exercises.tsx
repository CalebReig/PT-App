import styles from '../../styles/Content.module.css';


export default function ExerciseContent() {
    return (
        <>
          <h1>Exercise Tutorials</h1>
          <section className={styles.videoSection}>
            <h2>Chest Workouts</h2>
            <div className={styles.videoContainer}>
              <iframe className={styles.video} src="https://www.youtube.com/embed/hvVpblFsxzM" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              <iframe className={styles.video} src="https://www.youtube.com/embed/mVmlJZIBpi4" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              <iframe className={styles.video} src="https://www.youtube.com/embed/wPz_4NnDODA" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </section>
          <section className={styles.videoSection}>
            <h2>Leg Workouts</h2>
            <div className={styles.videoContainer}>
              <iframe className={styles.video} src="https://www.youtube.com/embed/cN6gDf6UgEI" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              <iframe className={styles.video} src="https://www.youtube.com/embed/YzjK_Iup-1M" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              <iframe className={styles.video} src="https://www.youtube.com/embed/T9jzG5LKn9g" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </section>
        </>
      );
}