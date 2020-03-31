import * as Actions from '../actions';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    entities: [],
    loading: false,
    searchText: '',
};

const secteursReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_SECTEURS:
            {
                return {
                    ...state,
                    loading: true

                };
            }
        case Actions.GET_SECTEURS:
            {
                return {
                    ...state,
                    entities: action.payload['hydra:member'],
                    loading: false
                };
            }
        case Actions.SET_SECTEURS_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }
       
        default:
            {
                return state;
            }
    }
};

export default secteursReducer;
