import * as Actions from '../actions';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    searchText: '',
    produits: [],
    fournisseurs: [],
    activites: [],
    loading: false,
    loadingFournisseurs: false,
    loadingActivites: false,
    loadingProduits: false,
    opened: false

};

const globalSearchReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...state,
                    produits: [],
                    fournisseurs: [],
                    activites: [],
                };
            }
        case Actions.GS_REQUEST_PRODUITS:
            {
                return {
                    ...state,
                    loadingProduits: true

                };
            }
        case Actions.GS_REQUEST_FOURNISSEUR:
            {
                return {
                    ...state,
                    loadingFournisseurs: true

                };
            }
        case Actions.GS_REQUEST_ACTIVITES:
            {
                return {
                    ...state,
                    loadingActivites: true

                };
            }
        case Actions.GS_GET_PRODUITS:
            {
                return {
                    ...state,
                    loadingProduits: false,
                    produits: action.payload,
                };
            }
        case Actions.GS_GET_ACTIVITES:
            {
                return {
                    ...state,
                    loadingActivites: false,
                    activites: action.payload,
                };
            }
        case Actions.GS_GET_FOURNISSEUR:
            {
                return {
                    ...state,
                    loadingFournisseurs: false,
                    fournisseurs: action.payload,
                };
            }
        case Actions.GS_SET_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }
        case Actions.GS_OPEN:
            {
                return {
                    ...state,
                    opened: true,
                };
            }
        case Actions.GS_CLOSE:
            {
                return {
                    ...state,
                    opened: false,
                };
            }
        default:
            {
                return state;
            }
    }
};

export default globalSearchReducer;
