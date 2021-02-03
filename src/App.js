import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Foster from "./Foster";
import Animal from "./Animal";

// TODO: Breadcrumbs for rescue -> foster -> animal

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/animals/:animalId" component={Animal} />
        <Route path="/:fosterName" component={Foster} />
      </Switch>
    </Router>
    <ToastContainer hideProgressBar={true} position="top-center" />
  </div>
);

export default App;
