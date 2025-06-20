import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./screens/Signup.js";
import { CartProvider } from "./components/ContextReducer.js";
import Cart from "./screens/Cart.js";
import MyOrder from "./screens/MyOrder.js"


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/myorder" element={<MyOrder />} />
            
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
