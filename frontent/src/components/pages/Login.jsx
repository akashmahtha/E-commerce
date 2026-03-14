import React from 'react'
import { useState } from 'react'
import styles from './login.module.css'
function Login() {
  const[loginData, setLoginData] = useState({
    username: "",
    password: ""
  })

const handleOnchange = (e) => {
  setLoginData((prev)=>{
    return{
      ...prev,username:e.target.value
    }
  })

  setLoginData((prev)=>{
    return{
      ...prev,password:e.target.value
    }
  })
}

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(loginData);
}

  return (
    <div className={styles.container}>
      <form className={styles.form} action="" onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login</h1>
        <label>Username</label>
        <input type="text" name="username" id="" value={loginData.username} onChange={handleOnchange} />
        <label>Password</label>
        <input type="password" name="password" id="" value={loginData.password} onChange={handleOnchange} />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
