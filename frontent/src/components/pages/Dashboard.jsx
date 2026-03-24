import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539",
    "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
  ];

  // 🔁 AUTO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔐 CHECK LOGIN ON CLICK
  const handleNavigation = () => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      navigate("/products"); // ✅ logged in
    } else {
      navigate("/auth"); // ❌ not logged in
    }
  };

  return (
    <div className={styles.container}>
      
      {/* 🔥 SLIDER */}
      <div className={styles.slider}>
        <img
          src={images[current]}
          alt="banner"
          className={styles.sliderImg}
          onClick={handleNavigation}
        />
      </div>

      {/* TITLE */}
      <h2 className={styles.title}>Explore Products</h2>

      {/* CATEGORY */}
      <div className={styles.categories}>
        <div onClick={handleNavigation}>Perfumes</div>
        <div onClick={handleNavigation}>Luxury</div>
        <div onClick={handleNavigation}>Men</div>
        <div onClick={handleNavigation}>Women</div>
      </div>

      {/* FEATURED */}
      <h2 className={styles.title}>Featured</h2>

      <div className={styles.grid}>

        <div className={styles.card} onClick={handleNavigation}>
          <img src="https://images.unsplash.com/photo-1585386959984-a41552262a1f" />
          <h3>Dior Sauvage</h3>
          <p>₹5999</p>
        </div>

        <div className={styles.card} onClick={handleNavigation}>
          <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f" />
          <h3>Chanel No.5</h3>
          <p>₹7999</p>
        </div>

        <div className={styles.card} onClick={handleNavigation}>
          <img src="https://images.unsplash.com/photo-1615634260167-c8cdede054de" />
          <h3>Gucci Bloom</h3>
          <p>₹6499</p>
        </div>

        <div className={styles.card} onClick={handleNavigation}>
          <img src="https://images.unsplash.com/photo-1611080626919-7cf5a9f9c1b6" />
          <h3>Versace Eros</h3>
          <p>₹6999</p>
        </div>

      </div>

      {/* BUTTON */}
      <div className={styles.btnBox}>
        <button onClick={handleNavigation}>
          View All Products →
        </button>
      </div>

    </div>
  );
}

export default Dashboard;