import { Routes, Route, Navigate } from "react-router-dom";
import ProductList from "../pages/ProductList";
import Layout from "../layout";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/product-list">
            <Route index element={<ProductList />} />
          </Route>
          <Route path="*" element={<>404</>} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default AppRouter;
