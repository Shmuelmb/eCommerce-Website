import { unionBy } from "lodash";
function mergeTwoArrays(_arrayA, _arrayB) {
  const orders = unionBy(_arrayA, _arrayB, "_id");
  return orders;
}

// function removeItemOnce(arr, value) {
//   var index = arr.indexOf(value);
//   if (index > -1) {
//     arr.splice(index, 1);
//   }
//   return arr;
// }

export const getMultipleRandom = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};
export const addAmount = (arr, setArr, eventOfClick) => {
  const newArr = [...arr];
  const clickID = eventOfClick.target.id;
  newArr.map((ev) => {
    if (ev._id === clickID) {
      ev.Amount++;
    }
  });
  setArr(newArr);
};

export const upDateUserCartList = (cartList, setUserCartList) => {
  const userList = JSON.parse(localStorage.getItem("userList"));
  const arr = cartList.filter((i) => i.Amount > 0);
  setUserCartList(arr);
  localStorage.setItem("userList", JSON.stringify(arr));
};

export const upDateUserCartListAfterRealod = (cartList, setCartList) => {
  const userList = JSON.parse(localStorage.getItem("userList"));
  if (userList && cartList.length > 0) {
    const arr = mergeTwoArrays(userList, [...cartList]);
    setCartList(arr);
  }
};

export const removeAmount = (arr, setArr, eventOfClick) => {
  const newArr = [...arr];
  const clickID = eventOfClick.target.id;
  newArr.map((ev) => {
    if (ev._id === clickID) {
      ev.Amount--;
      if (ev.Amount === 0) {
        ev.DateCreated = 0;
      }
    }
  });
  setArr(newArr);
};
