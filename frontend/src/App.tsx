import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";

import "./App.css";
import { getProductsThunk } from "./store/thunks/productsThunks/productThunks";
import { ProductPage } from "./components/products/ProductsPage";
import { LoginPage } from "./components/users/LoginPage";
import { RegisterPage } from "./components/users/RegisterPage";
import { ProfilePage } from "./components/users/ProfilePage";
import { ThemeProvider } from "@emotion/react";
import { mainTheme } from "./theme";
import { CssBaseline } from "@mui/material";
import { OrderPage } from "./components/orders/OrderPage";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<ProductPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/order" element={<OrderPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
