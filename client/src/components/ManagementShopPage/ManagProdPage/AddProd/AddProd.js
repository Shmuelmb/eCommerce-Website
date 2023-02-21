import React, { useState } from "react";
import "./AddProd.css";
const AddProd = () => {
  const [obj, setObj] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  });

  const inputs = [
    {
      type: "text",
      name: "title",
      placeholder: "enter title",
    },
    {
      type: "number",
      name: "price",
      placeholder: "enter price",
    },
    {
      type: "text",
      name: "description",
      placeholder: "enter description",
    },
    {
      type: "text",
      name: "category",
      placeholder: "enter category",
    },
    {
      type: "text",
      name: "image",
      placeholder: "enter image",
    },
  ];

  //func

  const addProduct = async (product) => {
    if (product.image === "") return delete product.image; // נועד לוודא שלא הוכנסה כתובת ויגרום לכך שתיכנס כתובת לתמונה דיפולטיבית
    try {
      const prod = JSON.stringify(product);
      const response = await fetch(
        "http://localhost:8000/api/products/addProduct",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: prod,
        }
      );
      const req = await response.json();
      console.log(req);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="add-prod">
      <h1>Add product manually</h1>
      {inputs.map((input, index) => (
        <input
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          key={index + 10}
          onChange={(x) => {
            setObj({ ...obj, [x.target.name]: x.target.value });
          }}
        />
      ))}
      <input
        type="number"
        name="rate"
        placeholder="enter rate"
        onChange={(x) => {
          setObj({
            ...obj,
            rating: { ...obj.rating, [x.target.name]: x.target.value },
          });
        }}
      />
      <input
        type="number"
        name="count"
        placeholder="enter count"
        onChange={(x) => {
          setObj({
            ...obj,
            rating: { ...obj.rating, [x.target.name]: x.target.value },
          });
        }}
      />
      <button
        onClick={() => {
          addProduct(obj);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default AddProd;
