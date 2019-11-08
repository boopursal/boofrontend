import * as Actions from '../actions';
import FuseUtils from '@fuse/FuseUtils';
import _ from '@lodash';

const initialState = {
    data      : [],
    pageCount : null,
    loading : false,
    searchText: ''
};

const demandesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.REQUEST_DEMANDES:
        {
            return {
                ...state,
                loading : true
                
            };
        }
        case Actions.GET_DEMANDES:
        {
            return {
                ...state,
                data   : _.keyBy(action.payload['hydra:member'], 'id'),
                pageCount: FuseUtils.hydraPageCount(action.payload),
                loading : false
            };
        }
        case Actions.SET_DEMANDES_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        default:
        {
            return state;
        }
    }
};

export default demandesReducer;
