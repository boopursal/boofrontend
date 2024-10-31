import agent from "agent";
import axios from "axios";

// Types d'actions
export const SET_SEARCH_TEXT = '[GLOBAL SEARCH APP] SET_SEARCH_TEXT'; // Renommé
export const REQUEST_DATA = '[GLOBAL SEARCH APP] REQUEST_DATA';
export const GET_DATA = '[GLOBAL SEARCH APP] GET_DATA';
export const GS_REQUEST_PRODUITS = '[GLOBAL SEARCH APP] GS_REQUEST_PRODUITS';
export const GS_REQUEST_ACTIVITES = '[GLOBAL SEARCH APP] GS_REQUEST_ACTIVITES';
export const GS_REQUEST_FOURNISSEUR = '[GLOBAL SEARCH APP] GS_REQUEST_FOURNISSEUR';
export const GS_REQUEST_ACTUALITES = '[GLOBAL SEARCH APP] GS_REQUEST_ACTUALITES';
export const GS_GET_PRODUITS = '[GLOBAL SEARCH APP] GS_GET_PRODUITS';
export const GS_GET_ACTIVITES = '[GLOBAL SEARCH APP] GS_GET_ACTIVITES';
export const GS_GET_FOURNISSEUR = '[GLOBAL SEARCH APP] GS_GET_FOURNISSEUR';
export const GS_GET_ACTUALITES = '[GLOBAL SEARCH APP] GS_GET_ACTUALITES';
export const GS_OPEN = '[GLOBAL SEARCH APP] GS_OPEN';
export const GS_CLOSE = '[GLOBAL SEARCH APP] GS_CLOSE';
export const CLEAN_UP = '[GLOBAL SEARCH APP] CLEAN_UP';
export const NO_SUGGESTIONS = '[GLOBAL SEARCH APP] NO_SUGGESTIONS';
export const CLEAR_SUGGESTIONS = '[GLOBAL SEARCH APP] CLEAR_SUGGESTIONS';

const CancelToken = axios.CancelToken;
let cancel;
let timeOut;

export function cleanUp() {
    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function clearSuggestions() {
    return {
        type: CLEAR_SUGGESTIONS
    };
}

// Modifié pour accepter directement la valeur au lieu d'un événement
export function setSearchText(value) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: value
    };
}

export function getResults(searchText) {
    cancel && cancel();
    const request = agent.get(`/api/searchResult?searchText=${searchText}`, {
        cancelToken: new CancelToken(function executor(c) {
            cancel = c;
        })
    });

    return (dispatch) => {
        return request.then((response) => {
            const data = response.data.map(item => {
                if (item.datePublication) {
                    return {
                        ...item,
                        type: 'actualite'
                    };
                }
                return item;
            });

            dispatch({
                type: GET_DATA,
                payload: data
            });
        }).catch((error) => {
            if (axios.isCancel(error)) {
                console.log('get canceled');
            }
        });
    };
}

export function loadSuggestions(value) {
    timeOut && clearTimeout(timeOut);
    return (dispatch) => {
        dispatch({
            type: REQUEST_DATA,
        });

        timeOut = setTimeout(() => {
            dispatch(getResults(value));
        }, 300);
    };
}

export function showSearch() {
    return {
        type: GS_OPEN,
    };
}

export function hideSearch() {
    return {
        type: GS_CLOSE,
    };
}
