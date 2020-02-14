import * as Actions from '../actions';

const initialState = {
    data: [],
    produitsSimilaires: [],
    loadingPS: false,
    loading: false,
};

const detailProduitReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,
                };
            }
        case Actions.REQUEST_PRODUIT:
            {
                return {
                    ...state,
                    loading: true

                };
            }
        case Actions.REQUEST_PRODUITS_SIMILAIRES:
            {
                return {
                    ...state,
                    loadingPS: true

                };
            }
        case Actions.GET_PRODUIT:
            {
                return {
                    ...state,
                    loading: false,
                    data: action.payload

                };
            }
        case Actions.GET_PRODUITS_SIMILAIRES:
            {
                return {
                    ...state,
                    loadingPS: false,
                    produitsSimilaires: action.payload

                };
            }
        default:
            {
                return state;
            }
    }
};

export default detailProduitReducer;
