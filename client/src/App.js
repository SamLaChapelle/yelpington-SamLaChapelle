//importing css for App
import "./App.css";
//importing use Effect
import { useEffect, useState } from "react";
//main function App
function App() {
  const [restaurants, setRestaurants] = useState(null);
  //fetching for the JSON object array holding all restaurant id's
  useEffect(() => {
    if (!restaurants) {
      fetch("/api")
        .then((res) => res.json())
        .then((obj) => {
          console.log(obj);
        });
    }
  });

  //declaring a variable assigned to the specific id entered in to the path
  let restaurantId = document.location.pathname.split("/").splice(-1);
  console.log(restaurantId);
  //fetching for the specified JSON object by it's id entered in the pathname
  fetch("/api/" + restaurantId)
    .then((res) => res.json())
    .then((resData) => {
      console.log(resData);
    });

  return (
    <div>
      <h1>Yelpington</h1>
    </div>
  );
}

export default App;
