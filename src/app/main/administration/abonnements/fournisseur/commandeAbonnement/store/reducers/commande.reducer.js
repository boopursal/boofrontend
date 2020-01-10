import * as Actions from '../actions';

const initialState = {
    data: null,
    offres: null,
    sousSecteurs: null,
    error: null,
    loading: false,
    loadingSS: false,
    success: false,
    paiements: null,
};

const commandeReducer = function (state = initialState, action) {
    switch (action.type) {

        case Actions.REQUEST_COMMANDE:
        case Actions.REQUEST_OFFRES:
        case Actions.REQUEST_SAVE:
            {
                return {
                    ...state,
                    loading: true,
                    loadingSS: true,
                }
            }
        case Actions.GET_PAIEMENT:
            {
                return {
                    ...state,
                    paiements: action.payload
                };
            }
        case Actions.SAVE_COMMANDE:
            {
                return {
                    ...state,
                    loading: false,
                    success: true
                };
            }
        case Actions.CLEAN_UP:
            {
                return {
                    ...state,
                    data: null,
                    loading: false,
                    success: false,
                    error: null,
                    offres: null,
                    sousSecteurs: null,


                };
            }
        case Actions.GET_COMMANDE:
            {
                return {
                    ...state,
                    data: action.payload,
                    loading: false,

                };
            }
        case Actions.GET_SOUS_SECTEURS:
            {
                return {
                    ...state,
                    sousSecteurs: action.payload,
                    loadingSS: false,

                };
            }
        case Actions.GET_OFFRES:
            {
                return {
                    ...state,
                    offres: action.payload,
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

export default commandeReducer;
