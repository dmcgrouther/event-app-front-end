import React from 'react';
import './About.css'

const About = () => {
    return (
        <div>
            <div className="about__section">
            <h2 className="about__header">
                What is Event Finder?
            </h2>
                <p className="about__sentence">
                This app is made so that tabletop gamers can find new events and host new ones.  If you want to discover
                new games, show people a game you enioy, or find a new group this could be a great website for you.
                </p>
            </div>
            <div className="about__section">
                <h2 className="about__header">
                    How does it work?
                </h2>
                <p className="about__sentence">
                A host will go to the create an event page where this individual will create an event with details
                about the event such as the game system, description of what you will be doing, and how to join.
                </p>
                <p className="about__sentence">
                From here, on the events page the event will be listed in order of when it occurs. The events happening in 
                the more immediate future will be displayed first.
                </p>
                <p className="about__sentence">
                Click into the respective event to learn more! And if you want to, go ahead and join. 
                </p>
                <p className="about__sentence">
                *This site does not actually run events, it is a way to help find ones that you like.*
                </p>
            </div>
            <div className="about__section">
                <h2 className="about__header">Currently this site is in early stages of development</h2>
                <p className="about__sentence">To contact the admin for this site, you can do send an email to dbmcgrouther@gmail.com or contact on discord Skynet #9572. Feel free to ask questions or send feedback. In the event of an issue, please send me that as well so I can make improvements.</p>
            </div>
        </div>
    )
}

export default About;