import * as Actions from '../actions';
import _ from '@lodash';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    pays          : null,
    loading : false,
    villes : null,
    error : null,
    success : false,
    redirect_success : ''
    
};

const step2Reducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.REQUEST_PAYS:
        case Actions.REQUEST_UPDATE_FOURNISSEUR:
        {
            return {
                ...state,
                loading : true,
                redirect_success :null
            };
        }
        case Actions.REQUEST_VILLES:
        {
            return {
                ...state,
                villes : null
                
            };
        }
        case Actions.GET_PAYS:
        {
            return {
                ...state,
                pays   : _.keyBy(action.payload, 'id'),
                loading : false
                
            };
        }

        case Actions.GET_VILLES:
        {
            return {
                ...state,
                villes   : _.keyBy(action.payload, 'id'),
            };
        }
        case Actions.UPDATE_FOURNISSEUR:
        {
            return {
                ...state,
                loading : false,
                success : true,
                redirect_success : action.payload.redirect ? action.payload.redirect : '/login'
            };
        }
        case Actions.SAVE_ERROR:
        {
            return {
                ...state,
                loading : false,
                error  : action.payload,
                success: false,
                redirect_success : ''
            };
        }
        
        default:
        {
            return state;
        }
    }
};

export default step2Reducer;
