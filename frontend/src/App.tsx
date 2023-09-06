import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import "./App.css";
import { getProductsThunk } from "./store/thunks/productsThunks/productThunks";
import { ProductPage } from "./components/products/ProductsPage";
import { LoginPage } from "./components/users/LoginPage";
import { RegisterPage } from "./components/users/RegisterPage";
import { ProfilePage } from "./components/users/ProfilePage";
import { mainTheme } from "./theme";
import { OrderPage } from "./components/orders/OrderPage";
import { SingleProductPage } from "./components/products/SingleProductPage";
import { ThankYouPage } from "./components/orders/ThankYouPage";
import { AdminUserOperationPage } from "./components/users/admin/AdminUserOperationPage";
import { AdminProducts } from "./components/users/admin/AdminProducts";
import { AdminProductPatchPage } from "./components/users/admin/AdminProductPatch";
import { AdminProductPostPage } from "./components/users/admin/AdminProductPost";

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
            <Route path="/singleproduct/:id" element={<SingleProductPage />} />
            <Route path="/admin/users" element={<AdminUserOperationPage />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route
              path="/admin/patchproduct/:id"
              element={<AdminProductPatchPage />}
            />
            <Route
              path="/admin/postproduct/"
              element={<AdminProductPostPage />}
            />
            <Route path="/thankyou" element={<ThankYouPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
