import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useLocation } from "react-router-dom";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AppContext);
  const location = useLocation();
  const API = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/orders/${user.email}`);
      setOrders(res.data);
    } catch (err) {
      setError("Could not load orders.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount or when redirected from cart with newOrderPlaced flag
  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    if (location.state?.newOrderPlaced && user?.email) {
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
