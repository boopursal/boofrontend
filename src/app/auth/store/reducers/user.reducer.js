import * as Actions from '../actions';

const initialState = {
    role: [],//guest
    data: {
        'displayName': 'John Doe',
        'photoURL': 'assets/images/avatars/Velazquez.jpg',
        'email': 'johndoe@withinpixels.com',
        shortcuts: [
            'calendar',
            'mail',
            'contacts',
            'todo'
        ]
    },
    jetons: 0,
    requestJeton: false,
    requestAbonnement: false,
    abonnement: null
};

const user = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_USER_DATA:
            {
                return {
                    ...initialState,
                    ...action.payload
                };
            }
        case Actions.REQUEST_FOURNISSEUR_JETONS:
            {
                return {
                    ...state,
                    requestJeton: true
                };
            }
        case Actions.GET_FOURNISSEUR_JETONS:
            {
                return {
                    ...state,
                    jetons: action.payload,
                    requestJeton: false
                };
            }
        case Actions.REQUEST_FOURNISSEUR_ABONNEMENT:
            {
                return {
                    ...state,
                    requestAbonnement: true
                };
            }
        case Actions.GET_FOURNISSEUR_ABONNEMENT:
            {
                return {
                    ...state,
                    abonnement: action.payload,
                    requestAbonnement: false
                };
            }
        case Actions.REMOVE_USER_DATA:
            {
                return {
                    ...initialState
                };
            }
        case Actions.USER_LOGGED_OUT:
            {
                return initialState;
            }
        default:
            {
                return state
            }
    }
};

export default user;
