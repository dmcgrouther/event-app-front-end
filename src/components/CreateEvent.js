import React, { Component } from 'react';
import axios from 'axios';
import DateAndTimePick from './DateAndTimePick';
import { Link } from 'react-router-dom';

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

    // //one way
    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(this.state);
    //     axios.post(`${process.env.REACT_APP_API_URL}/events`, this.state)
    //       .then((res) => {
    //         console.log(res);
    //       })
    //       .catch((err) => console.log(err));
    // }

  //   //different way
  //   async handleSubmit (event) {
  //     event.preventDefault();
  //     console.log(this.state);
  //     let eventId;

  //     const firstResponse = await Promise.all(
  //     axios.post(`${process.env.REACT_APP_API_URL}/events`, this.state)
  //     .then((res) => {
  //       console.log(res);
  //       eventId = res.data.data._id;
  //       console.log(eventId)
  //     })
  //     .catch((err) => console.log(err))
  //     ),

  //     // console.log(`eventId is ${this.eventId}`),

  //     const secondResponse = await axios.put(`${process.env.REACT_APP_API_URL}/users/${this.props.currentUser}`, {
  //       eventsUserIsHosting: this.state.eventsUserIsHosting.concat(this.eventId)
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     }, (error) => {
  //       console.log(error)
  //     })
  // }

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
      })
      .catch((err) => console.log(err))
      // window.location = `/events/${res.data.data._id}`;
  }

//   axios.put(`${process.env.REACT_APP_API_URL}/users/${this.props.currentUser}`, {
//     usersEventsAsAttendee: this.state.usersEventsAsAttendee.concat(window.location.pathname.split('/')[2])
// })
// .then((response) => {
//     console.log(response);
// },(error) => {
//     console.log(error)
// })
    
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
              <h1>In order to create an event you need to be signed up.</h1>
              <p>Click <Link to={'/Login'}>here</Link> to login to your account.</p>
              <p>Don't have an account? Click <Link to={'/Register'}>here</Link> to create an account.</p>
            </>
          )
        } else {
          return (
            <div className="container mt-4">
              <div className="row">
                <div className="col-md-4 offset-md-4">
                  <h4 className="mb-3">Create Event</h4>
                  <DateAndTimePick 
                    handleDatePickerSubmit={this.handleDatePickerSubmit}
                    handleDatePickerChange={this.handleDatePickerChange}
                    eventDate={this.state.eventDate}
                  />
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
                    <div className="form-group">
                      <label htmlFor="name">Estimated Game length (in hours)</label>
                      <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="eventLengthInHours" name="eventLengthInHours" value={this.state.eventLengthInHours} />
                    </div>
                    <button className="btn btn-primary float-right" type="submit">Create Event</button>
                  </form>
                </div>
              </div>
            </div>
          )
        }
      }
}

export default CreateEvent;