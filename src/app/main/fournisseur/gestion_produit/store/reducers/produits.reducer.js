import * as Actions from '../actions';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    data: [],
    freeProduits: [],
    pageCount: null,
    loading: false,
    loadingFree: false,
    searchText: '',
    abonnement: null,
    parametres: {
        page: 1,
        search: [],
        description: '',
        filter: {
            id: 'created',
            direction: 'desc'
        }
    },
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
                    loading: true

                };
            }
        case Actions.GET_FOURNISSEUR:
            {
                return {
                    ...state,
                    abonnement: action.payload,
                };
            }
        case Actions.GET_PRODUITS:
            {
                return {
                    ...state,
                    data: action.payload['hydra:member'],
                    pageCount: FuseUtils.hydraPageCount(action.payload),
                    loading: false
                };
            }
        case Actions.REQUEST_FREE_PRODUITS:
            {
                return {
                    ...state,
                    loadingFree: true

                };
            }

        case Actions.GET_FREE_PRODUITS:
            {
                return {
                    ...state,
                    freeProduits: action.payload['hydra:member'],
                    loadingFree : false
                };
            }
        case Actions.SET_PRODUITS_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }
        case Actions.SET_PARAMETRES_DATA:
            {
                return {
                    ...state,
                    parametres: {
                        page: action.parametres.page,
                        description: action.parametres.description,
                        search: action.parametres.search,
                        filter: {
                            id: action.parametres.filter.id,
                            direction: action.parametres.filter.direction
                        }
                    }

                };
            }
        default:
            {
                return state;
            }
    }
};

export default produitsReducer;
