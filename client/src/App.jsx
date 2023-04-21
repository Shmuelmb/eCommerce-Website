import "./App.css";
import { useEffect, useState, useContext } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import EnterPage from "./components/Pages/EnterPage/EnterPage";
import NotFoundPage from "./components/Pages/NotFoundPage/NotFoundPage";
import AboutMePage from "./components/Pages/AboutMePage/AboutMePage";
import Nav from "./components/Nav/Nav";
import RegisterPage from "./components/Pages/RegisterPage/RegisterPage";
import AdminPage from "./components/Pages/AdminPage/AdminPage";
import ManagProdPage from "./components/Pages/AdminPage/ManagProdPage/ManagProdPage";
import ManagUsers from "./components/Pages/AdminPage/ManagUsers/ManagUsers";
import Footer from "./components/Footer/Footer";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import ProfilePage from "./components/Pages/ProfilePage/ProfilePage";
import ProductPage from "./components/Pages/ProductPage/ProductPage";
import CategoryPage from "./components/Pages/CategoryPage/CategoryPage";
import Cookies from "universal-cookie";
import { BASE_URL } from "./.js/constant-vars";
import { addKeyForObjState } from "./.js/functions";
import { GlobalContext } from "./components/GlobalContext/GlobalContext";
function App() {
  const { setLoadingAppData, setAllProducts, setCartList, setIsAuth } =
    useContext(GlobalContext);

  //init const var
  const cookies = new Cookies();

  const getData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/products/getAllProducts`);
      const data = await response.json();
      setAllProducts(data);
      addKeyForObjState(setCartList, "Amount", 0, data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingAppData(false);
    }
  };

  useEffect(() => {
    getData();
    if (cookies.get("TOKEN")) {
      setIsAuth(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="main">
        <Routes>
          <Route path="/" element={<EnterPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/product-management" element={<ManagProdPage />} />
          <Route path="/admin/users-management" element={<ManagUsers />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route path="/products/:productid" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
