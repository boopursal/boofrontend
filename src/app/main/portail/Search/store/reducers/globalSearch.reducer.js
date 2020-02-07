import * as Actions from '../actions';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    searchText: '',
    produits: [],
    fournisseurs: [],
    activites: [],
    loading: false,
    opened: false

};

const globalSearchReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,
                };
            }
        case Actions.GS_REQUEST_PRODUITS:
            {
                return {
                    ...state,
                    loading: true

                };
            }
        case Actions.GS_GET_PRODUITS:
            {
                return {
                    ...state,
                    loading: false,
                    produits: action.payload,
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
                    opened: true
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
