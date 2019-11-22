import * as Actions from '../actions';
import FuseUtils from '@fuse/FuseUtils';
import _ from '@lodash';

const initialState = {
    data      : [],
    pageCount : null,
    loading : false,
    searchText: '',
    parametres:{
        page : 1,
        description :'',
        filter: {
            id : 'statut',
            direction : 'asc'
        }
    },
    demandesDialog     : {
        props: {
            open: false
        }
    }
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
                data   : action.payload['hydra:member'],
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
        case Actions.SET_PARAMETRES_DATA:
        {
            return {
                ...state,
                parametres:{
                    page : action.parametres.page,
                    description :action.parametres.description,
                    filter: {
                        id : action.parametres.filter.id,
                        direction : action.parametres.filter.direction
                    }
                }
                
            };
        }
        default:
        {
            return state;
        }
    }
};

export default demandesReducer;
