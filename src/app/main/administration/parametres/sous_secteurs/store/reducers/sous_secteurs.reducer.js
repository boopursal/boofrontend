import * as Actions from '../actions';
import _ from '@lodash';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    entities          : null,
    pageCount : null,
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
    secteur : null,
    loading : false
};

const sous_secteursReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_SECTEURS:
        {
            return {
                ...state,
                secteur   : _.keyBy(action.payload, 'id')
            };
        }
        case Actions.REQUEST_SOUS_SECTEURS:
        {
            return {
                ...state,
                loading : true
                
            };
        }
        case Actions.GET_SOUS_SECTEURS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload['hydra:member'], 'id'),
                pageCount: FuseUtils.hydraPageCount(action.payload),
                loading : false
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
       
        default:
        {
            return state;
        }
    }
};

export default sous_secteursReducer;
