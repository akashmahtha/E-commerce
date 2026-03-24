import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./product.module.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔍 Search Query
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("search") || "";

  // 🔐 AUTH CHECK
  useEffect(() => {
    const id = localStorage.getItem("userId");

    if (!id) {
      navigate("/auth");
    } else {
      setUserId(id);
      setLoading(false);
    }
  }, [navigate]);

  // 📦 Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/getProduct");
      const data = await res.json();
      setProducts(data.productData || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🛒 Add To Cart
  const handleAddToCart = async (id, e) => {
    e.stopPropagation();

    if (!userId) {
      alert("Please login first!");
      navigate("/auth");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId: id, userId })
      });

      const data = await res.json();

      if (data.success) {
        alert("Added to Cart ✅");
      } else {
        alert(data.message || "Failed to add");
      }
    } catch (error) {
      console.error("AddToCart Error:", error);
      alert("Something went wrong!");
    }
  };

  // 🔍 FILTER PRODUCTS
  const filteredProducts = products.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ⏳ Loading UI
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Luxury Perfumes</h1>

      {/* 🧴 PRODUCTS */}
      <div className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div
              key={item._id}
              className={styles.card}
              onClick={() =>
                navigate("/product-details", { state: item })
              }
            >
              

              {item.image ? (
                <img
                  src={item.image}
                  alt={item.productName}
                  className={styles.image}
                />
              ) : (
                <div className={styles.noImage}>
                  <span>Perfume</span>
                </div>
              )}

              <h2 className={styles.productName}>
                {item.productName}
              </h2>

              <p className={styles.rating}>⭐⭐⭐⭐☆</p>

              <p className={styles.price}>₹{item.price}</p>

              <p className={styles.category}>{item.category}</p>

              <button
                className={styles.cartBtn}
                onClick={(e) => handleAddToCart(item._id, e)}
              >
                Add To Cart
              </button>
            </div>
          ))
        ) : (
          <h2 className={styles.noData}>No products found 😢</h2>
        )}
      </div>
    </div>
  );
}

export default Products;