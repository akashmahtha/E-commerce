import React, { useState } from 'react'
import styles from './signup.module.css'

function Signup() {

  const [signupData, setSignupData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })

  function handleOnchange(e){
    const { name, value } = e.target;

    setSignupData((prev)=>({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log(signupData);
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Signup</h1>

        <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleOnchange} />

        <div className={styles.row}>
          <input type="text" name="firstname" placeholder="First Name" value={signupData.firstname} onChange={handleOnchange} />
          <input type="text" name="lastname" placeholder="Last Name" value={signupData.lastname} onChange={handleOnchange} />
        </div>

        <input type="text" name="phone" placeholder="Phone Number" value={signupData.phone} onChange={handleOnchange} />

        <div className={styles.row}>
          <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleOnchange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={signupData.confirmPassword} onChange={handleOnchange} />
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup