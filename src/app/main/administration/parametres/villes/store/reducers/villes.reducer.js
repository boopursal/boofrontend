import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedVillesIds: [],
    routeParams       : {},
    villesDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    executed : false,
    message  : null,
    variant :'',
    pays : null
};

const villesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PAYS:
        {
            return {
                ...state,
                executed : false,
                message  : null,
                pays   : _.keyBy(action.payload, 'id')
            };
        }
        case Actions.GET_VILLES:
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
        
        case Actions.OPEN_NEW_VILLES_DIALOG:
        {
            return {
                ...state,
                villesDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_VILLES_DIALOG:
        {
            return {
                ...state,
                villesDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_VILLES_DIALOG:
        {
            return {
                ...state,
                villesDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_VILLES_DIALOG:
        {
            return {
                ...state,
                villesDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.ADD_VILLE:
        {
            return {
                ...state,
                executed : true,
                message  : "VILLE ajouté avec succès",
                variant : 'success'
                
            };
        }
        case Actions.UPDATE_VILLE:
        {
            return {
                ...state,
                executed : true,
                message  : "VILLE modifié avec succès",
                variant : 'success'
                
            };
        }
        case Actions.REMOVE_VILLE:
        {
            return {
                ...state,
                executed : true,
                message  : "VILLE supprimé avec succès",
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

export default villesReducer;
