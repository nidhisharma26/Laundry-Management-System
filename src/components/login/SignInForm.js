import { bottomNavigationClasses } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {firebaseAuth} from '../realbackend/firebase';
import { signOut, signInWithEmailAndPassword  ,onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";
import { Redirect } from 'react-router-dom';



class SignInForm extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value =  target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
    console.log(this.state.email+" "+this.state.password);
  }

  async handlesubmitlogin(e,p)
  {
      try{
            await signInWithEmailAndPassword(firebaseAuth,e,p);
            console.log("success");
            this.props.navigation();
      }
      catch(err){
            alert(err.code);
      }
  }

  render() {
    return (
      <div className="formCenter">
        <div className="formFields" >
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
              
              <button className="formFieldButton" onClick={()=>{this.handlesubmitlogin(this.state.email,this.state.password)}}>Sign In</button> 
              
            

            <Link to="/sign-up" className="formFieldLink">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInForm;
