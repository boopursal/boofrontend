import * as Actions from '../actions';

const initialState = {
    data: null,
    error: null,
    loading: false,
    success: false,
    imageReqInProgress: false,
    deleteReqInProgress: false,
    image: null,
    image_deleted: null,
    sousSecteurs: [],
    secteurs: [],
    categories: [],
    fiche: null,
    ficheReqInProgress: false,


};

const produitReducer = function (state = initialState, action) {
    switch (action.type) {

        case Actions.REQUEST_SECTEUR:
        case Actions.REQUEST_PRODUIT:
        case Actions.REQUEST_SAVE:
            {
                return {
                    ...state,
                    loading: true,

                }
            }
        case Actions.REQUEST_SOUS_SECTEUR:
            {
                return {
                    ...state,
                    sousSecteurs: [],
                    categories: []

                }
            }
        case Actions.REQUEST_CATEGORIE:
            {
                return {
                    ...state,
                    categories: []

                }
            }

        case Actions.UPLOAD_REQUEST:
            {
                return {
                    ...state,
                    imageReqInProgress: true

                };
            }
        case Actions.REQUEST_DELETE:
            {
                return {
                    ...state,
                    deleteReqInProgress: true

                };
            }
        case Actions.UPLOAD_ATTACHEMENT:
            {
                return {
                    ...state,
                    image: action.payload,
                    imageReqInProgress: false

                };
            }
        case Actions.DELETE_SUCCESS:
            {
                return {
                    ...state,
                    deleteReqInProgress: false,
                    image_deleted: action.id,

                };
            }
        case Actions.UPLOAD_ERROR:
            {
                return {
                    ...state,
                    imageReqInProgress: false

                };
            }
        case Actions.UPLOAD_FICHE_REQUEST:
            {
                return {
                    ...state,
                    ficheReqInProgress: true

                };
            }
        case Actions.UPLOAD_FICHE_ATTACHEMENT:
            {
                return {
                    ...state,
                    fiche: action.payload,
                    ficheReqInProgress: false

                };
            }
        case Actions.UPLOAD_FICHE_ERROR:
            {
                return {
                    ...state,
                    ficheReqInProgress: false

                };
            }
        case Actions.GET_SECTEUR:
            {
                return {
                    ...state,
                    secteurs: action.payload['hydra:member'],


                };
            }
        case Actions.GET_SOUS_SECTEUR:
            {
                return {
                    ...state,
                    sousSecteurs: action.payload['hydra:member'],


                };
            }
        case Actions.GET_CATEGORIE:
            {
                return {
                    ...state,
                    categories: action.payload['hydra:member'],


                };
            }
        case Actions.GET_PRODUIT:
            {
                return {
                    ...state,
                    data: action.payload,
                    loading: false,

                };
            }
        case Actions.SAVE_PRODUIT:
            {
                return {
                    ...state,
                    loading: false,
                    success: true
                };
            }
        case Actions.CLEAN_ERROR:
            {
                return {
                    ...state,
                    error: null,
                };
            }
        case Actions.CLEAN_IMAGE:
            {
                return {
                    ...state,
                    image: null,
                    fiche: null
                };
            }
        case Actions.CLEAN_DELETE_IMAGE:
            {
                return {
                    ...state,
                    image_deleted: null,
                };
            }
        case Actions.SAVE_ERROR:
            {
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                    success: false

                };
            }
        default:
            {
                return state;
            }
    }
};

export default produitReducer;