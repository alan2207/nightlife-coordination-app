import axios from 'axios';
import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, CLEAR_ERROR_MESSAGES, GET_PLACES, GET_POSITION, FORGET_PLACES} from './types';

// set this to url of the backend server
const ROOT_URL = 'https://nightlife-coordination-app.glitch.me';


//=======================================
// USERS ACTIONS
//=======================================

// handling logging in
export function signinUser({email, password}, context) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signin`, {email, password})
        .then(response => {
            
            dispatch({type: AUTH_USER});

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);

            context.props.history.push('/');
            Materialize.toast('Welcome back!', 4000);
            // get users last location:
            axios.get(`${ROOT_URL}/getlocation?username=${response.data.username}`)
                .then(response => {
                    Materialize.toast('Getting users last location!', 2000);
                    dispatch({type: GET_PLACES, payload: response.data.businesses});
                    dispatch({type: GET_POSITION, payload: response.data.region.center});
                })
                .catch(err => console.log('failed getting the location'))
        })
        .catch(() => {
            dispatch(authError('Signing in failed!!!'));
        })
    }
}

// handling signing up - creating a new user
export function signupUser({username, email, password}, context) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signup`, {username, email, password})
        .then(response => {
            
            dispatch({type: AUTH_USER});
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            context.props.history.push('/');
            Materialize.toast('Welcome to Nightlife Coordination!', 3000);
        })
        .catch(response => {
            dispatch(authError(response.response.data.error))
        })
        
    }
}


// handling errors from the server
export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}


// handling logging out
export function signoutUser(context) {
    return (dispatch) => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        dispatch({type: UNAUTH_USER});
        dispatch({type: FORGET_PLACES});
        context.props.history.push('/');
        Materialize.toast('You have successfully signed out!', 2000);
    }
}

export function clearErrorMessages() {
    return (dispatch) => {
        dispatch({type: CLEAR_ERROR_MESSAGES});
    };
}


//=============================================
// PLACES ACTIONS
//=============================================

// fetching places
export function getPlaces(location) {
    Materialize.toast('Searching for bars.' , 2000);
    const usernameQuery = `&username=${localStorage.getItem('username')}` || '';
    return (dispatch) => {
        axios.get(`${ROOT_URL}/getplaces?location=${location}${usernameQuery}`)
            .then((response) => {
                dispatch({type: GET_PLACES, payload: response.data.businesses});
                dispatch({type: GET_POSITION, payload: response.data.region.center});
            })
            .catch(err => Materialize.toast('Could not find any bars.', 4000))
    }
}



