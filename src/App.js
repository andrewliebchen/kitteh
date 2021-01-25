import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import AnimalList from "./AnimalList";
import AppContext from "./AppContext";
import { useContext, useEffect } from "react";

const App = () => (
  <Router>
    <Route path="/:fosterName" component={AnimalList} />
  </Router>
);

export default App;
