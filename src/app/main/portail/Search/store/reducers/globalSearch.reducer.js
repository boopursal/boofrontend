import * as Actions from '../actions';

const initialState = {
    searchText: '',
    suggestions: [],
    loading: false,
    opened: false,
    noSuggestions: false,
    produits: [],
    loadingProduits: false,
    activites: [],
    loadingActivites: false,
    fournisseurs: [],
    loadingFournisseurs: false,
    actualites: [],
    loadingActualites: false
};



const globalSearchReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.CLEAN_UP:
            return {
                ...state,
                suggestions: [],
                noSuggestions: false,
                produits: [],
                activites: [],
                fournisseurs: [],
                actualites: []
            };
        
        case Actions.REQUEST_DATA:
            return {
                ...state,
                loading: true,
                suggestions: [],
                noSuggestions: false,
                loadingProduits: true,
                loadingActivites: true,
                loadingFournisseurs: true,
                loadingActualites: true
            };

        case Actions.GET_DATA:
            const suggestions = action.payload;
            const noSuggestions = suggestions.length === 0;
            return {
                ...state,
                suggestions,
                noSuggestions,
                loading: false,
                loadingProduits: false,
                loadingActivites: false,
                loadingFournisseurs: false,
                loadingActualites: false,
                produits: suggestions.filter(item => item.type === 'produit'),
                activites: suggestions.filter(item => item.type === 'activite'),
                fournisseurs: suggestions.filter(item => item.type === 'fournisseur'),
                actualites: suggestions.filter(item => item.type === 'actualite')
            };

        case Actions.GS_OPEN:
            return {
                ...state,
                opened: true,
                produits: [],
                activites: [],
                fournisseurs: [],
                actualites: []
            };

        case Actions.GS_CLOSE:
            return {
                ...state,
                opened: false,
                searchText: '',
                produits: [],
                activites: [],
                fournisseurs: [],
                actualites: []
            };

        case Actions.SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
            };

        case Actions.CLEAR_SUGGESTIONS:
            return {
                ...state,
                suggestions: [],
                noSuggestions: false,
                loading: false,
                loadingProduits: false,
                loadingActivites: false,
                loadingFournisseurs: false,
                loadingActualites: false
            };

        default:
            return state;
    }
};

export default globalSearchReducer;
