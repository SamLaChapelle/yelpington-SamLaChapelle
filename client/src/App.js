//importing css for App
import "./App.css";
//importing browser router, route, switch, link
import { BrowserRouter, Route, Switch} from "react-router-dom";
//importing home page
import Home from "./components/home";
//importing restaurant page
import RestaurantPage from "./components/RestaurantPage";

//main function App
function App() {
  return (
    <div>
      {/* Browser Router housing a switch with two main routes */}
      <BrowserRouter>
        <Switch>
          {/* One route for the main home page and the second for the restaurant pages */}
          <Route exact path="/" component={Home} />
          <Route path="/restaurant/:id" component={RestaurantPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

//exporting default App function
export default App;
