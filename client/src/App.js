//importing css for App
import "./App.css";
//importing browser router, route, switch, link
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
//importing home page
import Home from "./components/home";
//importing restaurant page
import RestaurantPage from "./components/RestaurantPage";

//main function App
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/restaurant/:id" component={RestaurantPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

//exporting default App function
export default App;
