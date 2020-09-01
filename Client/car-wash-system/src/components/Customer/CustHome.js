import React, { useEffect } from "react";
import CarouselComponent from "./CarouselComponent";
import Brands from "./Brands";

function Demo(props) {
  // useEffect(() => {
  //   const user = localStorage.getItem("customer");
  //   if (user) {
  //     console.log(user);
  //   } else {
  //     props.history.push("/login");
  //   }
  // }, []);
  return (
    <div>
      <CarouselComponent />
      <Brands />
    </div>
  );
}

export default Demo;
