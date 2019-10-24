import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedZonesIds: [],
    routeParams       : {},
    commercialsDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    avatar :null,
    villes : null,
    imageReqInProgress:false
};

const commercialsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_VILLES:
        {
            return {
                ...state,
                executed : false,
                message  : null,
                villes   : _.keyBy(action.payload, 'id')
            };
        }
        case Actions.GET_COMMERCIALS:
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
      
    
        case Actions.OPEN_EDIT_COMMERCIALS_DIALOG:
        {
            return {
                ...state,
                commercialsDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_COMMERCIALS_DIALOG:
        {
            return {
                ...state,
                commercialsDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
       
        case Actions.UPLOAD_REQUEST:
        {
            return {
                ...state,
                imageReqInProgress:true

            };
        }
        case Actions.UPLOAD_IMAGE:
        {
            return {
                ...state,
                avatar: action.payload,
                imageReqInProgress:false

            };
        }
        case Actions.UPLOAD_ERROR:
        {
            return {
                ...state,
                imageReqInProgress:false

            };
        }
        default:
        {
            return state;
        }
    }
};

export default commercialsReducer;
