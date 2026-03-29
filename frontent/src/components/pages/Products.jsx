import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./product.module.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 NEW STATES
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔍 SEARCH QUERY
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("search") || "";

  // 🔐 CHECK LOGIN
  useEffect(() => {
    const id = localStorage.getItem("userId");

    if (!id) {
      navigate("/auth");
    } else {
      setUserId(id);
      setLoading(false);
    }
  }, [navigate]);

  // 📦 FETCH PRODUCTS
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

  // 🛒 ADD TO CART
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
        alert(data.message || "Product is added");
      }
    } catch (error) {
      console.error("AddToCart Error:", error);
      alert("Something went wrong!");
    }
  };

  // ❤️ WISHLIST
  const toggleWishlist = (id, e) => {
    e.stopPropagation();

    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // 🔥 FINAL FILTER + SORT (FIXED)
  const finalProducts = products
    .filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) =>
      category
        ? item.category?.toLowerCase() === category.toLowerCase()
        : true
    )
    .sort((a, b) => {
      if (sort === "low") return Number(a.price) - Number(b.price);
      if (sort === "high") return Number(b.price) - Number(a.price);
      return 0;
    });

  // ⏳ LOADING
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className={styles.container}>
      
      <h1 className={styles.title}>Luxury Perfumes</h1>

      {/* 🔥 FILTER BAR */}
      <div className={styles.filterBar}>
        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>

      </div>

      {/* 🧴 PRODUCTS */}
      <div className={styles.productGrid}>
        {finalProducts.length > 0 ? (
          finalProducts.map((item) => (
            <div
              key={item._id}
              className={styles.card}
              onClick={() =>
                navigate("/product-details", { state: item })
              }
            >

              {/* ❤️ WISHLIST */}
              <span
                className={styles.wishlist}
                onClick={(e) => toggleWishlist(item._id, e)}
              >
                {wishlist.includes(item._id) ? "❤️" : "🤍"}
              </span>

              {/* IMAGE */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.productName}
                  className={styles.image}
                />
              ) : (
                <div className={styles.noImage}>No Image</div>
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