import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const { cart, setCart, products, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // Recalculate orderValue whenever cart or products changes
  useEffect(() => {
    setOrderValue(
      products.reduce((sum, value) => {
        return sum + value.price * (cart[value.pid] ?? 0);
      }, 0)
    );
  }, [cart, products]);

  const increment = (id) => {
    const newCart = { ...cart, [id]: (cart[id] ?? 0) + 1 };
    setCart(newCart);
  };

  const decrement = (id) => {
    const newQty = (cart[id] ?? 0) - 1;
    const newCart = { ...cart };
    if (newQty > 0) {
      newCart[id] = newQty;
    } else {
      delete newCart[id];
    }
    setCart(newCart);
  };

  const placeOrder = async () => {
    try {
      const url = `${API}/orders/new`;
      await axios.post(url, { email: user.email, orderValue: orderValue });
      setCart({}); // Clear cart only after successful order
      navigate("/order");
    } catch (error) {
      console.error("Order placement failed", error);
    }
  };

  const loginToOrder = () => {
    navigate("/login");
  };

  return (
    <div>
      <h2>My Cart</h2>

      {products &&
        products.map(
          (value) =>
            cart[value.pid] && (
              <div key={value.pid}>
                <p>
                  <strong>{value.name}</strong> - ${value.price}
                </p>
                <button onClick={() => decrement(value.pid)}>-</button>
                {cart[value.pid]}
                <button onClick={() => increment(value.pid)}>+</button>
                = ${value.price * cart[value.pid]}
              </div>
            )
        )}

      <hr />
      <h3>Order Value: ${orderValue}</h3>
      <hr />

      {user.name ? (
        <button onClick={placeOrder} disabled={orderValue === 0}>
          Place Order
        </button>
      ) : (
        <button onClick={loginToOrder}>Login to Order</button>
      )}
      <hr />
    </div>
  );
}
