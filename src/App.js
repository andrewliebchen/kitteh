import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Foster from "./Foster";

const App = () => (
  <div>
    <Router>
      <Route path="/:fosterName" component={Foster} />
    </Router>
    <ToastContainer hideProgressBar={true} />
  </div>
);

export default App;
