import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./addProduct.module.css";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    price: "",
    description: "",
    category: "",
    image: null
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // 📸 Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setProduct({
      ...product,
      image: file
    });

    // Preview
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("productName", product.productName);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("image", product.image);

      const res = await fetch("http://localhost:5000/api/createProduct", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      console.log(data);

      alert("Product Added ✅");
      navigate("/products");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Add Product</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={product.productName}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
          />

          {/* 📸 Image Upload */}
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {/* 🔍 Preview */}
          {preview && (
            <img src={preview} alt="preview" className={styles.preview} />
          )}

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;