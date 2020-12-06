// using GA MERN auth for this
// https://git.generalassemb.ly/kbbushman/react-auth/blob/master/src/components/Auth/Register.js
//make sure to uncomment out the part in handlesubmit to sync with backend. 

import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, this.state)
      .then((res) => {
        console.log(res)
        this.props.setCurrentUser(res.data.data);
        window.location = '/eventlist';
      })
      .catch((error) => console.log(error))
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h1 className="mb-3">Register</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <br />
                <input onChange={this.handleChange} className="form-control form-control-lg" type="text" required={true} id="name" name="name" value={this.state.name} />
              </div>
              <div className="form-group">
                <label htmlFor="name">Email</label>
                <br />
                <input onChange={this.handleChange} className="form-control form-control-lg" type="email" required={true} id="email" name="email" value={this.state.email} />
              </div>
              <div className="form-group">
                <label htmlFor="name">Password</label>
                <br />
                <input onChange={this.handleChange} className="form-control form-control-lg" type="password" required={true} id="password" name="password" value={this.state.password} />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <br />
                <input onChange={this.handleChange} className="form-control form-control-lg" type="password" required={true} id="password2" name="password2" value={this.state.password2} />
              </div>
              <br />
              <button className="btn btn-primary float-right call-to-action-button" type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
};

export default Register;