import * as Actions from '../actions';
import { FuseUtils } from '@fuse';

const initialState = {
    data: [],
    produits: [],
    produitsApercu: [],
    loading: false,
    loadingProduits: false,
    loadingProduitsApercu: false,
    loadingsPhone: false,
    showPhone: false,
    phone: null,
    totalItems: null,
    pageCount: null,
    parametres: {
        itemsPerPage: 10,
        page: 1,
        filter: {
            id: 'created-desc',
        }
    },
};

const fournisseurReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,
                };
            }
        case Actions.REQUEST_FOURNISSEUR:
            {
                return {
                    ...state,
                    loading: true,
                    showPhone: false,
                    phone: null,


                };
            }
        case Actions.REQUEST_FOURNISSEUR_PRODUITS:
            {
                return {
                    ...state,
                    loadingProduits: true,


                };
            }
        case Actions.REQUEST_FOURNISSEUR_PRODUITS_APERCU:
            {
                return {
                    ...state,
                    loadingProduitsApercu: true,


                };
            }
        case Actions.REQUEST_UPDATE_FOURNISSEUR:
            {
                return {
                    ...state,
                    loadingsPhone: true,
                    showPhone: false,

                };
            }

        case Actions.GET_FOURNISSEUR:
            {
                return {
                    ...state,
                    loading: false,
                    data: action.payload

                };
            }
        case Actions.GET_FOURNISSEUR_PRODUITS_APERCU:
            {
                return {
                    ...state,
                    loadingProduitsApercu: false,
                    produitsApercu: action.payload

                };
            }
        case Actions.GET_FOURNISSEUR_PRODUITS:
            {
                return {
                    ...state,
                    loadingProduits: false,
                    produits: action.payload['hydra:member'],
                    pageCount: FuseUtils.hydraPageCount(action.payload),
                    totalItems: action.payload['hydra:totalItems'],

                };
            }
        case Actions.GET_UPDATE_FOURNISSEUR:
            {
                return {
                    ...state,
                    loadingsPhone: false,
                    phone: action.payload,
                    showPhone: true

                };
            }
        case Actions.SET_PARAMETRES_DATA:
            {
                return {
                    ...state,
                    parametres: {
                        itemsPerPage: action.parametres.itemsPerPage,
                        page: action.parametres.page,
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

export default fournisseurReducer;
