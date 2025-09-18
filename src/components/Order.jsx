import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useEffect } from "react";
import axios from "axios";
import "./Order.css"; 

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
    <div style={{ width: '100vw', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
      <div className="orders-table-container">
        <h3 className="orders-title">My Orders</h3>
        <div className="orders-table-scroll">
          {orders && orders.length > 0 ? (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order Value</th>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((value) => (
                  <tr key={value._id}>
                    <td>₹{value.orderValue}</td>
                    <td>{value._id}</td>
                    <td style={{ minWidth: 180 }}>
                      {Array.isArray(value.items) && value.items.length > 0 ? (
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', textAlign: 'left' }}>
                          {value.items.map((item, idx) => (
                            <li key={item.pid || idx} style={{ marginBottom: 4 }}>
                              <span style={{ fontWeight: 600 }}>{item.name}</span>
                              {item.quantity > 1 ? (
                                <span style={{ color: '#888', marginLeft: 6 }}>× {item.quantity}</span>
                              ) : null}
                              <span style={{ color: '#888', marginLeft: 8 }}>₹{item.price}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span style={{ color: '#bbb' }}>No items</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="order-cancel-btn"
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to cancel this order?')) {
                            try {
                              await axios.delete(`${API}/orders/${value._id}`);
                              setOrders((prev) => prev.filter((o) => o._id !== value._id));
                            } catch (err) {
                              alert('Failed to cancel order.');
                            }
                          }
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '32px 0', color: '#888', fontSize: '1.15rem', fontWeight: 500 }}>
              No orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}