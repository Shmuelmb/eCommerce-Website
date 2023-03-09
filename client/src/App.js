import "./App.css";
import { useEffect, useState } from "react";
import MyContext from "./MyContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EnterPage from "./components/Pages/EnterPage/EnterPage";
import NotFoundPage from "./components/Pages/NotFoundPage/NotFoundPage";
import AboutMePage from "./components/Pages/AboutMePage/AboutMePage";
import Nav from "./components/Nav/Nav";
import RegisterPage from "./components/Pages/RegisterPage/RegisterPage";
import AdminPage from "./components/Pages/AdminPage/AdminPage";
import ManagProdPage from "./components/Pages/AdminPage/ManagProdPage/ManagProdPage";
import Footer from "./components/Footer/Footer";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import ProfilePage from "./components/Pages/ProfilePage/ProfilePage";
import ProductPage from "./components/Pages/ProductPage/ProductPage";

function App() {
  // useState object
  const [searchValue, setSearchValue] = useState("");
  const [choosenSortPrice, setChoosenSortPrice] = useState([0, 999.99]);
  const [isChoosenSortH2L, setIsChoosenSortH2L] = useState();
  const [products, setProducts] = useState([]); // המוצרים עם השינויים שלהם
  const [allProducts, setAllProducts] = useState([1, 2]); // רשימת המוצרים ללא שינוים עליהם
  const [loading, setLoading] = useState(true);
  const [cartList, setCartList] = useState([]);
  const [productID, setProductID] = useState("");
  const [productsFilter, setProductsFilter] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  // func
  const onFilterChange = (e) => {
    if (e.target.innerText === "New Arrivals") {
      setProducts(allProducts);
    } else {
      setProducts(allProducts.filter((p) => p.category === e.target.innerText));
    }
  };

  const onSearchClick = (e) => {
    if (e.target.value.length > 0) {
      products.map((item) => {
        if (item.title.includes(e.target.value)) {
          setProducts(
            [...products].filter((p) => p.title.includes(e.target.value))
          );
        }
      });
    } else {
      setProducts(allProducts);
    }
  };

  const addKeyForObjState = (setArr, key, value, data) => {
    const newArr = [...data];
    newArr.map((ev) => (ev[key] = value));
    setArr(newArr);
  };

  const createListOfKey = (arrayOfProcuts, key) =>
    arrayOfProcuts
      .map((p) => p[key])
      .filter((value, index, array) => array.indexOf(value) === index);

  const categories = createListOfKey(allProducts, "category");
  categories.unshift("New Arrivals");

  return (
    <BrowserRouter>
      <MyContext.Provider
        value={{
          setIsAuth,
          isAuth,
          createListOfKey,
          productsFilter,
          setProductsFilter,
          onSearchClick,
          searchValue,
          setSearchValue,
          isChoosenSortH2L,
          setIsChoosenSortH2L,
          addKeyForObjState,
          setProducts,
          setAllProducts,
          setLoading,
          productID,
          setProductID,
          products,
          loading,
          cartList,
          setCartList,
          categories,
          choosenSortPrice,
          onFilterChange,
          setChoosenSortPrice,
          allProducts,
        }}
      >
        <Nav />
        <div className="main">
          <Routes>
            <Route path="/" element={<EnterPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/admin/product-management"
              element={<ManagProdPage />}
            />
            <Route path="/about" element={<AboutMePage />} />
            <Route path="/products/:productid" element={<ProductPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
