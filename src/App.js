import Products from "./components/products";
import Cart from "./components/cart";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/shopping-cart" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="*"
          element={
            <h1 className="text-center my-4 text-danger">404 Page Not Found</h1>
          }
        />
      </Routes>
    </>
  );
}

export default App;
