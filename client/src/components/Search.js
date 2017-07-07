import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';


const renderInput = field => {
    return (
        <div className="input-field col s8 offset-s2">
            <input {...field.input} type={field.type} required className="validate"/>
           <label  htmlFor={field.id}>{field.label}</label>
        </div>
    );
};

// component for entering the location
class Search extends React.Component {

    submit({location}) {
        this.props.getPlaces(location);
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <div className="container">
            <form className="col s12" onSubmit={handleSubmit(this.submit.bind(this))}>
                <div className="row">
                    <Field 
                        name="location"
                        id="location"
                        label="Enter city name or address to search for bars"
                        component={renderInput}
                        type="text" />
                </div>


                <div className="row">
                    <div className="col s6 offset-s3 center-align">
                        <button type="submit" className="red darken-3 btn">Search</button>
                    </div>
                </div>
            </form>
        </div>
        )
    }
}


export default connect(null, actions)(reduxForm({
    form: 'search'
})(Search));