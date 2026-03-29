import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cart.module.css";

// ✅ IMPORT RAZORPAY BUTTON
import PaymentButton from "../../PaymentButton";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 🔥 FETCH CART
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

      setCartItems(data?.items || []);
      setSubtotal(data?.subtotal || 0);
      setGst(data?.gst || 0);
      setTotal(data?.total || 0);
    } catch (error) {
      console.error("Fetch Cart Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔐 AUTH CHECK
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

      if (res.ok) fetchCart();
      else alert("Failed to remove item");
    } catch (error) {
      console.error("Remove Error:", error);
    }
  };

  // ➕➖ UPDATE QUANTITY
  const updateQuantity = async (productId, type) => {
    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch(
        "http://localhost:5000/api/updateCartQuantity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId, productId, type })
        }
      );

      if (res.ok) fetchCart();
    } catch (error) {
      console.error("Update Quantity Error:", error);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🛒 Your Cart</h1>

      <div className={styles.wrapper}>

        {/* LEFT SIDE */}
        <div className={styles.left}>
          {cartItems.length === 0 ? (
            <h2>No items in cart</h2>
          ) : (
            cartItems.map((item) => (
              <div key={item?.productId?._id} className={styles.card}>
                
                {/* IMAGE */}
                <img
                  src={item?.productId?.image}
                  alt={item?.productId?.productName}
                  className={styles.image}
                />

                {/* DETAILS */}
                <div className={styles.details}>
                  <h3>{item?.productId?.productName}</h3>
                  <p className={styles.price}>
                    ₹{item?.productId?.price}
                  </p>

                  {/* QUANTITY */}
                  <div className={styles.qty}>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId._id, "dec")
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.productId._id, "inc")
                      }
                    >
                      +
                    </button>
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

          {/* ✅ RAZORPAY PAYMENT BUTTON */}
          {cartItems.length > 0 ? (
            <PaymentButton amount={total} />
          ) : (
            <button
              disabled
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
                background: "#ccc",
                border: "none"
              }}
            >
              Cart is Empty
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default Cart;