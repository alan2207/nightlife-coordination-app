import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../../actions';

const renderInput = field => {
    return (
        <div className="input-field col s6 offset-s3">
            <input {...field.input} type={field.type} className="validate"/>
            {field.meta.touched &&
            field.meta.error &&
            <span className="red-text">{field.meta.error}</span>}
           <label htmlFor={field.id}>{field.label}</label>
            
        </div>
    );
};

class Signup extends React.Component {
    constructor(props) {
        super(props);
    }

    submit(values) {
        this.props.signupUser(values, this);
    }

    renderAlert() {
         if(this.props.errorMessage) {
            return (
                <div className="row">
                <div className="red lighten-4 red-text darken-4-text  col s6 offset-s3 center-align">
                    <h3>{this.props.errorMessage}</h3>
                </div>
                </div>
            );
        }
    }

    componentDidMount() {
        this.props.clearErrorMessages();
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <div className="container">
            <h1 className="center-align">Sign Up</h1>
            <form className="col s12" onSubmit={handleSubmit(this.submit.bind(this))}>
                
                <div className="row">
                    <Field 
                        name="username"
                        id="username"
                        label="Username"
                        component={renderInput}
                        type="text" />
                </div>

                <div className="row">
                    <Field 
                        name="email"
                        id="email"
                        label="Email"
                        component={renderInput}
                        type="email" />
                </div>

                <div className="row">
                    <Field 
                        name="password"
                        id="password"
                        label="Password"
                        component={renderInput}
                        type="password" />
                </div>

                <div className="row">
                    <Field 
                        name="passwordConfirm"
                        id="passwordConfirm"
                        label="Confirm Password"
                        component={renderInput}
                        type="password" />
                </div>

                {this.renderAlert()}

                <div className="row">
                    <div className="col s6 offset-s3 center-align">
                        <button type="submit" className="blue-grey darken-3 btn-large">Sign up</button>
                    </div>
                </div>

            </form>

            <div className="row">
                <div className="col s6 offset-s3 center-align">
                    <Link to="/signin">Already have an account? Go ahead and sign in!</Link>
                </div>
            </div>

            </div>
        )
    }
}



function validate(values) {
    const errors = {};

    if(!values.username) {
        errors.username = 'Please, enter a username!'
    }

    if(!values.email) {
        errors.email = 'Please, enter an email!';
    }

    if(!values.password) {
        errors.password = 'Please, enter a password!';
    }

    if(!values.passwordConfirm) {
        errors.passwordConfirm = 'Password must be confirmed!';
    }

    if(values.password !== values.passwordConfirm) {
        errors.password = 'Password must match!';
    }
    
    return errors;
}


function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
}


export default connect(mapStateToProps, actions)(reduxForm({
    form: 'signup',
    validate
}, mapStateToProps, actions)(Signup));