import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import styles from "./auth.module.css";

function Auth() {

  const [page, setPage] = useState("");

  return (
    <div className={styles.container}>

      {page === "" && (
        <div className={styles.box}>
          <h1>Account</h1>
          <p>Please choose an option</p>

          <div className={styles.buttons}>
            <button onClick={() => setPage("login")}>Login</button>
            <button onClick={() => setPage("signup")}>Signup</button>
          </div>
        </div>
      )}

      {page === "login" && <Login />}

      {page === "signup" && <Signup />}

    </div>
  );
}

export default Auth;