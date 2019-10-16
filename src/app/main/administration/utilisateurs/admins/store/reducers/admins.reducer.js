import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedAdminsIds: [],
    routeParams       : {},
    adminsDialog     : {
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

const adminsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ADMINS:
        {
            return {
                ...state,
                executed : false,
                message  : null,
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
        
        case Actions.OPEN_NEW_ADMINS_DIALOG:
        {
            return {
                ...state,
                adminsDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_ADMINS_DIALOG:
        {
            return {
                ...state,
                adminsDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_ADMINS_DIALOG:
        {
            return {
                ...state,
                adminsDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_ADMINS_DIALOG:
        {
            return {
                ...state,
                adminsDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.ADD_ADMIN:
        {
            return {
                ...state,
                executed : true,
                message  : "Admin ajouté avec succès",
                variant : 'success'
                
            };
        }
        case Actions.UPDATE_ADMIN:
        {
            return {
                ...state,
                executed : true,
                message  : "Admin modifié avec succès",
                variant : 'success'
                
            };
        }
        case Actions.REMOVE_ADMIN:
        {
            return {
                ...state,
                executed : true,
                message  : "Admin supprimé avec succès",
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

export default adminsReducer;
