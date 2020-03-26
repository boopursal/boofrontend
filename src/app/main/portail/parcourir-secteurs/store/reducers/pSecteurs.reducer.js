import * as Actions from '../actions';

const initialState = {
    data: null,
    loading: false,

};

const pSecteursReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            {
                return {
                    ...initialState,
                };
            }

        case Actions.REQUEST_SECTEURS:
            {
                return {
                    ...state,
                    loading: true,


                };
            }
        case Actions.GET_SECTEURS:
            {
                return {
                    ...state,
                    loading: false,
                    data: action.payload

                };
            }
        default:
            {
                return state;
            }
    }
};

export default pSecteursReducer;
