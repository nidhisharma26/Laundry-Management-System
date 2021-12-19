import React from "react";
import Nav from "./components/nav/Nav";
import { Landing, Profile, Feedback, Complaint } from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/feedback" component={Feedback} />
          <Route exact path="/complaint" component={Complaint} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
