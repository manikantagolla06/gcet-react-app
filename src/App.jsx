import { useState } from "react";
import "./App.css";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Header from "./components/Header";
import Order from "./components/Order";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";
export const AppContext = createContext();
function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  return (
    <div className="app-main-wrapper">
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
          <div className="app-content">
            <Routes>
              <Route index element={<Product />} />
              <Route path="/" element={<Product />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/order" element={<Order />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}
export default App;