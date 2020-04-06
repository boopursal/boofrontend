import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    pays: null,
    secteurs: null,
    loading: false,
    requestFournisseur: false,
    villes: null,
    error: null,
    data: null,
    acheteurReqInProgress: false,
    avatar: null,
    acheteur_deleted: null,
};

const acheteurReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP_ACHETEUR:
            {
                return {
                    ...state,
                    pays: null,
                    secteurs: null,
                    loading: false,
                    requestFournisseur: false,
                    villes: null,
                    error: null,
                    data: null,
                    acheteurReqInProgress: false,
                    avatar: null,
                    acheteur_deleted: null,
                }
            }
        case Actions.REQUEST_UPDATE_ACHETEUR:
        case Actions.REQUEST_PAYS:
            {
                return {
                    ...state,
                    loading: true,
                };
            }
        case Actions.REQUEST_ACHETEUR:
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
        case Actions.GET_ACHETEUR:
            {
                return {
                    ...state,
                    data: action.payload,
                    requestFournisseur: false,
                    error: null


                };
            }
        case Actions.GET_SECTEURS:
            {
                return {
                    ...state,
                    secteurs: action.payload
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
        case Actions.UPDATE_ACHETEUR:
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
                    acheteurReqInProgress: true

                };
            }

        case Actions.UPLOAD_AVATAR:
            {
                return {
                    ...state,
                    avatar: action.payload,
                    acheteurReqInProgress: false

                };
            }
        case Actions.UPLOAD_ERROR:
            {
                return {
                    ...state,
                    acheteurReqInProgress: false

                };
            }
        default:
            {
                return state;
            }
    }
};

export default acheteurReducer;
