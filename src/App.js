import React from "react";
import Nav from "./components/nav/Nav";
import { Landing, Profile, Feedback, Complaint ,Loginpage } from "./components";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

  
const App = () => {
  
  return (
    <>
      <Router>
        <Redirect to="/loginpage"/>
        <Switch>
          <Route exact path="/loginpage" component={Loginpage}/>
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
