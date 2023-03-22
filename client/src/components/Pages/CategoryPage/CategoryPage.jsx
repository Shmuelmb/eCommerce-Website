import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyContext from "../../../.js/MyContext";
import ShoppingBarTools from "../EnterPage/ShoppingBarTools/ShoppingBarTools";
import "./CategoryPage.css";
import ProductCard from "./ProductCard/ProductCard";
import SortComponnet from "./SortComponnet/SortComponnet";
import LoadingPage from "../LoadingPage/LoadingPage";

const CategoryPage = () => {
  //func
  const filterProductsPriceHigh2Low = (x) => {
    x.sort((p1, p2) =>
      Number(p1.price) < Number(p2.price)
        ? 1
        : Number(p1.price) > Number(p2.price)
        ? -1
        : 0
    );
  };
  const filterProductsPriceLow2High = (x) => {
    x.sort((p1, p2) =>
      Number(p1.price) < Number(p2.price)
        ? -1
        : Number(p1.price) > Number(p2.price)
        ? 1
        : 0
    );
  };
  //STATE OBJ

  // localList - רשימה מקומית שמתרנדרת ומכילה את רשימת המוצרים עם כל המנופולציות
  //listCategoryProcuts - רשימת המוצרים לפי קטגוריה בסדר המקורי שלה ללא מניפולציות, נוצר ממנה העתק ללוקאל ליסט
  //listFilter - רשימה שעליה בפועל מובצעות המניפולציות
  const [localList, setLocalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const Category = category.toUpperCase();
  const {
    setChoosenSortPrice,
    setIsChoosenSortH2L,
    isChoosenSortH2L,
    setListCategoryProducts,
    listCategoryProducts,
    choosenSortPrice,
  } = useContext(MyContext);

  const getProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/products/productsByCategoryController/${Category}`
      );
      const data = await response.json();
      setListCategoryProducts(data);
      setLocalList(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts(); // נועד לייבא את המוצרים מהשרת בכל פעם שיוצאים או מרעננים את הדף
    setIsChoosenSortH2L(); // נועד לאפס את אפשרות סידור המוצרים בכל פעם שיוצאים או מרעננים את הדף
    setLoading(true); //  נועד לרנדר את כל הקומפוננטות בכל פעם שעוברים קטגרויה
    setChoosenSortPrice([0, 999]);
  }, [category]);

  useEffect(() => {
    const listFilter = listCategoryProducts.filter(
      (ev) =>
        Number(ev.price) >= choosenSortPrice[0] &&
        Number(ev.price) <= choosenSortPrice[1]
    ); // מפלטר את המוצרים שנמצאים בטווח המחירים שנבחר

    if (isChoosenSortH2L === "HIGH TO LOW") {
      filterProductsPriceHigh2Low(listFilter);
    } else if (isChoosenSortH2L === "LOW TO HIGH") {
      filterProductsPriceLow2High(listFilter);
    }
    setLocalList(listFilter);
  }, [choosenSortPrice, isChoosenSortH2L]);

  useEffect(() => {}, [isChoosenSortH2L]);

  return !loading ? (
    <div className="CategoryPage">
      <h1>{Category}'S COLLECTION</h1>
      <div className="products-container">
        <ShoppingBarTools />
        <div className="p">
          <SortComponnet />
          <div className="products-list">
            {localList.map((event, index) => {
              return (
                <ProductCard
                  category={event.category}
                  key={index + 10}
                  Urlimage={event.url_img}
                  id={event._id}
                  title={event.title}
                  price={event.price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default CategoryPage;
