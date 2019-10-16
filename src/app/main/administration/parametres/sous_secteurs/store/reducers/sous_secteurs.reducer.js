import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedSousSecteursIds: [],
    routeParams       : {},
    sous_secteursDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    executed : false,
    message  : null,
    variant :'',
    secteur : null
};

const sous_secteursReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_SECTEURS:
        {
            return {
                ...state,
                executed : false,
                message  : null,
                secteur   : _.keyBy(action.payload, 'id')
            };
        }
        case Actions.GET_SOUS_SECTEURS:
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
        
        case Actions.OPEN_NEW_SOUS_SECTEURS_DIALOG:
        {
            return {
                ...state,
                sous_secteursDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_SOUS_SECTEURS_DIALOG:
        {
            return {
                ...state,
                sous_secteursDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_SOUS_SECTEURS_DIALOG:
        {
            return {
                ...state,
                sous_secteursDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_SOUS_SECTEURS_DIALOG:
        {
            return {
                ...state,
                sous_secteursDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.ADD_SOUS_SECTEUR:
        {
            return {
                ...state,
                executed : true,
                message  : "SOUS_SECTEUR ajouté avec succès",
                variant : 'success'
                
            };
        }
        case Actions.UPDATE_SOUS_SECTEUR:
        {
            return {
                ...state,
                executed : true,
                message  : "SOUS_SECTEUR modifié avec succès",
                variant : 'success'
                
            };
        }
        case Actions.REMOVE_SOUS_SECTEUR:
        {
            return {
                ...state,
                executed : true,
                message  : "SOUS_SECTEUR supprimé avec succès",
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

export default sous_secteursReducer;
