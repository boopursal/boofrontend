import * as Actions from '../actions';

const initialState = {
    loading : false,
    success: false,
    error  : {
        username: null,
        password: null
    }
};

const register = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.REQUEST_REGISTER:
        {
            return {
                ...initialState,
                loading : true
            };
        }
        case Actions.REGISTER_SUCCESS:
        {
            return {
                ...initialState,
                success: true,
                loading : false
                
            };
        }
        case Actions.REGISTER_ERROR:
        {
            return {
                success: false,
                error  : action.payload,
                loading : false
            };
        }
        default:
        {
            return state
        }
    }
};

export default register;