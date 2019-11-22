import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedSecteursIds: [],
   // fournisseurs: [],
    routeParams       : {},
    blackListesDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },

};

const blackListesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_BLACK_LISTES:
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
        
        case Actions.OPEN_NEW_BLACK_LISTES_DIALOG:
        {
            return {
                ...state,
                blackListesDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_BLACK_LISTES_DIALOG:
        {
            return {
                ...state,
                blackListesDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_BLACK_LISTES_DIALOG:
        {
            return {
                ...state,
                blackListesDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_BLACK_LISTES_DIALOG:
        {
            return {
                ...state,
                blackListesDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        default:
        {
            return state;
        }
    }
};

export default blackListesReducer;
