import React, { Component } from 'react';
import axios from 'axios';

class CreateEvent extends Component {

    state = {
        eventName: '',
        gameSystem: '',
        gameEdition: '',
        eventDate: '',
        maximumNonHostPlayerCount: '',
        howTheEventHappens: '',
        meetupGatheringInfo: '',
        typeOfEventActivity: '',
        eventDescription: '',
        experienceLevel: '',
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        axios.post(`${process.env.REACT_APP_API_URL}/events`, this.state)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      }

      render() {
        return (
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-4 offset-md-4">
                <h4 className="mb-3">Create Event</h4>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Event Name</label>
                    <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="eventName" name="eventName" value={this.state.eventName} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Game System</label>
                    <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="gameSystem" name="gameSystem" value={this.state.gameSystem} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Game Edition</label>
                    <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="gameEdition" name="gameEdition" value={this.state.gameEdition} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Event Date</label>
                    <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="eventDate" name="eventDate" value={this.state.eventDate} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Maximum Non-Host Player Count </label>
                    <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="maximumNonHostPlayerCount" name="maximumNonHostPlayerCount" value={this.state.maximumNonHostPlayerCount} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">How The Event Happens</label>
                    <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="howTheEventHappens" name="howTheEventHappens" value={this.state.howTheEventHappens} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Meetup Gathering Info</label>
                    <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="meetupGatheringInfo" name="meetupGatheringInfo" value={this.state.meetupGatheringInfo} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Type Of Event Activity</label>
                    <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="typeOfEventActivity" name="typeOfEventActivity" value={this.state.typeOfEventActivity} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Event Description</label>
                    <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="eventDescription" name="eventDescription" value={this.state.eventDescription} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Experience Level</label>
                    <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="experienceLevel" name="experienceLevel" value={this.state.experienceLevel} />
                  </div>
                  <button className="btn btn-primary float-right" type="submit">Create Event</button>
                </form>
              </div>
            </div>
          </div>
        )
      }
}

export default CreateEvent;