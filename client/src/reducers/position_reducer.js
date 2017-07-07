import {GET_POSITION} from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case GET_POSITION:
            return action.payload;
    }
    return state;
}