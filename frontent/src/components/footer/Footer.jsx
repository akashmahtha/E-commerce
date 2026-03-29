import React from "react";
import styles from "./footer.module.css";
import logo from "../../assets/logo2.png";

function Footer() {
  return (
    <footer className={styles.footer}>
      
      <div className={styles.container}>

        {/* 🔥 BRAND */}
        <div className={styles.section}>
          <img src={logo} alt="AKM Perfume Store" className={styles.logo}/>
          <p>Luxury fragrances for men & women. Create your signature scent.</p>

          {/* 🔥 SOCIAL */}
          <div className={styles.socials}>
            <span>🌐</span>
            <span>📘</span>
            <span>📸</span>
            <span>🐦</span>
          </div>
        </div>

        {/* 🔥 LINKS */}
        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>About</li>
          </ul>
        </div>

        {/* 🔥 CATEGORY */}
        <div className={styles.section}>
          <h3>Categories</h3>
          <ul>
            <li>Men Perfumes</li>
            <li>Women Perfumes</li>
            <li>Unisex</li>
          </ul>
        </div>

        {/* 🔥 NEWSLETTER */}
        <div className={styles.section}>
          <h3>Newsletter</h3>
          <p>Subscribe for latest offers</p>

          <div className={styles.newsletter}>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

      </div>

      {/* 🔥 BOTTOM */}
      <div className={styles.bottom}>
        © 2026 AKM Perfume Store | All Rights Reserved
      </div>

    </footer>
  );
}

export default Footer;