import React from 'react';


// renders the guests list
class Guests extends React.Component {

    constructor(props) {
        super(props);
    }

    renderGuests() {
        return this.props.guests.length ? 
            this.props.guests.map(guest => <p key={guest}>{guest}</p>) :
            <p>No guests yet</p>
    }

    render() {
        return (
            <div className="guests">
                {this.renderGuests()}
            </div>
        )
        
    }
}

export default Guests;