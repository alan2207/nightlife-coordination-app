import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class Header extends React.Component {

    renderLinks() {
        if(this.props.authenticated) {
            return [
            <li key={3}><Link to="/signout">Sign Out</Link></li>
            ]
            } else {
            return [
            <li key={1}><Link to="/signup">Sign Up</Link></li>,
            <li key={2}><Link to="/signin">Sign In</Link> </li>
            ]
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper red darken-3">
                <Link to="/" className="brand-logo left">Nightlife</Link >
                <ul id="nav-mobile" className="right">
                    <li key={4}><Link to="/about">About</Link></li>
                    {this.renderLinks()}
                </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Header);