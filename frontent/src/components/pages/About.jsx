import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function About() {
 const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const id = localStorage.getItem("userId");

    if (!id) {
      navigate("/auth");
    } else {
      setUserId(id);
      setLoading(false);
    }
  }, [navigate]);

  if (loading) return null;
  return (
    <div>
      <h1>About</h1>
    </div>
  )
}



export default About;