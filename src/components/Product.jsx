import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Product.css";

export default function Product() {
  const { user, products, setProducts, cart, setCart } = useContext(AppContext);
  // const [products, setProducts] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products/all`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const increment = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (id) => {
    setCart((prev) => {
      const qty = (prev[id] || 1) - 1;
      if (qty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: qty };
    });
  };

  const addToCart = (id) => {
    if (!cart[id]) setCart({ ...cart, [id]: 1 });
  };

  return (
    <div>
      <h3>Welcome {user.name}! </h3>
      <div className="App-Product-Row">
        {products &&
          products.map((value) => (
            <div key={value._id} className="product-card">
              <h3>{value.name}</h3>
              <img
                src={value.image}
                alt={value.name}
                className="product-image"
              />
              <h4>{value.price}/-</h4>
              {cart[value.pid] ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '10px 0' }}>
                  <button onClick={() => decrement(value.pid)}>-</button>
                  <span>{cart[value.pid]}</span>
                  <button onClick={() => increment(value.pid)}>+</button>
                </div>
              ) : (
                <button onClick={() => addToCart(value.pid)}>Add to Cart</button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}