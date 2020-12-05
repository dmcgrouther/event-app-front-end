import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = (props) => {
    return (
        <header>
            <nav className="navbar">
                <Link className="navbar-link" to={'/'}>Home</Link>
                <Link className="navbar-link" to={'/About'}>About</Link>
                <Link className="navbar-link" to={'/EventList'}>Event List</Link>
                {!props.currentUser && <Link className="navbar-link" to={'/Register'}>Register</Link>}
                {!props.currentUser && <Link className="navbar-link" to={'/Login'}>Login</Link>}
                {props.currentUser && <Link className="navbar-link" to={`/users/${props.currentUser}`}>Your Info</Link>}
                {/* {props.currentUser && <button onClick={() => props.logout() }>Logout</button>} */}
                {props.currentUser && <Link className="navbar-link" to={'/login'} onClick={() => props.logout() }>Logout</Link>}
            </nav>
        </header>
    );
};

export default Navbar;