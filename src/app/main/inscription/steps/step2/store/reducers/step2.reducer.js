import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    pays: null,
    loading: false,
    villes: null,
    error: null,
    currencies: null,

};

const step2Reducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_PAYS:
        case Actions.REQUEST_UPDATE_FOURNISSEUR:
            {
                return {
                    ...state,
                    loading: true,
                };
            }
        case Actions.REQUEST_VILLES:
            {
                return {
                    ...state,
                    villes: null

                };
            }
        case Actions.GET_CURRENCY:
            {
                return {
                    ...state,
                    currencies: _.keyBy(action.payload, 'id'),

                };
            }
        case Actions.GET_PAYS:
            {
                return {
                    ...state,
                    pays: _.keyBy(action.payload, 'id'),
                    loading: false

                };
            }

        case Actions.GET_VILLES:
            {
                return {
                    ...state,
                    villes: _.keyBy(action.payload, 'id'),
                };
            }
        case Actions.UPDATE_FOURNISSEUR:
            {
                return {
                    ...state,
                    loading: false,
                };
            }
        case Actions.SAVE_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
            }

        default:
            {
                return state;
            }
    }
};

export default step2Reducer;
