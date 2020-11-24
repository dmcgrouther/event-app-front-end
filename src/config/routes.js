import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import EventListPage from '../components/EventListPage/EventListPage';
import Register from '../components/Register';
import Login from '../components/Login';
import CreateEvent from '../components/CreateEvent';
import EventPage from '../components/EventPage';

export default ({ currentUser, setCurrentUser }) => (
    <Switch>
        <Route exact path='/' component={ Home }/>
        <Route path='/about' component= { About }/>
        <Route path='/eventlist' component={ EventListPage }/>
        <Route path='/register' component={ Register } />
        <Route path='/login' render={() => <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path='/CreateEvent' component={ CreateEvent } />
        <Route path='/events/:eventId' component={EventPage}/>
    </Switch>
);