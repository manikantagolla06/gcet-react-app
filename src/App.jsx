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
