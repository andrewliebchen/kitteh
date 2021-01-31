import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Foster from "./Foster";
import Animal from "./Animal";

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/animals/:animalId" component={Animal} />
        <Route path="/:fosterName" component={Foster} />
      </Switch>
    </Router>
    <ToastContainer hideProgressBar={true} />
  </div>
);

export default App;
