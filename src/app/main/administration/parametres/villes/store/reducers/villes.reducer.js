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
    pays : null
};

const villesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PAYS:
        {
            return {
                ...state,
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
        default:
        {
            return state;
        }
    }
};

export default villesReducer;
