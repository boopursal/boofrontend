import * as Actions from '../actions';

const initialState = {
    data: [],
    loading: false,
    loadingSecteurs: false,
    secteurs: [],
    pays: [],

};

const produitsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,
                };
            }

        case Actions.REQUEST_PRODUITS:
            {
                return {
                    ...state,
                    loading: true,
                };
            }
        case Actions.REQUEST_SECTEURS_COUNT:
            {
                return {
                    ...state,
                    loadingSecteurs: true,
                };
            }
        case Actions.GET_PRODUITS:
            {
                return {
                    ...state,
                    loading: false,
                    data: action.payload['hydra:member']

                };
            }
        case Actions.GET_SECTEURS_COUNT:
            {
                return {
                    ...state,
                    loadingSecteurs: false,
                    secteurs: action.payload

                };
            }
        case Actions.GET_PAYS_COUNT:
            {
                return {
                    ...state,
                    pays: action.payload

                };
            }

        default:
            {
                return state;
            }
    }
};

export default produitsReducer;
