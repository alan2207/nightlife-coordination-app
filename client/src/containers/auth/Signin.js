import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
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

class Signin extends React.Component {
    constructor(props) {
        super(props);
    }

    submit({email, password}) {
        this.props.signinUser({email, password}, this);
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="row">
                <div className="red lighten-4 red-text darken-4-text  col s6 offset-s3 center-align">
                    <h3>{this.props.errorMessage}</h3>
                </div>
                </div>
            )
        }
    }

    componentDidMount() {
        this.props.clearErrorMessages();
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <div className="container">
            <h1 className="center-align">Sign In</h1>
            <form className="col s12" onSubmit={handleSubmit(this.submit.bind(this))}>
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
                
                {this.renderAlert()}

                <div className="row">
                    <div className="col s6 offset-s3 center-align">
                        <button type="submit" className="blue-grey darken-3 btn-large">Sign up</button>
                    </div>
                </div>

            </form>

            <div className="row">
                <div className="col s6 offset-s3 center-align">
                    <Link to="/signup">If you dont have account, feel free to create one!</Link>
                </div>
            </div>

            </div>
        )
    }
    
}

function validate(values) {
    const errors = {};

    if(!values.email) {
        errors.email = 'Please, enter an email!';
    }

    if(!values.password) {
        errors.password = 'Please, enter a password!';
    }

    return errors;
}


function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}


export default connect(mapStateToProps, actions)(reduxForm({
    form: 'signin',
    validate
})(Signin));