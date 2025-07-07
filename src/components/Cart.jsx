import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const { cart, setCart, products, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // Calculate order total
  useEffect(() => {
    setOrderValue(
      products.reduce((sum, product) => {
        return sum + product.price * (cart[product.pid] ?? 0);
      }, 0)
    );
  }, [products, cart]);

  const increment = (pid) => {
    setCart((prev) => ({
      ...prev,
      [pid]: (prev[pid] || 0) + 1
    }));
  };

  const decrement = (pid) => {
    setCart((prev) => ({
      ...prev,
      [pid]: Math.max((prev[pid] || 1) - 1, 0)
    }));
  };

  const placeOrder = async () => {
  const url = `${API}/orders/new`; // ✅ add `/api/`
  const payload = {
    email: user.email,
    orderValue: orderValue
  };

  console.log("🔄 Trying to place order to:", url);
  console.log("📦 Payload:", payload);

  try {
    const res = await axios.post(url, payload);
    console.log("✅ Order success:", res.data);

    setCart({});
    Navigate("/order");
  } catch (err) {
    console.error("❌ Order failed:", err.response?.data || err.message);
    alert("Failed to place order. Please try again.");
  }
};


  const loginToOrder = () => {
    Navigate("/login");
  };

  return (
    <div>
      <h2>My Cart</h2>
      {products &&
        products.map(
          (product) =>
            cart[product.pid] > 0 && (
              <div key={product.pid}>
                {product.pid} - {product.name} - ₹{product.price} -
                <button onClick={() => decrement(product.pid)}>-</button>
                {cart[product.pid]}
                <button onClick={() => increment(product.pid)}>+</button>
                = ₹{product.price * cart[product.pid]}
              </div>
            )
        )}
      <hr />
      <h3>Order Value: ₹{orderValue}</h3>
      <hr />
      {user.name ? (
  <button onClick={() => {
    console.log("🟢 Button clicked");
    placeOrder();
  }}>Place Order</button>
) : (
  <button onClick={() => {
    console.log("🟠 Login button clicked");
    loginToOrder();
  }}>Login to Order</button>
)}

      <hr />
    </div>
  );
}