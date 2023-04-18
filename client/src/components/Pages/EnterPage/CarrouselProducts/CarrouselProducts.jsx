import React, { useContext, useEffect, useState } from "react";
import { getMultipleRandom } from "../../../../.js/functions";
import "./CarrouselProducts.css";
import MyContext from "../../../../.js/MyContext";
import ProductCard from "../../CategoryPage/ProductCard/ProductCard";
const CarrouselProducts = () => {
  const [carrouselItems, setCarrouselItems] = useState([]);
  const { allProducts } = useContext(MyContext);
  useEffect(() => {
    const arr = getMultipleRandom(allProducts, 5);
    setCarrouselItems(arr);
  }, [allProducts]);
  return (
    <div className="enter-page-carrousel">
      <h2>most popular</h2>
      <div className="enter-page-most-popular">
        {carrouselItems.map((event, index) => (
          <ProductCard
            category={event.category}
            key={index + 10}
            Urlimage={event.url_img}
            id={event._id}
            title={event.title}
            price={event.price}
          />
        ))}
      </div>
    </div>
  );
};

export default CarrouselProducts;
