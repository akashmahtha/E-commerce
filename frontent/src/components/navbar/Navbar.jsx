import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>

      <div className={styles.logo}>
        <img src={logo} alt="E-commerce Logo" />
      </div>

      <div className={styles.links}>
        <Link className={styles.link} to="/">Dashboard</Link>
        <Link className={styles.link} to="/products">Products</Link>
        <Link className={styles.link} to="/cart">Cart</Link>
        <Link className={styles.link} to="/about">About</Link>
        <Link className={styles.link} to="/auth">Auth</Link>
      </div>

    </nav>
  );
}

export default Navbar;