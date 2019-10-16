import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedPaysIds: [],
    routeParams       : {},
    paysDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    executed : false,
    message  : null,
    variant :''
};

const paysReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PAYS:
        {
            return {
                ...state,
                executed : false,
                message  : null,
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
        case Actions.TOGGLE_IN_SELECTED_PAYS:
        {

            const PaysId = action.PaysId;

            let selectedPaysIds = [...state.selectedPaysIds];

            if ( selectedPaysIds.find(id => id === PaysId) !== undefined )
            {
                selectedPaysIds = selectedPaysIds.filter(id => id !== PaysId);
            }
            else
            {
                selectedPaysIds = [...selectedPaysIds, PaysId];
            }

            return {
                ...state,
                selectedPaysIds: selectedPaysIds
            };
        }
        case Actions.SELECT_ALL_PAYS:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedPaysIds = arr.map(pays => pays.id);

            return {
                ...state,
                selectedPaysIds: selectedPaysIds
            };
        }
        case Actions.DESELECT_ALL_PAYS:
        {
            return {
                ...state,
                selectedPaysIds: []
            };
        }
        case Actions.OPEN_NEW_PAYS_DIALOG:
        {
            return {
                ...state,
                paysDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_PAYS_DIALOG:
        {
            return {
                ...state,
                paysDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_PAYS_DIALOG:
        {
            return {
                ...state,
                paysDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_PAYS_DIALOG:
        {
            return {
                ...state,
                paysDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.ADD_PAYS:
        {
            return {
                ...state,
                executed : true,
                message  : "Pays ajouté avec succès",
                variant : 'success'
                
            };
        }
        case Actions.UPDATE_PAYS:
        {
            return {
                ...state,
                executed : true,
                message  : "Pays modifié avec succès",
                variant : 'success'
                
            };
        }
        case Actions.REMOVE_PAYS:
        {
            return {
                ...state,
                executed : true,
                message  : "Pays supprimé avec succès",
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

export default paysReducer;
