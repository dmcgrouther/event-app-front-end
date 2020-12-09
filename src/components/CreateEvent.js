import React, { Component } from 'react';
import axios from 'axios';
import DateAndTimePick from './DateAndTimePick';
import { Link } from 'react-router-dom';
import './CreateEvent.css';

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
        eventLengthInHours: '',
        hostUser: this.props.currentUser,
        //below state value is added so you can add this event the to users list of hosted events.
        eventsUserIsHosting: '',
    };

    //component did mount to get users hosting events
    componentDidMount () {
      axios.get(`${process.env.REACT_APP_API_URL}/users/${this.props.currentUser}`)
      .then((res) => {
        this.setState({
          eventsUserIsHosting: res.data.data.eventsUserIsHosting
        })
        console.log(res)
      })
      .catch((err) => console.log(err))
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/events`, this.state)
      .then((res) => {
        console.log(res)
        this.setState({
          eventsUserIsHosting: this.state.eventsUserIsHosting.concat(res.data.data._id)
        })
        axios.put(`${process.env.REACT_APP_API_URL}/users/${this.props.currentUser}`, {
          eventsUserIsHosting: this.state.eventsUserIsHosting
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => console.log(error))
        window.location = `/events/${res.data.data._id}`;
      })
      .catch((err) => console.log(err))
  }
    
    handleDatePickerSubmit = (e) => {
      e.preventDefault();
      console.log(this.state.eventDate)
    }

    handleDatePickerChange = (date) => {
      this.setState({
          eventDate: date
      })
    }

      render() {
        if(this.props.currentUser === null){
          return(
            <>
              <h2>In order to create an event you need to be registered and signed in.</h2>
              <p>Click <Link to={'/Login'}>here</Link> to login to your account.</p>
              <p>Don't have an account? Click <Link to={'/Register'}>here</Link> to create an account.</p>
            </>
          )
        } else {
          return (
            <div className="container mt-4">
              <div className="row">
                <div className="col-md-4 offset-md-4">
                  <h1 className="mb-3">Create Event</h1>
                  <p className="event-date">Event Time and Date</p>
                  <DateAndTimePick 
                    handleDatePickerSubmit={this.handleDatePickerSubmit}
                    handleDatePickerChange={this.handleDatePickerChange}
                    eventDate={this.state.eventDate}
                  />
                  <form onSubmit={this.handleSubmit}>
                      
                    {/* <div className="form-group">
                      <label htmlFor="name">Event Date</label>
                      <DateAndTimePick 
                        handleDatePickerSubmit={this.handleDatePickerSubmit}
                        handleDatePickerChange={this.handleDatePickerChange}
                        eventDate={this.state.eventDate}
                      />
                    </div> */}

                    <div className="form-group">
                      <label htmlFor="name">Event Name</label>
                      <br />
                      <input onChange={this.handleChange} className="form-control form-control-lg" type="text" required={true} id="eventName" name="eventName" value={this.state.eventName} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Game System</label>
                      <br />
                      <input onChange={this.handleChange} className="form-control form-control-lg" type="text" required={true} id="gameSystem" name="gameSystem" value={this.state.gameSystem} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Game Edition</label>
                      <br />
                      <input onChange={this.handleChange} className="form-control form-control-lg" type="text" required={true} id="gameEdition" name="gameEdition" value={this.state.gameEdition} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Maximum Non-Host Player Count</label>
                      <br />
                      <input onChange={this.handleChange} className="form-control form-control-lg" type="text" required={true} id="maximumNonHostPlayerCount" name="maximumNonHostPlayerCount" value={this.state.maximumNonHostPlayerCount} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">How The Event Happens</label>
                      <br />
                      <input onChange={this.handleChange} className="form-control form-control-lg" type="text" required={true} id="howTheEventHappens" name="howTheEventHappens" value={this.state.howTheEventHappens} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Meetup Gathering Info</label>
                      <br />
                      <input onChange={this.handleChange} className="form-control form-control-lg" type="text" required={true} id="meetupGatheringInfo" name="meetupGatheringInfo" value={this.state.meetupGatheringInfo} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Type Of Event Activity</label>
                      <br />
                      <input onChange={this.handleChange} className="form-control form-control-lg" type="text" required={true} id="typeOfEventActivity" name="typeOfEventActivity" value={this.state.typeOfEventActivity} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Event Description</label>
                      <br />
                      <input onChange={this.handleChange} className="form-control form-control-lg" type="text" required={true} id="eventDescription" name="eventDescription" value={this.state.eventDescription} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Experience Level</label>
                      <br />
                      <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="experienceLevel" name="experienceLevel" value={this.state.experienceLevel} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Estimated Event Length (in hours)</label>
                      <br />
                      <input onChange={this.handleChange} className="form-control form-control-lg" type="text" required={true} id="eventLengthInHours" name="eventLengthInHours" value={this.state.eventLengthInHours} />
                    </div>
                    <br />
                    <button className="btn btn-primary float-right call-to-action-button" type="submit">Create Event</button>
                  </form>
                </div>
              </div>
            </div>
          )
        }
      }
}

export default CreateEvent;