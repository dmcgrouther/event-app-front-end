import React, { Component } from 'react';
import './AccountDeleted.css'

class AccountDeleted extends Component {
    render() {
        return(
            <>
                <div className="delete-account-page-area">

                
                    {/* <h1>Sorry to see you go!</h1>

                    <h2>We sent you here to let you know your account was deleted.</h2> */}

                    <h3>Sorry you want to remove your account!</h3>
                    <h4>Currently removing an account is under a development.</h4>
                    <p>The site admin can remove your account. Please remove yourself from all events you are attending and hosting.</p>
                    <p>Please also logout.</p>
                    <br />
                    <p>Once this is done, please send the admin an email at dbmcgrouther@gmail.com. Please include your user info page link.</p>
                </div>
            </>
        )
    }
}

export default AccountDeleted;