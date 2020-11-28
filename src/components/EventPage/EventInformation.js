import React, { Component } from 'react';
import axios from 'axios';

class EventInformation extends Component {


    constructor(props){
        super(props);
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
            currentNonHostPlayerCount: '',
            nonHostUsers: ''
        };
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
                nonHostUsers: res.data.data.nonHostUsers,
                currentNonHostPlayerCount: res.data.data.nonHostUsers.length,
            })
            console.log(res)
          })
          .catch((err) => console.log(err));
    }

    render() {
        return(
            <>
                <h1>{this.state.eventName}</h1>
                    <div>
                        Game System: {this.state.gameSystem}
                    </div>
                    <div>
                        Game Edition: {this.state.gameEdition}
                    </div>
                    <div>
                        Event Date: {this.state.eventDate}
                    </div>
                    <div>
                        Non host max players: {this.state.maximumNonHostPlayerCount}
                    </div>
                    <div>
                        How the event happens: {this.state.howTheEventHappens}
                    </div>
                    <div>
                        Meetup Gathering Info: {this.state.meetupGatheringInfo}
                    </div>
                    <div>
                        Type Of Event Activity: {this.state.typeOfEventActivity}
                    </div>
                    <div>
                        Event Description: {this.state.eventDescription}
                    </div>
                    <div>
                        Estimated Game length (in hours): {this.state.eventLengthInHours}
                    </div>
                    <div>
                        Number of players besides host: {this.state.currentNonHostPlayerCount}
                    </div>
    
                    {/* <button onClick={this.handleJoinEventClick}>Click here to join</button> */}
                </>
        )
    }
}

export default EventInformation;