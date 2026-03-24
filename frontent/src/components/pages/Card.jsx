import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./card.module.css";

function Card() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 🔥 FETCH CART (GLOBAL FUNCTION)
  const fetchCart = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch("http://localhost:5000/api/getCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
      });

      const data = await res.json();
      console.log("Cart Data:", data);

      setCartItems(data?.items || []);
      setSubtotal(data?.subtotal || 0);
      setGst(data?.gst || 0);
      setTotal(data?.total || 0);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // 🔐 AUTH + FETCH
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/auth");
      return;
    }

    fetchCart();
  }, [navigate]);

  // ❌ REMOVE ITEM
  const handleRemove = async (productId) => {
    const userId = localStorage.getItem("userId");

    if (!window.confirm("Remove this item?")) return;

    try {
      const res = await fetch(
        "http://localhost:5000/api/removeCartProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId, productId })
        }
      );

      const data = await res.json();
      console.log("Remove Response:", data);

      if (res.ok) {
        fetchCart(); // 🔄 refresh cart
      } else {
        alert(data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Remove Error:", error);
      alert("Something went wrong!");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>YOUR CART</h1>

      <div className={styles.wrapper}>

        {/* LEFT SIDE */}
        <div className={styles.left}>
          {cartItems.length === 0 ? (
            <h2>No items in cart</h2>
          ) : (
            cartItems.map((item) => (
              <div key={item.productId._id} className={styles.card}>
                
                {/* IMAGE */}
                <img
                  src={item.productId?.image}
                  alt=""
                  className={styles.image}
                />

                {/* DETAILS */}
                <div className={styles.details}>
                  <h3>{item.productId?.productName}</h3>

                  <p className={styles.price}>
                    ₹{item.productId?.price}
                  </p>

                  {/* QUANTITY */}
                  <div className={styles.qty}>
                    <button>-</button>
                    <span>{item.quantity}</span>
                    <button>+</button>
                  </div>
                </div>

                {/* DELETE */}
                <button
                  className={styles.delete}
                  onClick={() =>
                    handleRemove(item.productId._id)
                  }
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <h2>Order Summary</h2>

          <div className={styles.row}>
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className={styles.row}>
            <span>GST (18%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>

          <div className={styles.row}>
            <span>Delivery</span>
            <span style={{ color: "green" }}>FREE</span>
          </div>

          <div className={styles.total}>
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            className={styles.checkout}
            onClick={() => alert("Proceed to checkout 🚀")}
          >
            Go to Checkout →
          </button>
        </div>

      </div>
    </div>
  );
}

export default Card;