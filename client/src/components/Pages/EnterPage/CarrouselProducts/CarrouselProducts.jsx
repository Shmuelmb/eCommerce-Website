import React from "react";
import ProductCard from "../../CategoryPage/ProductCard/ProductCard";
const CarrouselProducts = ({ arr }) => {
  return (
    <div className="enter-page-carrousel-prods">
      {arr.map((event, index) => (
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
  );
};

export default CarrouselProducts;
