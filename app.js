//importing express and setting up the server
const express = require("express");
const app = express();
//importing path
const path = require("path");
//importing fs
const fs = require("fs");
//setting the port to whatever path or 5000
const port = process.env.PORT || 5000;
//creating a variable to house the folder holding all .json files
const restaurantDir = path.resolve("./restaurants");
//setting the server to a static server to always host ./client/public unless directed otherwise
app.use(express.static("./client/public"));

//sending a get request to set up the route for each individual restaurant JSON object
app.get("/api/:restaurantId", (req, res) => {
  let filePath = path.join(restaurantDir, req.params.restaurantId + ".json");
  res.sendFile(filePath);
});
//sending a get request to set up a route for the JSON object array housing all restaurant id's and each of their individual JSON objects
app.get("/api", (req, res) => {
  //assigning the rests variable to call the allRestaurant function
  let rests = allRestaurants();
  //assigning resData variable to the JSON object stringified the rests data
  let resData = JSON.stringify(rests);
  //sending the resData
  res.type("text/json").send(resData);
});

//this allRestaurants function looks in to the restaurants folder and for all files that end with .json then map over them and parse them and path.join with the main folder they are in
function allRestaurants() {
  return fs
    .readdirSync(restaurantDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(restaurantDir, file))));
}

//telling the server to listen for the port and print "local server is running..."
app.listen(port, () => {
  console.log("local server running...");
});
