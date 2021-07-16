import React from "react";
import { useState, useEffect } from "react";

function RestaurantPage() {
  //declaring a variable assigned to the specific id entered in to the path
  let restaurantId = document.location.pathname.split("/").splice(-1);
  console.log(restaurantId);
  useEffect(() => {
    //fetching for the specified JSON object by it's id entered in the pathname
    fetch("/api/" + restaurantId)
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
      });
  });

  return <div></div>;
}

export default RestaurantPage;
