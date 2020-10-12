import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import EventListPage from '../components/EventListPage/EventListPage';
import Register from '../components/Register';
import Login from '../components/Login';
import CreateEvent from '../components/CreateEvent';

export default (
    <Switch>
        <Route exact path='/' component={ Home }/>
        <Route path='/about' component= { About }/>
        <Route path='/eventlist' component={ EventListPage }/>
        <Route path='/register' component={ Register } />
        <Route path='/Login' component={ Login } />
        <Route path='/CreateEvent' component={ CreateEvent } />
    </Switch>
);