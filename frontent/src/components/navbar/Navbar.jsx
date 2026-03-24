import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo2.png";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 🔥 Handle Search
  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      navigate(`/products?search=${search}`);
      setSearch("");
    }
  };

const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userId");   // ✅ important

  console.log("After logout userId:", localStorage.getItem("userId")); // should be null

  navigate("/auth");
};

  return (
    <nav className={styles.navbar}>

      {/* LOGO */}
      <div className={styles.logo}>
        <img src={logo} alt="E-commerce Logo" />
      </div>

      {/* 🔥 SEARCH BAR */}
      <form className={styles.searchBar} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search perfumes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      {/* LINKS */}
      <div className={styles.links}>
        <Link className={styles.link} to="/">Dashboard</Link>
        <Link className={styles.link} to="/products">Products</Link>
        <Link className={styles.link} to="/card">Cart</Link>
        <Link className={styles.link} to="/about">About</Link>
        <Link className={styles.link} to="/auth">Auth</Link>

        <button className={styles.logout} onClick={handleLogout}>
              Logout
            </button>
        
      </div>

    </nav>
  );
}

export default Navbar;