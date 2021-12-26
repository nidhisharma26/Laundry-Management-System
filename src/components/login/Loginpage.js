import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink ,Switch} from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import logo from "../../assets/logoo.png";
import "./Loginpage.css";

class Loginpage extends Component {
    navigation=()=>{
        this.props.history.push("/");
    }
  render() {
    return (
      <Router>
        
        <div className="App">
          <div className="appAside" >
            
                <img
                    style={{ height: "20%", width: "15%",position: "relative",left: "40%"}}
                    src={logo}
                />
            
          </div>

          <div className="appForm">
            <div className="pageSwitcher">
              <NavLink exact to="/" activeClassName="pageSwitcherItem-active" className="pageSwitcherItem" >
                Sign In
              </NavLink>
              <NavLink exact to="/sign-up" activeClassName="pageSwitcherItem-active" className="pageSwitcherItem">
                Sign Up
              </NavLink>
            </div>

            <div className="formTitle">
              <NavLink exact to="/" activeClassName="formTitleLink-active" className="formTitleLink">
                Sign In
              </NavLink>
              <NavLink exact to="/sign-up" activeClassName="formTitleLink-active" className="formTitleLink">
                Sign Up
              </NavLink>
            </div>
            
            
            <Route exact path="/sign-up" render={(props) => <SignUpForm navigation = {this.navigation} />} />
            <Route exact path="/" render={(props) => <SignInForm navigation = {this.navigation} />} />
            
            
            
          
          </div>
        </div>
      </Router>
    );
  }
}

export default Loginpage;
