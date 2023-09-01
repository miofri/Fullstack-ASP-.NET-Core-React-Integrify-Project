import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";

import "./App.css";
import { getProductsThunk } from "./store/thunks/productThunks";
import { ProductPage } from "./components/products/ProductsPage";
import { LoginPage } from "./components/users/LoginPage";
import { RegisterPage } from "./components/users/RegisterPage";
import { ProfilePage } from "./components/users/ProfilePage";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
