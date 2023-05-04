import React, { useState } from "react";

const AddUser = () => {
  const [obj, setObj] = useState({
    username: "",
    password: "",
    email: "",
    isAdmin: "",
  });

  const inputs = [
    {
      type: "text",
      name: "username",
      placeholder: "enter user name",
    },
    {
      type: "text",
      name: "password",
      placeholder: "enter password",
    },
    {
      type: "text",
      name: "email",
      placeholder: "enter email",
    },
    {
      type: "text",
      name: "isAdmin",
      placeholder: "is admin ?",
    },
  ];

  //func

  const addUser = async (user) => {
    try {
      const newUser = JSON.stringify(user);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/users/addUser`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: newUser,
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
      <h1>Add user manually</h1>
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
      <button
        onClick={() => {
          console.log(obj);
          addUser(obj);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default AddUser;
