// using GA MERN auth for this
// https://git.generalassemb.ly/kbbushman/react-auth/blob/master/src/components/Auth/Register.js
//make sure to uncomment out the part in handlesubmit to sync with backend. 

import React, { Component } from 'react';
import axios from 'axios';
import './Register.css';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errorMessageVisible: 'hidden',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  somethingWentWrong () {
    this.setState({
      errorMessageVisible: 'visible'
    })
  }

  handleSubmit = (event) => {
    if (this.state.password !== this.state.password2){
      alert("Passwords do not match. Please try again.")
      event.preventDefault();
    } else {
      event.preventDefault();
      axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, this.state)
        .then((res) => {
          console.log(res)
          this.props.setCurrentUser(res.data.data);
          window.location = '/eventlist';
        })
        .catch((error) => console.log((error), this.somethingWentWrong()))
    }
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h1 className="mb-3 register-header">Register</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group register-form">
                <label htmlFor="name">Name</label>
                <br />
                <input onChange={this.handleChange} className="form-control form-control-lg" type="text" required={true} id="name" name="name" maxLength="40" value={this.state.name} />
              </div>
              <div className="form-group register-form">
                <label htmlFor="name">Email</label>
                <br />
                <input onChange={this.handleChange} className="form-control form-control-lg" type="email" required={true} id="email" name="email" maxLength="40" value={this.state.email} />
              </div>
              <div className="form-group register-form">
                <label htmlFor="name">Password</label>
                <br />
                <input onChange={this.handleChange} className="form-control form-control-lg" type="password" required={true} id="password" name="password" maxLength="40" value={this.state.password} />
              </div>
              <div className="form-group register-form">
                <label htmlFor="password2">Confirm Password</label>
                <br />
                <input onChange={this.handleChange} className="form-control form-control-lg" type="password" required={true} id="password2" name="password2" maxLength="40" value={this.state.password2} />
              </div>
              <br />
              <button className="btn btn-primary float-right call-to-action-button register-button" type="submit">Register</button>
              <p className="something-went-wrong" style={{visibility: this.state.errorMessageVisible}}>Something seems to have gone wrong. It might be that this email address is taken already.</p>
            </form>
          </div>
        </div>
      </div>
    )
  }
};

export default Register;