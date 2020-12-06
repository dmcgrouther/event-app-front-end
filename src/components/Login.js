// using ga login heavily
// https://git.generalassemb.ly/kbbushman/react-auth/blob/master/src/components/Auth/Login.js
// uncomment handlesubmit when backendworks

import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, this.state)
      .then((res) => {
        console.log(res)
        this.props.setCurrentUser(res.data.data);
        this.props.history.push('/eventlist');
      })
      .catch((err) => console.log(err));
  }

  render() {
    // console.log('Hello From Render', this.state.address && this.state.address.street);
    // console.log(this.props);
    return (
      <div className="container mt-4">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <h1 className="mb-3">Login</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Email</label>
                  <br />
                  <input onChange={this.handleChange} className="form-control form-control-lg" type="email" id="email" name="email" value={this.state.email} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <br />
                  <input onChange={this.handleChange} className="form-control form-control-lg" type="password" id="password" name="password" value={this.state.password} />
                </div>
                <br />
                <button className="btn btn-primary float-right call-to-action-button" type="submit">Login</button>
              </form>
            </div>
          </div>
        </div>
    )
  }
};

export default withRouter(Login);