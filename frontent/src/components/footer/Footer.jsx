import React from "react";
import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* BRAND */}
        <div className={styles.section}>
          <h2>PerfumeStore</h2>
          <p>Luxury fragrances for men & women.</p>
        </div>

        {/* LINKS */}
        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* CATEGORY */}
        <div className={styles.section}>
          <h3>Categories</h3>
          <ul>
            <li>Men Perfumes</li>
            <li>Women Perfumes</li>
            <li>Unisex</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className={styles.section}>
          <h3>Contact</h3>
          <p>Email: akm@perfumestore.com</p>
          <p>Phone: +91 8797627574</p>
        </div>

      </div>

      <div className={styles.bottom}>
        © 2026 PerfumeStore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;