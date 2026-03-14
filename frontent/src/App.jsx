import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/pages/Dashboard'
import Products from './components/pages/Products'
import Card from './components/pages/Card'
import About from './components/pages/About'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Auth from './components/pages/Auth'
import Navbar from './components/navbar/Navbar'
import './App.css'
function App() {


  return (
    <>
      <Navbar />
      
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/card" element={<Card />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth" element={<Auth />} />

      </Routes>
      
    </>
  )
}

export default App
