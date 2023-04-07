import styles from '../../styles/Content.module.css';


export default function DietContent() {
    return (
        <>
          <h1>Diet Tutorials</h1>
          <section className={styles.videoSection}>
            <h2>Bulk Up</h2>
            <div className={styles.videoContainer}>
              <iframe className={styles.video} src="https://www.youtube.com/embed/hvVpblFsxzM" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              <iframe className={styles.video} src="https://www.youtube.com/embed/mVmlJZIBpi4" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              <iframe className={styles.video} src="https://www.youtube.com/embed/wPz_4NnDODA" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </section>
          <section className={styles.videoSection}>
            <h2>Slim Down</h2>
            <div className={styles.videoContainer}>
              <iframe className={styles.video} src="https://www.youtube.com/embed/cN6gDf6UgEI" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              <iframe className={styles.video} src="https://www.youtube.com/embed/YzjK_Iup-1M" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              <iframe className={styles.video} src="https://www.youtube.com/embed/T9jzG5LKn9g" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </section>
        </>
      );
}