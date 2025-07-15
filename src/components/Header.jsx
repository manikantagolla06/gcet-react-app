import { AppContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <nav className="navbar fixed-top bg-body-tertiary">
      <div className="container-fluid" style={{backgroundColor : 'rgb(110, 165, 165)'}}>
        <Link className="navbar-brand d-flex align-items-center" to="/" style={{ fontFamily: 'Lobster, cursive', fontWeight: 700, fontSize: '2rem', letterSpacing: '1px' }}>
          Men Accessories Shop
        </Link>
        <div className="d-flex flex-row ms-auto">
          <Link className="nav-link px-3" to="/">Home</Link>
          <Link className="nav-link px-3" to="/cart">Cart</Link>
          <Link className="nav-link px-3" to="/order">Order</Link>
          {user && (user.name || user.email) ? (
            <Link className="nav-link px-3" to="/logout">Logout</Link>
          ) : (
            <Link className="nav-link px-3" to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}