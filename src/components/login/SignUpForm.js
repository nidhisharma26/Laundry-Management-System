import React, { Component } from "react";
import { Link } from "react-router-dom";
import {  createUserWithEmailAndPassword} from "firebase/auth";
import {firebaseAuth} from '../realbackend/firebase';
class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      name: "",
      hasAgreed: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handlesubmit(ele){
      try{
        if(ele.hasAgreed==true)
        {
            await createUserWithEmailAndPassword(firebaseAuth,this.state.email,this.state.password);
            alert("User has been succesfully registerd. Please login")
        }
        else   if(ele.hasAgreed==false){
            alert("Please accept terms and conditions");
        }
      }
      catch(err){
            alert(err.code);
      }
       

  }
  

  render() {
    return (
      <div className="formCenter">
        <div  className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="formFieldInput"
              placeholder="Enter your full name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
         
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
            <label className="formFieldCheckboxLabel">
              <input
                className="formFieldCheckbox"
                type="checkbox"
                name="hasAgreed"
                value={this.state.hasAgreed}
                onChange={this.handleChange}
              />{" "}
              I agree all statements in{" "}
              <a href="null" className="formFieldTermsLink">
                terms of service
              </a>
            </label>
          </div>

          <div className="formField">
            <button className="formFieldButton" onClick={()=>this.handlesubmit(this.state)} >Sign Up</button>{" "}  
            <Link to="/" className="formFieldLink">
              I'm already member
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUpForm;
