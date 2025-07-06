import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const { cart, setCart, products, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // Recalculate order value whenever cart changes
  useEffect(() => {
    const value = products.reduce((sum, item) => {
      return sum + item.price * (cart[item.pid] ?? 0);
    }, 0);
    setOrderValue(value);
  }, [cart, products]);

  // Handle quantity increment
  const increment = (id) => {
    const updatedCart = { ...cart, [id]: (cart[id] || 0) + 1 };
    setCart(updatedCart);
  };

  // Handle quantity decrement
  const decrement = (id) => {
    const updatedCart = { ...cart };
    if ((updatedCart[id] || 0) > 1) {
      updatedCart[id] -= 1;
    } else {
      delete updatedCart[id];
    }
    setCart(updatedCart);
  };

  // Place order
  const placeOrder = async () => {
    try {
      const url = `${API}/orders/new`;
      await axios.post(url, {
        email: user.email,
        orderValue: orderValue,
      });
      setCart({});
      navigate("/order", { state: { newOrderPlaced: true } }); // Pass flag
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  return (
    <div>
      <h2>My Cart</h2>
      {products &&
        products.map(
          (product) =>
            cart[product.pid] && (
              <div key={product.pid}>
                <p>
                  {product.name} - ${product.price} × {cart[product.pid]} = $
                  {product.price * cart[product.pid]}
                </p>
                <button onClick={() => decrement(product.pid)}>-</button>
                <button onClick={() => increment(product.pid)}>+</button>
              </div>
            )
        )}

      <hr />
      <h3>Total: ${orderValue}</h3>
      <hr />
      {user?.name ? (
        <button onClick={placeOrder} disabled={orderValue === 0}>
          Place Order
        </button>
      ) : (
        <button onClick={() => navigate("/login")}>Login to Order</button>
      )}
    </div>
  );
}
