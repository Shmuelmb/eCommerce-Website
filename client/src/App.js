import "./App.css";
import { useEffect, useState } from "react";
import MyContext from "./MyContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShopMain from "./components/ShopMain/ShopMain";
import NotFound from "./components/NotFound/NotFound";
import AboutMe from "./components/AboutMe/AboutMe";
import Nav from "./components/Nav/Nav";
import ProductPage from "./components/ProductPage/ProductPage";
import LoginPage from "./components/LoginPage/LoginPage";
import Register from "./components/Register/Register";
import ManagementShopPage from "./components/ManagementShopPage/ManagementShopPage";
import ManagProdPage from "./components/ManagementShopPage/ManagProdPage/ManagProdPage";
function App() {
  // useState object
  const [searchValue, setSearchValue] = useState("");
  const [choosenSortPrice, setChoosenSortPrice] = useState([0, 999.99]);
  const [isChoosenSortH2L, setIsChoosenSortH2L] = useState();
  const [products, setProducts] = useState([]); // המוצרים עם השינויים שלהם
  const [allProducts, setAllProducts] = useState([1, 2]); // רשימת המוצרים ללא שינוים עליהם
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [productID, setProductID] = useState("");
  const [productsFilter, setProductsFilter] = useState([]);

  // func
  const onFilterChange = (e) => {
    if (e.target.value === "All categories") {
      setProducts(allProducts);
    } else {
      setProducts(allProducts.filter((p) => p.category === e.target.value));
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
  categories.unshift("All categories");

  return (
    <BrowserRouter>
      <MyContext.Provider
        value={{
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
            <Route path="/" element={<ShopMain />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<ManagementShopPage />} />
            <Route
              path="/admin/product-management"
              element={<ManagProdPage />}
            />

            <Route path="about" element={<AboutMe />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/products/:productid" element={<ProductPage />} />
          </Routes>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
