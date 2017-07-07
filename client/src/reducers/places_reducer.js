import {GET_PLACES, FORGET_PLACES} from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case GET_PLACES:
            return [...action.payload];
        case FORGET_PLACES:
            return [];
    }

    return state;
}