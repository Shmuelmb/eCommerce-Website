import React, { useState } from "react";
import { createContext } from "react";

export const GlobalContext = createContext(null);
export const Context = ({ children }) => {
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
  const [stateDrawer, setStateDrawer] = useState({ right: false });

  return (
    <GlobalContext.Provider
      value={{
        stateDrawer,
        setStateDrawer,
        userCartList,
        setUserCartList,
        listCategoryProducts,
        setListCategoryProducts,
        setIsAuth,
        isAuth,
        productsFilter,
        setProductsFilter,
        // onSearchClick,
        searchValue,
        setSearchValue,
        isChoosenSortH2L,
        setIsChoosenSortH2L,
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
        // onFilterChange,
        setChoosenSortPrice,
        allProducts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
