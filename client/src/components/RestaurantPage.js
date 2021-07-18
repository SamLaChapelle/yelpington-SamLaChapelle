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

function RestaurantPage({ modal, handleModalClose }) {
  const [resData, setResData] = useState("");
  console.log(modal);
  //declaring a variable assigned to the specific id entered in to the path
  let restaurantId = document.location.pathname.split("/").splice(-1);
  console.log(restaurantId);

  useEffect(() => {
    if (!resData) {
      //fetching for the specified JSON object by it's id entered in the pathname
      fetch("/api/" + restaurantId)
        .then((res) => res.json())
        .then((obj) => {
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
        <h1 id="resPageTitle">Yelpington</h1>
        {resData ? (
          <div id="mainResDisplay">
            <div id="restaurantResDisplay">
              <button>
                <Link id="homeButton" to="/">Home</Link>
              </button>
              <h1 id="restaurantName">{resData.name}</h1>
              <h4 id="resAddress">Address | {resData.address}</h4>
              <h4 id="resPhoneNumber">Phone Number | {resData.phoneNumber}</h4>
              <h4 id="resHours">Hours | {resData.hours}</h4>
              <h4 id="customerNotes">Customer Comments</h4>
              <ul id="resNotes">
                <li>{resData.notes.noteOne}</li>
                <li>{resData.notes.noteTwo}</li>
              </ul>
            </div>
            <div id="resMapDisplay">
              <MapContainer
                center={resData.position}
                zoom={13}
                style={{ height: "60vh", width: "50vw" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={resData.position} icon={DefaultIcon}>
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

export default RestaurantPage;
