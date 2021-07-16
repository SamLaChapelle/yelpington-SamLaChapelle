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
//sending a get request to set up a route for the JSON object array housing all restaurant id's
app.get("/api", (req, res) => {
  let rests = allRestaurants();
  let resData = JSON.stringify(rests);
  res.type("text/json").send(resData);
});

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
