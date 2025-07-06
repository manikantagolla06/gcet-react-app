import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useLocation } from "react-router-dom";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;
  const location = useLocation(); // <-- get navigation state

  const fetchOrders = async () => {
    try {
      if (!user?.email) return;
      setLoading(true);
      const res = await axios.get(`${API}/orders/${user.email}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Could not load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user]);

  // 🔁 Trigger refetch if navigated with state { newOrder: true }
  useEffect(() => {
    if (location.state?.newOrder && user?.email) {
      fetchOrders();
    }
  }, [location.state, user]);

  return (
    <div className="orders-container">
      <h3 className="orders-title">My Orders</h3>

      {loading && <p>Loading orders...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p>No orders found.</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <ol className="orders-list">
          {orders.map((value) => (
            <li key={value._id} className="order-box">
              <p><strong>Email:</strong> {value.email}</p>
              <p><strong>Order Value:</strong> ${value.orderValue}</p>
              <p><strong>Order ID:</strong> {value._id}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
