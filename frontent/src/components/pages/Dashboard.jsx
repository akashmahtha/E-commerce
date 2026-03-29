import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const go = () => {
    const userId = localStorage.getItem("userId");
    if (userId) navigate("/products");
    else navigate("/auth");
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/getProduct")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.productData || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>

      {/* 🔥 SLIDER */}
      <div id="carouselExample" className={`carousel slide ${styles.slider}`} data-bs-ride="carousel">

        <div className="carousel-inner">

          <div className="carousel-item active">
            <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539" className="d-block w-100" />
            <div className={styles.overlay}></div>
            <div className={styles.caption}>
              <h1>Luxury Perfume</h1>
              <p>Create Your Signature Scent</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1615634262417-03d3f1c8c7b2" className="d-block w-100" />
            <div className={styles.overlay}></div>
            <div className={styles.caption}>
              <h1>Exclusive Collection</h1>
              <p>Feel the Luxury</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad" className="d-block w-100" />
            <div className={styles.overlay}></div>
            <div className={styles.caption}>
              <h1>Premium Fragrance</h1>
              <p>Long Lasting Perfume</p>
            </div>
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>

      {/* 🔥 SALE SECTION */}
      <div className={styles.saleSection}>
        {products.slice(0, 2).map((item, i) => (
          <div key={i} className={styles.saleCard}>
            <img src={item.image} alt="" />
            <div>
              <h3>Perfume SALE</h3>
              <p>{i === 0 ? "30%" : "15%"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 TITLE */}
      <div className={styles.sectionTitle}>
        <span>Perfume</span>
        <h2>Create Your Signature</h2>
      </div>

      {/* 🔥 FEATURE */}
      <div className={styles.feature}>
        {products[2]?.image && (
          <img src={products[2].image} alt="" />
        )}

        <div className={styles.featureBox}>
          <h3>Our Product</h3>
          <p>Premium long lasting fragrance for luxury lifestyle.</p>
          <button onClick={go}>Learn More</button>
        </div>

        <div className={styles.featureBox}>
          <h3>Sunset Lime</h3>
          <ul>
            <li>✔ Long lasting</li>
            <li>✔ Premium quality</li>
            <li>✔ Luxury feel</li>
          </ul>
        </div>
      </div>

      {/* 🔥 PRODUCTS */}
      <div className={styles.sectionTitle}>
        <span>Product</span>
        <h2>Find your Perfume</h2>
      </div>

      <div className={styles.productGrid}>
        {products.length > 0 ? (
          products.slice(0, 6).map((item, i) => (
            <div key={i} className={styles.productCard} onClick={go}>
              <img src={item.image} alt={item.productName} />
              <h3>{item.productName}</h3>
              <p>₹{item.price}</p>
              <button>Discover More</button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>Loading products...</p>
        )}
      </div>

      {/* 🔥 TESTIMONIAL */}
      <div className={styles.testimonial}>
        <div>
          <span>Feedback</span>
          <h2>Our Testimonials</h2>
        </div>

        <div className={styles.testBox}>
          ⭐⭐⭐⭐⭐
          <p>Best perfume I’ve ever used. Amazing quality.</p>
          <h4>Akash</h4>
        </div>
      </div>

      {/* 🔥 BLOG */}
      <div className={styles.sectionTitle}>
        <span>Blog</span>
        <h2>Blog & Article</h2>
      </div>

      <div className={styles.blogGrid}>
        {products.slice(0, 3).map((item, i) => (
          <div key={i} className={styles.blogCard}>
            <img src={item.image} alt="" />
            <h4>{item.productName}</h4>
            <button>Learn More</button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;