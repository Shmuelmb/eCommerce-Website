import { unionBy } from "lodash";
// function unionBy(...arrays) {
//   const iteratee = arrays.pop();
//   if (Array.isArray(iteratee)) {
//     return []; // return empty if iteratee is missing
//   }

//   return [...arrays].flat().filter(
//     (
//       (set) => (o) =>
//         set.has(iteratee(o)) ? false : set.add(iteratee(o))
//     )(new Set())
//   );
// }
export const addKeyForObjState = (setArr, key, value, data) => {
  const newArr = [...data];
  newArr.map((ev) => (ev[key] = value));
  setArr(newArr);
};
function mergeTwoArrays(_arrayA, _arrayB) {
  const orders = unionBy(_arrayA, _arrayB, "_id");
  return orders;
}

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

export const upDateUserCartListAfterReload = (cartList, setCartList) => {
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

export const scrollToTop = () =>
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

export const toggleDrawer = (anchor, open, setState, state) => (event) => {
  if (
    event.type === "keydown" &&
    (event.key === "Tab" || event.key === "Shift")
  ) {
    return;
  }

  setState({ ...state, [anchor]: open });
};
