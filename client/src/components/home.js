//importing use Effect
import { useEffect, useState } from "react";
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

function Home() {
  //setting the state of center to a default center of the city of Richmond
  const [center, setCenter] = useState([37.5407, -77.436]);
  //set a property and set property through useState for restaurants
  const [restaurants, setRestaurants] = useState(null);
  //fetching for the JSON object array holding all restaurant id's through useEffect
  useEffect(() => {
    //added an if block to check if there is no restaurants then proceed with the fetch
    if (!restaurants) {
      fetch("/api")
        .then((res) => res.json())
        .then((obj) => {
          console.log(obj);
        });
    }
  });

  return (
    <div id="root">
      {/* home page title */}
      <h1 id="homeTitle">Yelpington</h1>
      {/* home page res list display and map */}
      <div id="mainDisplay">
        <div id="restaurantDisplay">
          {/* Restaurant List */}
          <h1 id="resDisplayTitle">RESTAURANTS</h1>
          <h3 id="resLocationsTitle">RICHMOND,VIRGINIA</h3>
          <ul id="resList">
            {/* each restaurant with their own link to their specified page */}
            <li>
              <Link class="resLinks" to="/restaurant/beauvine-burger-concept">
                Beauvine Burger Concept
              </Link>
            </li>
            <li>
              <Link class="resLinks" to="/restaurant/sticky-rice">
                Sticky Rice
              </Link>
            </li>
            <li>
              <Link class="resLinks" to="/restaurant/lunch-supper">
                Lunch. Supper!
              </Link>
            </li>
            <li>
              <Link class="resLinks" to="/restaurant/perlys">
                Perly's
              </Link>
            </li>
            <li>
              <Link class="resLinks" to="/restaurant/book-binders">
                Book Binder's
              </Link>
            </li>
            <li>
              <Link class="resLinks" to="/restaurant/shyndigz">
                Shyndigz
              </Link>
            </li>
            <li>
              <Link class="resLinks" to="/restaurant/goatocado">
                Goatocado
              </Link>
            </li>
            <li>
              <Link class="resLinks" to="/restaurant/christians-pizza">
                Christian's Pizza
              </Link>
            </li>
          </ul>
        </div>
        {/* map container with hard coded center zoom and styling */}
        <div id="mapDisplay">
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: "60vh", width: "50vw" }}
          >
            {/* tile layer housing map type */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Each marker set to its own specified location with a popup marker linked to its own specified page */}
            <Marker position={[37.54687, -77.45997]} icon={DefaultIcon}>
              <Popup>
                <Link to="/restaurant/beauvine-burger-concept">
                  Beauvine Burger Concept
                </Link>
              </Popup>
            </Marker>
            <Marker position={[37.55081, -77.46934]} icon={DefaultIcon}>
              <Popup>
                <Link to="/restaurant/sticky-rice">Sticky Rice</Link>
              </Popup>
            </Marker>
            <Marker position={[37.56578, -77.47304]} icon={DefaultIcon}>
              <Popup>
                <Link to="/restaurant/lunch-supper">Lunch. Supper!</Link>
              </Popup>
            </Marker>
            <Marker position={[37.54409, -77.44152]} icon={DefaultIcon}>
              <Popup>
                <Link to="/restaurant/perlys">Perly's</Link>
              </Popup>
            </Marker>
            <Marker position={[37.52916, -77.42319]} icon={DefaultIcon}>
              <Popup>
                <Link to="/restaurant/book-binders">Book Binder's</Link>
              </Popup>
            </Marker>
            <Marker position={[37.54779, -77.4654]} icon={DefaultIcon}>
              <Popup>
                <Link to="/restaurant/shyndigz">Shyndigz</Link>
              </Popup>
            </Marker>
            <Marker position={[37.54872, -77.46425]} icon={DefaultIcon}>
              <Popup>
                <Link to="/restaurant/goatocado">Goatocado</Link>
              </Popup>
            </Marker>
            <Marker position={[37.55084, -77.45352]} icon={DefaultIcon}>
              <Popup>
                <Link to="/restaurant/christians-pizza">Christian's Pizza</Link>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
//exported default home application
export default Home;
