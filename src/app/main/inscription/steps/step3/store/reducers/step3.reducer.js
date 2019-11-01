import * as Actions from '../actions';
import _ from '@lodash';
import FuseUtils from '@fuse/FuseUtils';

const initialState = {
    sousSecteurs : null,
    loading : false,
    error : null,
    success : false,
    redirect_success : ''
    
};

const step3Reducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.REQUEST_SOUS_SECTEUR:
        case Actions.REQUEST_UPDATE_FOURNISSEUR:
        {
            return {
                ...state,
                loading : true,
                redirect_success :null
            };
        }
        
        case Actions.GET_SOUS_SECTEUR:
        {
            return {
                ...state,
                sousSecteurs   : _.keyBy(action.payload, 'id'),
                loading : false
                
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

export default step3Reducer;
