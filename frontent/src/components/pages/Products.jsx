import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  //  Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/getProduct");
      const data = await res.json();
      setProducts(data.productData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //  Delete Product
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/deleteProduct/${id}`, {
        method: "DELETE",
      });

      alert("Product Deleted Successfully!");

      // 🔄 Refresh list after delete
      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>

      {/* Navigate to Add Product Page */}
      <button onClick={() => navigate("/add-product")}>
        Add Product
      </button>

      {/* Product List */}
      {products.map((item) => (
        <div key={item._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h2>{item.productName}</h2>
          <p>Price: {item.price}</p>
          <p>Description: {item.description}</p>
          <p>Category: {item.category}</p>

          {/* Delete Button */}
          <button onClick={() => handleDelete(item._id)}>
            Delete 
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;