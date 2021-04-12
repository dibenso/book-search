import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./pages/Search";
import Saved from "./pages/Saved";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route path="/saved" component={Saved} />
      </Switch>
    </Router>
  );
}

export default App;
