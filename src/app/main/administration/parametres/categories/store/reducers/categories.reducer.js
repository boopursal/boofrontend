import * as Actions from '../actions';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    entities          : null,
    pageCount : null,
    searchText        : '',
    parametres:{
        page : 1,
        name :'',
        filter: {
            id : 'id',
            direction : 'desc'
        }
    },
    routeParams       : {},
    categorieDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    sousSecteurs : null,
    loading : false,
    parents : null
};

const categoriesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_SOUS_SECTEURS:
        {
            return {
                ...state,
                sousSecteurs   : action.payload
            };
        }
        
        case Actions.REQUEST_CATEGORIES:
        {
            return {
                ...state,
                loading : true
                
            };
        }
        case Actions.GET_CATEGORIES:
        {
            return {
                ...state,
                entities   : action.payload['hydra:member'],
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

        case Actions.SET_CURRENT_PAGE:
        case Actions.SET_FILTER_DATA:
        case Actions.SET_SORTED_DATA:
        {
            return {
                ...state,
                parametres:{
                    page : action.parametres.page,
                    name :action.parametres.name,
                    filter: {
                        id : action.parametres.filter.id,
                        direction : action.parametres.filter.direction
                    }
                }
                
            };
        }
        
        case Actions.OPEN_NEW_CATEGORIES_DIALOG:
        {
            return {
                ...state,
                categorieDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_CATEGORIES_DIALOG:
        {
            return {
                ...state,
                categorieDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_CATEGORIES_DIALOG:
        {
            return {
                ...state,
                categorieDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_CATEGORIES_DIALOG:
        {
            return {
                ...state,
                categorieDialog: {
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

export default categoriesReducer;
