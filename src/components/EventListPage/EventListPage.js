import React, { Component } from 'react';
import EventListPageTable from './EventListPageTable';
import { Link } from 'react-router-dom';
import './EventListPage.css';

class EventListPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.currentUser === null){
            return(
                <>
                    <h1 id="event-list-header">Upcoming Game Sessions</h1>
                    <p className="event-list-top-text">*Account needed to create or signup for events. Login <Link to={'/Login'}>here</Link>. Register <Link to={'/Register'}>here</Link>.*</p>
                    <p className="event-list-top-text">Click on an event to learn more!</p>
                    <EventListPageTable />
                </>
            )
        } else {
            return(
                <>
                    <h1 id="event-list-header">Upcoming Game Sessions</h1>
                    <p className="event-list-top-text">Click on an event to learn more!</p>
                    <EventListPageTable />
                </>
            )
        }
    }
}

export default EventListPage;