import { Routes, Route, Navigate } from "react-router-dom";
import ProductList from "../pages/ProductList";
import Layout from "../layout";

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route index element={<ProductList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default AppRouter;
