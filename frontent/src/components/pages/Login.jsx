import React, { useState } from "react";
import styles from "./login.module.css";
import leaf from "../../assets/leaf.png";

function Login() {

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        {/* LEFT FORM */}
        <form className={styles.form} onSubmit={handleSubmit}>

          <h2 className={styles.title}>Get Started Now</h2>

          <div className={styles.inputGroup}>
            <label>Username</label>
            <input
              type="email"
              name="username"
              placeholder="Enter your email"
              value={loginData.username}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.button}>
            Login
          </button>

        </form>

        {/* RIGHT IMAGE */}
        <div className={styles.imageSection}>
          <img src={leaf} alt="leaf" />
        </div>

      </div>
    </div>
  );
}

export default Login;