import React, { Component } from 'react';
// import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

class DateAndTimePick extends Component {
    render() {
        return (
            <form onSubmit={ this.props.handleDatePickerSubmit }>
                <div className="form-group">
                    <DatePicker 
                        selected={ this.props.eventDate }
                        onChange={ this.props.handleDatePickerChange }
                        showTimeSelect
                        timeFormat="hh:mm aa"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    {/* <button className="btn btn-primary">Show Date</button> */}
                </div>
            </form>
        )
    }
}

export default DateAndTimePick;