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
function App() {
  // useState object
  const [searchValue, setSearchValue] = useState("");
  const [choosenSortPrice, setChoosenSortPrice] = useState([0, 999.99]);
  const [isChoosenSortH2L, setIsChoosenSortH2L] = useState();
  const [products, setProducts] = useState([]); // המוצרים עם השינויים שלהם
  const [allProducts, setAllProducts] = useState([]); // רשימת המוצרים ללא שינוים עליהם
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

  // actions
  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/products/getAllProducts"
      );
      const data = await response.json();
      setAllProducts(data);
      setProducts(data);
      addKeyForObjState(setCartList, "Amount", 0, data);
      addKeyForObjState(setCartList, "DateCreated", 0, data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
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
        }}>
        <Nav />
        <Routes>
          <Route path="/" element={<ShopMain />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<ManagementShopPage />} />
          <Route path="about" element={<AboutMe />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/products/:productid" element={<ProductPage />} />
        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
