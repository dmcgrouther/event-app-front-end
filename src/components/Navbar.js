import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <header>
            <nav>
                <Link to={'/'}>Home</Link>
                <Link to={'/About'}>About</Link>
                <Link to={'/EventList'}>Event List</Link>
                {!props.currentUser && <Link to={'/Register'}>Register</Link>}
                {!props.currentUser && <Link to={'/Login'}>Login</Link>}
                {props.currentUser && <Link to={`/users/${props.currentUser}`}>Your Info</Link>}
                {props.currentUser && <button onClick={() => props.logout() }>Logout</button>}
            </nav>
        </header>
    );
};

export default Navbar;