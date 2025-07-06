import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useEffect } from "react";
import axios from "axios";
import "./Order.css"; // Add this line for CSS

export default function Order() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    const res = await axios.get(`${API}/orders/${user.email}`);
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h3 className="orders-title">My Orders</h3>
      <ol className="orders-list">
        {orders &&
          orders.map((value) => (
            <li key={value._id} className="order-box">
              <p><strong>Email:</strong> {value.email}</p>
              <p><strong>Order Value:</strong> ${value.orderValue}</p>
              <p><strong>Order ID:</strong> {value._id}</p>
            </li>
          ))}
      </ol>
    </div>
  );
}