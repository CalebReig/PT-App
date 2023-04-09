import styles from '../styles/Products.module.css';

export default function Products() {
  return (
    <div className={styles.products}>
      <h1>Recommended Products</h1>
      <h2>Workout Equipment</h2>
      <ul>
        <li className={styles["product-card"]}>
          <div className={styles["product-container"]}>
            <img
              src="resistance_bands.jpeg"
              alt="Resistance Bands Set"
            />
            <div className={styles["product-details"]}>
              <div className={styles["product-title"]}>Resistance Bands Set</div>
              <div className={styles["product-description"]}>
                This set of resistance bands is perfect for a full-body workout at
                home or on the go.
              </div>
              <a
                href="https://www.amazon.com/dp/B01N808QIH/?tag=your-affiliate-id-20"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Now
              </a>
            </div>
          </div>
        </li>
        <li className={styles["product-card"]}>
          <div className={styles["product-container"]}>
            <img
              src="adjustable_dumbbells.jpeg"
              alt="Adjustable Dumbbells"
            />
            <div className={styles["product-details"]}>
              <div className={styles["product-title"]}>Adjustable Dumbbells</div>
              <div className={styles["product-description"]}>
                These adjustable dumbbells are perfect for a home gym and allow you
                to easily change the weight for different exercises.
              </div>
              <a
                href="https://www.amazon.com/dp/B087LZDXCT/?tag=your-affiliate-id-20"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Now
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
