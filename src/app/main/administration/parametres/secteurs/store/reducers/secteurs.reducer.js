import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedSecteursIds: [],
    routeParams       : {},
    secteursDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    executed : false,
    message  : null,
    variant :''
};

const secteursReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_SECTEURS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id')
            };
        }
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        
        case Actions.OPEN_NEW_SECTEURS_DIALOG:
        {
            return {
                ...state,
                secteursDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_SECTEURS_DIALOG:
        {
            return {
                ...state,
                secteursDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_SECTEURS_DIALOG:
        {
            return {
                ...state,
                secteursDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_SECTEURS_DIALOG:
        {
            return {
                ...state,
                secteursDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.ADD_SECTEUR:
        {
            return {
                ...state,
                executed : true,
                message  : "Secteur ajouté avec succès",
                variant : 'success'
                
            };
        }
        case Actions.UPDATE_SECTEUR:
        {
            return {
                ...state,
                executed : true,
                message  : "Secteur modifié avec succès",
                variant : 'success'
                
            };
        }
        case Actions.REMOVE_SECTEUR:
        {
            return {
                ...state,
                executed : true,
                message  : "Secteur supprimé avec succès",
                variant : 'success'
                
            };
        }
        case Actions.SAVE_ERROR:
        {
            return {
                ...state,
                executed : false,
                message  : action.payload,
                variant : 'error'
                
            };
        }
        default:
        {
            return state;
        }
    }
};

export default secteursReducer;
