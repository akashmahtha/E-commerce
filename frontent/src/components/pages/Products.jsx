import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./product.module.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 SLIDER IMAGES
  const sliderImages = [
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1400&q=80"
  ];

  // 🔍 Search
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("search") || "";

  // 👤 User
  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  // 📦 Fetch Products
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/getProduct");
    const data = await res.json();
    setProducts(data.productData || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔁 AUTO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
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
    console.log("Sending:", { productId: id, userId });

    const res = await fetch("http://localhost:5000/api/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id, userId }),
    });

    const data = await res.json();
    console.log("AddToCart Response:", data);

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

  // 🔍 Filter
  const filteredProducts = products.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>

      {/* 🔥 SLIDER */}
      <div className={styles.slider}>
        <img
          src={sliderImages[currentSlide]}
          alt="Perfume Banner"
          className={styles.sliderImg}
        />

        <button
          className={styles.prev}
          onClick={() =>
            setCurrentSlide(
              (currentSlide - 1 + sliderImages.length) %
              sliderImages.length
            )
          }
        >
          ❮
        </button>

        <button
          className={styles.next}
          onClick={() =>
            setCurrentSlide((currentSlide + 1) % sliderImages.length)
          }
        >
          ❯
        </button>
      </div>

      <h1 className={styles.title}>Luxury Perfumes</h1>

      {/* 🧴 PRODUCTS */}
      <div className={styles.productGrid}>
        {filteredProducts.map((item) => (
          <div
            key={item._id}
            className={styles.card}
            onClick={() =>
              navigate("/product-details", { state: item })
            }
          >
            <span className={styles.badge}>20% OFF</span>

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
        ))}
      </div>
    </div>
  );
}

export default Products;