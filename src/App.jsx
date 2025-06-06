import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Header from "./components/Header";
import Order from "./components/Order";
import Footer from "./components/Footer";

// Context
export const AppContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: "Guest" }); // Default user
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({}); // Object format is fine

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        user,
        setUser,
        products,
        setProducts,
        cart,
        setCart,
      }}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Product />} />
          <Route path="/" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
