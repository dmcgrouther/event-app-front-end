import React, { Component } from 'react';
import axios from 'axios';

//get data
//render data to page

class EventPage extends Component {

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
    };

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
            })
            console.log(res)
          })
          .catch((err) => console.log(err));
    }

    render () {
        return (
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
            </>
        )
    }


}

export default EventPage;