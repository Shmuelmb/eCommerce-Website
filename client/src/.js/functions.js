export const getMultipleRandom = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export const upDateUserCartList = (cartList, setUserCartList) => {
  const arr = [];
  cartList.map((i) => {
    if (i.Amount > 0) {
      arr.push(i);
      if (i.DateCreated === 0) {
        i.DateCreated = Date.now();
      }
    }
  });
  localStorage.setItem("usersList", JSON.stringify(arr));
  setUserCartList(arr);
  console.log(arr);
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
