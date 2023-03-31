import "./App.css";
import { useEffect, useState } from "react";
import MyContext from "./.js/MyContext";
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
import CategoryPage from "./components/Pages/CategoryPage/CategoryPage";
import { BASE_URL } from "./.js/constant-vars";
function App() {
  // useState object
  const [searchValue, setSearchValue] = useState("");
  const [choosenSortPrice, setChoosenSortPrice] = useState([0, 999]);
  const [isChoosenSortH2L, setIsChoosenSortH2L] = useState("");
  const [products, setProducts] = useState([]); // המוצרים עם השינויים שלהם
  const [allProducts, setAllProducts] = useState([]); // רשימת המוצרים ללא שינוים עליהם
  const [loadingAppData, setLoadingAppData] = useState(true);
  const [cartList, setCartList] = useState([]);
  const [productID, setProductID] = useState("");
  const [productsFilter, setProductsFilter] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [listCategoryProducts, setListCategoryProducts] = useState([]);
  const [userCartList, setUserCartList] = useState(
    JSON.parse(localStorage.getItem("userList")) || []
  );

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
  // const key = "retailPrice";
  // const createListOfKey = (arrayOfProcuts, key) => {
  //   const x = arrayOfProcuts
  //     .map((p) => console.log(p.retailPrice.amount))
  //     .filter((value, index, array) => array.indexOf(value) === index);
  //   return x;
  // };

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
  }, []);
  return (
    <BrowserRouter>
      <MyContext.Provider
        value={{
          userCartList,
          setUserCartList,
          listCategoryProducts,
          setListCategoryProducts,
          setIsAuth,
          isAuth,
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
          setLoadingAppData,
          loadingAppData,
          setProductID,
          productID,
          products,
          cartList,
          setCartList,
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
            <Route path="/category/:category" element={<CategoryPage />} />
          </Routes>
        </div>
        <Footer />
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
