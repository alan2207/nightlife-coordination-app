import React from 'react';
import axios from 'axios';

import Guests from './Guests';


// renders each place
class Place extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: this.props.guests
        }
    }


    // updates guests list when the button is clicked
    updateGuests() {
        const ROOT_URL = 'https://nightlife-coordination-app.glitch.me';

        Materialize.toast('Status Updated!', 1000);

        axios.put(`${ROOT_URL}/updateguests`, {
            username: localStorage.getItem('username'),
            placeID: this.props.placeID
        })
            .then((response => {
                this.setState({guests: response.data.guests});
            }))
    }

    // renders buttons accordingly
    renderButtonProperly(){
        var username = localStorage.getItem('username');
        if(username) {
            if(this.state.guests && this.state.guests.indexOf(username) === -1) {
                return <button onClick={this.updateGuests.bind(this)} className="waves-effect waves-light btn right">Going</button>
            } else {
                return <button onClick={this.updateGuests.bind(this)} className="waves-effect waves-light red btn right">Cancel</button>
            }
        } else {
            return <button className=" btn disabled right">Going</button>
        }
    }


    render() {
        return (
            <div className="card horizontal place">
                    <div className="card-image">
                        <img className="" src={this.props.image} />
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                        <h4>{this.props.name}</h4>
                        <p>Phone: {this.props.phone}</p>
                        <p>Address: {this.props.address}</p>
                        <p>Guests:</p>
                        <hr/>
                        <Guests guests={this.state.guests} />
                        <p className="right red-text">Rating: <strong>{this.props.rating}/5</strong></p>
                        </div>
                        <div className="card-action">
                        <a  href={this.props.link} target="_blank">More Info</a>
                        {this.renderButtonProperly()}
                        </div>
                    </div>
                </div>
        )
    }
}

export default Place;