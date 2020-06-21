import * as Actions from '../actions';

const initialState = {
    pays: null,
    sousSecteurs: null,
    loading: false,
    requestFournisseur: false,
    villes: null,
    error: null,
    data: null,
    fournisseurReqInProgress: false,
    avatar: null,
    fournisseur_deleted: null,
    loadingAddVille: false,
    villeAdded: false,
    loadingAddSecteurs: false,
    loadingSecteurs: false,
    loadingProduit: false,
    loadingSousSecteurs: false,
    secteurs: [],
    sousSecteurs: [],
    produit: null

};

const fournisseurReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_ADD_PRODUIT:
            {
                return {
                    ...state,
                    loadingProduit: true,

                }
            }
        case Actions.SAVE_ADD_PRODUIT:
            {
                return {
                    ...state,
                    loadingProduit: false,
                    produit: action.payload

                }
            }
        case Actions.SAVE_ERROR_ADD_PRODUIT:
            {
                return {
                    ...state,
                    loadingProduit: false,

                }
            }
        case Actions.REQUEST_ADD_SECTEUR:
            {
                return {
                    ...state,
                    loadingAddSecteurs: true,

                }
            }
        case Actions.SAVE_ADD_SECTEUR:
        case Actions.SAVE_ERROR_ADD_SECTEUR:
            {
                return {
                    ...state,
                    loadingAddSecteurs: false,

                }
            }
        case Actions.REQUEST_SECTEUR:
            {
                return {
                    ...state,
                    loadingSecteurs: true,
                    sousSecteurs: [],

                }
            }
        case Actions.REQUEST_SOUS_SECTEUR:
            {
                return {
                    ...state,
                    loadingSousSecteurs: true,

                }
            }
        case Actions.GET_SECTEUR:
            {
                return {
                    ...state,
                    secteurs: action.payload['hydra:member'],
                    loadingSecteurs: false
                };
            }
        case Actions.GET_SOUS_SECTEUR:
            {
                return {
                    ...state,
                    sousSecteurs: action.payload['hydra:member'],
                    loadingSousSecteurs: false
                };
            }
        case Actions.REQUEST_ADD_VILLE:
            {
                return {
                    ...state,
                    loadingAddVille: true,
                }
            }
        case Actions.SAVE_ADD_VILLE:
            {
                return {
                    ...state,
                    loadingAddVille: false,
                    villeAdded: true,
                }
            }
        case Actions.SAVE_ERROR_ADD_VILLE:
            {
                return {
                    ...state,
                    loadingAddVille: false,
                }
            }
        case Actions.CLEAN_UP_VILLE:
            {
                return {
                    ...state,
                    villeAdded: false,
                }
            }
        case Actions.CLEAN_UP_FOURNISSEUR:
            {
                return {
                    ...state,
                    pays: null,
                    sousSecteurs: null,
                    loading: false,
                    requestFournisseur: false,
                    villes: null,
                    error: null,
                    data: null,
                    fournisseurReqInProgress: false,
                    avatar: null,
                    fournisseur_deleted: null,
                    loadingSecteurs: false,
                    secteurs: [],
                }
            }
        case Actions.REQUEST_UPDATE_FOURNISSEUR:
        case Actions.REQUEST_PAYS:
            {
                return {
                    ...state,
                    loading: true,
                };
            }
        case Actions.REQUEST_FOURNISSEUR:
            {
                return {
                    ...state,
                    requestFournisseur: true,
                };
            }
        case Actions.REQUEST_VILLES:
            {
                return {
                    ...state,
                    villes: null

                };
            }
        case Actions.GET_FOURNISSEUR:
            {
                return {
                    ...state,
                    data: action.payload,
                    requestFournisseur: false,
                    error: null,
                };
            }

        case Actions.GET_PAYS:
            {
                return {
                    ...state,
                    pays: action.payload,
                    loading: false

                };
            }

        case Actions.GET_VILLES:
            {
                return {
                    ...state,
                    villes: [...action.payload, { '@id': '/api/villes/113', name: 'Autre' }],
                };
            }
        case Actions.UPDATE_FOURNISSEUR:
            {
                return {
                    ...state,
                    loading: false,
                    data: action.payload,
                    error: null,

                };
            }
        case Actions.SAVE_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                    success: false,
                    redirect_success: ''
                };
            }
        case Actions.UPLOAD_REQUEST:
            {
                return {
                    ...state,
                    fournisseurReqInProgress: true

                };
            }

        case Actions.UPLOAD_AVATAR:
            {
                return {
                    ...state,
                    avatar: action.payload,
                    fournisseurReqInProgress: false

                };
            }
        case Actions.UPLOAD_ERROR:
            {
                return {
                    ...state,
                    fournisseurReqInProgress: false

                };
            }
        default:
            {
                return state;
            }
    }
};

export default fournisseurReducer;
