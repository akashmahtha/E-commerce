import React from "react";
import axios from "axios";

// 🔥 Load Razorpay Script
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

const PaymentButton = ({ amount }) => {

  const handlePayment = async () => {

    // ✅ GET KEY FROM ENV
    const key = import.meta.env.VITE_RAZORPAY_KEY_ID;

    // ✅ PRINT KEY IN CONSOLE (YOUR REQUIREMENT)
    console.log("👉 Razorpay Key:", key);

    if (!key) {
      alert("Razorpay key not found ❌");
      return;
    }

    // 🔥 Load Razorpay SDK
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      // 1️⃣ CREATE ORDER FROM BACKEND
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount }
      );

      const { order } = data;

      console.log("🧾 Order Created:", order);

      // 2️⃣ OPEN RAZORPAY
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "My E-Commerce",
        description: "Order Payment",
        order_id: order.id,

        // ✅ PAYMENT SUCCESS HANDLER
        handler: async function (response) {
          console.log("💳 Payment Response:", response);

          try {
            const verifyRes = await axios.post(
              "http://localhost:5000/api/payment/verify",
              response
            );

            if (verifyRes.data.success) {
              alert("Payment Successful 🎉");
            } else {
              alert("Payment verification failed ❌");
            }
          } catch (error) {
            console.error("Verification Error:", error);
            alert("Verification failed!");
          }
        },

        // 👤 PREFILL USER DATA
        prefill: {
          name: "Akash Kumar",
          email: "akash@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong in payment!");
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "15px",
        background: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      💳 Pay ₹{amount}
    </button>
  );
};

export default PaymentButton;