import * as Actions from '../actions';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedPersonnelsIds: [],
    routeParams       : {},
    personnelsDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    avatar :null,
    imageReqInProgress:false
};

const personnelsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PERSONNELS:
        {
            return {
                ...state,
                entities   : action.payload
            };
        }
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        
        case Actions.OPEN_NEW_PERSONNELS_DIALOG:
        {
            return {
                ...state,
                personnelsDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_PERSONNELS_DIALOG:
        {
            return {
                ...state,
                personnelsDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_PERSONNELS_DIALOG:
        {
            return {
                ...state,
                personnelsDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_PERSONNELS_DIALOG:
        {
            return {
                ...state,
                personnelsDialog: {
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

export default personnelsReducer;
