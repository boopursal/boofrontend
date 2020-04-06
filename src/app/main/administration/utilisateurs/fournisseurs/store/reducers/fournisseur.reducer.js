import * as Actions from '../actions';
import _ from '@lodash';

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
};

const fournisseurReducer = function (state = initialState, action) {
    switch (action.type) {
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
                    error: null


                };
            }
        case Actions.GET_SOUS_SECTEUR:
            {
                return {
                    ...state,
                    sousSecteurs: action.payload
                };
            }
        case Actions.GET_PAYS:
            {
                return {
                    ...state,
                    pays: _.keyBy(action.payload, 'id'),
                    loading: false

                };
            }

        case Actions.GET_VILLES:
            {
                return {
                    ...state,
                    villes: _.keyBy(action.payload, 'id'),
                };
            }
        case Actions.UPDATE_FOURNISSEUR:
            {
                return {
                    ...state,
                    loading: false,
                    data : action.payload,
                    error: null

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
