import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    data: null,
    error: null,
    sousSecteurs: null,
    loading: false,
    success: false,
};

const demandeReducer = function (state = initialState, action) {
    switch (action.type) {

        case Actions.REQUEST_SOUS_SECTEUR:
        case Actions.REQUEST_DEMANDE:
        case Actions.REQUEST_SAVE:
            {
                return {
                    ...state,
                    loading: true
                }
            }
        case Actions.GET_SOUS_SECTEUR:
            {
                return {
                    ...state,
                    sousSecteurs: _.keyBy(action.payload, 'id'),
                    loading: false

                };
            }
        case Actions.GET_DEMANDE:
            {
                return {
                    ...state,
                    data: action.payload,
                    loading: false
                };
            }
        case Actions.SAVE_DEMANDE:
            {
                return {
                    ...state,
                    data: action.payload,
                    loading: false,
                    success : true
                };
            }
        case Actions.SAVE_ERROR:
            {
                return {
                    ...state,
                    error  : action.payload,
                    loading: false,
                    success : false

                };
            }
        default:
            {
                return state;
            }
    }
};

export default demandeReducer;
