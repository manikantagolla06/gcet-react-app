import React, { useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Product.css";

export default function Product() {
  const { user, products, setProducts, cart, setCart } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(${API}/products/all);
      console.log("Fetched products:", res.data);
      // If response has a products field, use res.data.products
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      } else {
        console.warn("Unexpected response format:", res.data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // fallback to empty array
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (id) => {
    if (!cart[id]) {
      setCart({ ...cart, [id]: 1 });
    }
  };

  return (
    <div>
      <h3>Welcome {user?.name || "Guest"}!</h3>
      <div className="App-Product-Row">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((value) => (
            <div key={value._id}>
              <h3>{value.name}</h3>
              <h4>₹{value.price}</h4>
              <button onClick={() => addToCart(value.pid)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}