import React, { useState,useEffect } from "react";
import styles from "./auth.module.css";

function Auth({ initialMode }) {
  const [mode, setMode] = useState(initialMode === 'register' ? 'register' : 'signin'); // 'signin' or 'register'
  const [signinData, setSigninData] = useState({ email: "", password: "", remember: false });
  const [registerData, setRegisterData] = useState({ email: "", firstname: "", lastname: "", phone: "", password: "", confirmPassword: "" });

  function handleSigninChange(e) {
    const { name, value, type, checked } = e.target;
    setSigninData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleRegisterChange(e) {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  }

  function submitSignin(e) {
    e.preventDefault();
    console.log('Signin', signinData);
  }

  async function submitRegister(e) {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try{
      const res=await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
      });
      const data=await res.json();
      console.log(data);
      if(data.success){
        alert("Registration Successful");

        setRegisterData({
          email: "",
          firstname: "",
          lastname: "",
          phone: "",
          password: "",
          confirmPassword: ""
        });
        setMode('signin'); // Switch to signin after successful registration
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert("Registration Failed!");
    }
    console.log('Register', registerData);
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.leftPanel}>
          <div className={styles.leftContent}>
            <h2>Welcome</h2>
            <p>Join Our Unique Platform, Explore a New Experience</p>
            <button
              className={styles.registerButton}
              onClick={() => setMode(mode === 'register' ? 'signin' : 'register')}
            >
              {mode === 'register' ? 'LOGIN' : 'REGISTER'}
            </button>
          </div>
        </div>

        <div className={styles.rightPanel}>
          {mode === 'signin' ? (
            <div className={styles.formBox}>
              <h3>Sign In</h3>
              <form onSubmit={submitSignin}>
                <input name="email" type="email" placeholder="Email" value={signinData.email} onChange={handleSigninChange} />
                <input name="password" type="password" placeholder="Password" value={signinData.password} onChange={handleSigninChange} />
                <div className={styles.rowBetween}>
                  <label className={styles.remember}><input name="remember" type="checkbox" checked={signinData.remember} onChange={handleSigninChange} /> Remember me</label>
                  <button type="button" className={styles.linkBtn}>Forgot password?</button>
                </div>
                <button type="submit" className={styles.loginButton}>LOGIN</button>
              </form>
            </div>
          ) : (
            <div className={styles.formBox}>
              <h3>Create Account</h3>
              <form onSubmit={submitRegister}>
                <input name="email" type="email" placeholder="Email" value={registerData.email} onChange={handleRegisterChange} />

                <div className={styles.rowInputs}>
                  <input name="firstname" type="text" placeholder="First Name" value={registerData.firstname} onChange={handleRegisterChange} />
                  <input name="lastname" type="text" placeholder="Last Name" value={registerData.lastname} onChange={handleRegisterChange} />
                </div>

                <input name="phone" type="text" placeholder="Phone Number" value={registerData.phone} onChange={handleRegisterChange} />

                <div className={styles.rowInputs}>
                  <input name="password" type="password" placeholder="Password" value={registerData.password} onChange={handleRegisterChange} />
                  <input name="confirmPassword" type="password" placeholder="Confirm Password" value={registerData.confirmPassword} onChange={handleRegisterChange} />
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="submit" className={styles.loginButton}>REGISTER</button>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Auth;