import React from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
// import HookForm from "./pages/HookForm";
import Admin from "./pages/Admin";
import store from './pages/store';
import Shop from './pages/Shop';


function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/checkout" element={<HookForm />} /> */}
          <Route path="/" element={<Shop />} />
        </Routes>
      </Layout>
    </Provider>
  );
}

export default App;
