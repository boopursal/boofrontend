import * as Actions from '../actions';

const initialState = {
    entities: [], // Initialisé à un tableau vide pour éviter des erreurs lors de l'utilisation des méthodes de tableau
    searchText: '',
    selectedSuggestionsIds: [],
    routeParams: {},
    suggestionsDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },
    avatar: null,
    imageReqInProgress: false,
    error: null, // Ajout d'un état pour les erreurs
    loading: false // Ajout d'un état pour le chargement
};

const suggestionsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_SUGGESTIONS:
            return {
                ...state,
                entities: action.payload // Assurez-vous que payload contient les bonnes données
            };
        case Actions.SAVE_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case Actions.SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
            };
        case Actions.OPEN_NEW_SUGGESTIONS_DIALOG:
            return {
                ...state,
                suggestionsDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        case Actions.CLOSE_NEW_SUGGESTIONS_DIALOG:
            return {
                ...state,
                suggestionsDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        case Actions.OPEN_EDIT_SUGGESTIONS_DIALOG:
            return {
                ...state,
                suggestionsDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        case Actions.CLOSE_EDIT_SUGGESTIONS_DIALOG:
            return {
                ...state,
                suggestionsDialog: {
                    type: 'edit',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        case Actions.UPLOAD_REQUEST:
            return {
                ...state,
                imageReqInProgress: true
            };
        case Actions.UPLOAD_IMAGE:
            return {
                ...state,
                avatar: action.payload,
                imageReqInProgress: false
            };
        case Actions.UPLOAD_ERROR:
            return {
                ...state,
                imageReqInProgress: false
            };
        case Actions.REQUEST_SAVE:
            return {
                ...state,
                loading: true
            };
        case Actions.SAVE_DATA:
            return {
                ...state,
                loading: false
            };
        case Actions.ADD_SUGGESTION:
            return {
                ...state,
                entities: [...state.entities, action.payload]
            };
        case Actions.REMOVE_SUGGESTION:
            return {
                ...state,
                entities: state.entities.filter(item => item.id !== action.payload.id)
            };
        case Actions.UPDATE_SUGGESTION:
            return {
                ...state,
                entities: state.entities.map(item =>
                    item.id === action.payload.id ? action.payload : item
                )
            };
        default:
            return state;
    }
};

export default suggestionsReducer;
