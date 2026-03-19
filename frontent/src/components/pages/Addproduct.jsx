import React, { useState } from "react";

function AddProduct() {

  const [productName, setProductName] = useState({
    productName: "",
    price: "",
    description: "",
    category: ""
  });

  const handleChange = (e) => {
    setProductName({
      ...productName,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(productName);

      const res = await fetch("http://localhost:5000/api/createProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productName)
      });

      const data = await res.json();
      console.log(data);

      alert("Product Added Successfully!"); 

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          value={productName.productName}
          onChange={handleChange}
        />

        <br /><br />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={productName.price}
          onChange={handleChange}
        />

        <br /><br />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={productName.description}
          onChange={handleChange}
        />

        <br /><br />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={productName.category}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;