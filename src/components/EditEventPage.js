import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DateAndTimePick from './DateAndTimePick';

class EditEventPage extends Component {
    constructor(props){
        super(props)
        this.state = {
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
            hostUser: '',
        }
        this.handleDatePickerSubmit = this.handleDatePickerSubmit.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    }
    componentDidMount () {
        axios.get(`${process.env.REACT_APP_API_URL}/events/${window.location.pathname.split('/')[2]}`)
        .then((res) => {
            this.setState({
                eventName: res.data.data.eventName,
                gameSystem: res.data.data.gameSystem,
                gameEdition: res.data.data.gameEdition,
                eventDate: res.data.data.eventDate,
                maximumNonHostPlayerCount: res.data.data.maximumNonHostPlayerCount,
                howTheEventHappens: res.data.data.howTheEventHappens,
                meetupGatheringInfo: res.data.data.meetupGatheringInfo,
                typeOfEventActivity: res.data.data.typeOfEventActivity,
                eventDescription: res.data.data.eventDescription,
                experienceLevel: res.data.data.experienceLevel,
                eventLengthInHours: res.data.data.eventLengthInHours,
                hostUser: res.data.data.hostUser,
            })
        })
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

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/events/${window.location.pathname.split('/')[2]}`, this.state)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => console.log(err))
    }


    render() {
        if(this.props.currentUser === this.state.hostUser[0]){
            // console.log(new Date(this.state.eventDate).toUTCString())
            return(
                <>
                    <h1>You may edit the event information below</h1>
                    
                    <p className="event-date">Event Time and Date</p>
                    <DateAndTimePick 
                        handleDatePickerSubmit={this.handleDatePickerSubmit}
                        handleDatePickerChange={this.handleDatePickerChange}
                        // eventDate={new Date(this.state.eventDate).toISOString().valueOf()}
                        eventDate={new Date(this.state.eventDate)}
                    />

                    <form onSubmit={this.handleSubmit}>

                        {/* <div className="form-group">
                        <label htmlFor="name">Event time</label>
                        <br />
                        <input onChange={this.handleChange} className="form-control form-control-lg" type="text" required={true} id="eventDate" name="eventDate" value={new Date(this.state.eventDate).toLocaleString()} />
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
                        <button className="btn btn-primary float-right call-to-action-button" type="submit">Edit Event</button>
                  </form>
                  <p>Click <Link to={`/events/${window.location.pathname.split('/')[2]}`}>here</Link> to view the event information.</p>
                  {/* <DateAndTimePick 
                    handleDatePickerSubmit={this.handleDatePickerSubmit}
                    handleDatePickerChange={this.handleDatePickerChange}
                    eventDate={this.state.eventDate}
                  /> */}
                </>
            )
        } else if(this.props.currentUser !== this.state.hostUser[0]) {
            // window.location = '/'
            return(
                <>
                    <h1>This is not an event you can edit</h1>
                    <p>Click <Link to={`/users/${this.props.currentUser}`}>here</Link> to view the events you are hosting.</p>
                </>
            )
        }
    }



}

export default EditEventPage;