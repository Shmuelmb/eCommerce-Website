import React from "react";
import "./NotFoundPage.css";
import { scrollToTop } from "../../../.js/functions";
const NotFoundPage = () => {
  //scroll the component to top when you enter to the page from route
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="NotFound">
      <h1>Oops, this page not exists</h1>
    </div>
  );
};

export default NotFoundPage;
