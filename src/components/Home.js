import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div>
            <div className="home-page__header-section">
                <h1>
                    Welcome to Evently!
                </h1>
                <p>A website to schedule your favorite virtual tabletop gaming sessions</p>
            </div>
            <div>
                <p>
                    Have an account already? Login <Link to={'/Login'}>here</Link>.
                </p>
                <p>
                    If not, sign up <Link to={'/Register'}>here</Link>!
                </p>
            </div>
        </div>
    );
};

export default Home;