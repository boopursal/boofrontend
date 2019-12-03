import * as Actions from '../actions';

const initialState = {
    data: null,
    error: null,
    loading: false,
    attachement: null,
    visit: null
};

const demandeReducer = function (state = initialState, action) {
    switch (action.type) {

        case Actions.REQUEST_DEMANDE:
        case Actions.REQUEST_VISITE_DEMANDE:
            {
                return {
                    ...state,
                    loading: true,

                }
            }
        case Actions.CLEAN_UP:
            {
                return {
                    ...state,
                    data: null,
                    visit: null,
                    loading: false,
                    attachement: null,
                    error: null,


                };
            }
        case Actions.GET_DEMANDE:
            {
                return {
                    ...state,
                    data: action.payload,
                    loading: false,

                };
            }
        case Actions.GET_VISITE_DEMANDE:
            {
                return {
                    ...state,
                    visit: action.payload,
                    loading: false,

                };
            }

        case Actions.SAVE_ERROR:
            {
                return {
                    ...state,
                    error: action.payload,
                    loading: false,

                };
            }
        default:
            {
                return state;
            }
    }
};

export default demandeReducer;
