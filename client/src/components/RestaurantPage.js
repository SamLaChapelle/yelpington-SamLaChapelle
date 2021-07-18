import React from "react";
import { useState, useEffect } from "react";
//importing MapContainer, TileLayer, Marker, Popup from react leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
//importing L from leaflet
import L from "leaflet";
//importing leaflet css to prevent tiles from scattering
import "leaflet/dist/leaflet.css";
//importing the icon and icon shadow
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
//importing Link
import { Link } from "react-router-dom";

//creating the default Icon for the map
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
//main Restaurant Page function
function RestaurantPage() {
  //setting default restaurant data to an empty string
  const [resData, setResData] = useState("");
  //declaring a variable assigned to the specific id entered in to the path through the link
  let restaurantId = document.location.pathname.split("/").splice(-1);
  console.log(restaurantId);
//useEffect hook housing a fetch inside a guard clause checking against if there isn't any resData then proceed with the fetch
  useEffect(() => {
    if (!resData) {
      //fetching for the specified restaurant JSON object by it's id entered in the pathname
      fetch("/api/" + restaurantId)
        .then((res) => res.json())
        .then((obj) => {
          //setting ResData to the object and iterating over the object by matching each specified key/value to the new key
          setResData({
            name: obj.name,
            address: obj.address,
            phoneNumber: obj.phoneNumber,
            hours: obj.hours,
            notes: obj.notes,
            position: obj.position,
          });
        });
    }
  });

  console.log(resData);

  return (
    <>
      <div>
        {/* restaurant page title */}
        <h1 id="resPageTitle">Yelpington</h1>
        {/* if restaurant data is true then generate the display/code below and if not then display loading... text */}
        {resData ? (
          <div id="mainResDisplay">
            <div id="restaurantResDisplay">
              {/* restaurant page home button linked to the home page */}
              <button>
                <Link id="homeButton" to="/">Home</Link>
              </button>
              {/* restaurant page info displayed left of map */}
              <h1 id="restaurantName">{resData.name}</h1>
              <h4 id="resAddress">Address : {resData.address}</h4>
              <h4 id="resPhoneNumber">Phone Number : {resData.phoneNumber}</h4>
              <h4 id="resHours">Hours : {resData.hours}</h4>
              <h4 id="customerNotes">Customer Comments</h4>
              <ul id="resNotes">
                <li>{resData.notes.noteOne}</li>
                <li>{resData.notes.noteTwo}</li>
              </ul>
            </div>
            {/* restaurant page map */}
            <div id="resMapDisplay">
              {/* restaurant page map container with position based on the resData obj info iterated */}
              <MapContainer
                center={resData.position}
                zoom={13}
                style={{ height: "60vh", width: "50vw" }}
              >
                {/* restaurant page map tile layer holding map type */}
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* restaurant page map marker position set through iterated resData info */}
                <Marker position={resData.position} icon={DefaultIcon}>
                  {/* restaurant page map popup set through iterated resData info */}
                  <Popup>{resData.name}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
//exporting default RestaurantPage function
export default RestaurantPage;
