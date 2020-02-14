import agent from "agent";
import axios from "axios";

export const GS_SET_SEARCH_TEXT = '[GLOBAL SEARCH APP] GS_SET_SEARCH_TEXT';
export const GS_REQUEST_PRODUITS = '[GLOBAL SEARCH APP] GS_REQUEST_PRODUITS';
export const GS_REQUEST_ACTIVITES = '[GLOBAL SEARCH APP] GS_REQUEST_ACTIVITES';
export const GS_REQUEST_FOURNISSEUR = '[GLOBAL SEARCH APP] GS_REQUEST_FOURNISSEUR';
export const GS_GET_PRODUITS = '[GLOBAL SEARCH APP] GS_GET_PRODUITS';
export const GS_GET_ACTIVITES = '[GLOBAL SEARCH APP] GS_GET_ACTIVITES';
export const GS_GET_FOURNISSEUR = '[GLOBAL SEARCH APP] GS_GET_FOURNISSEUR';
export const GS_OPEN = '[GLOBAL SEARCH APP] GS_OPEN';
export const GS_CLOSE = '[GLOBAL SEARCH APP] GS_CLOSE';
export const CLEAN_UP = '[GLOBAL SEARCH APP] CLEAN_UP';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getResults(searchText) {

    const request = agent.get(`/api/produits?itemsPerPage=5&titre=${searchText}&isValid=true&props[]=titre&props[]=description&props[]=pu&props[]=currency`);
    const request2 = agent.get(`/api/sous_secteurs?parent[exists]=false&name=${searchText}&itemsPerPage=5&props[]=id&props[]=name`);
    const request3 = agent.get(`/api/fournisseurs?itemsPerPage=5&isactif=true&societe=${searchText}&props[]=id&props[]=societe`);
    return (dispatch) => {
        axios.all([request, request2, request3]).then(axios.spread((...responses) => {
            
            request.then((response) =>
                dispatch({
                    type: GS_GET_PRODUITS,
                    payload: responses[0].data['hydra:member']
                })
            );
            request2.then((response2) =>
                dispatch({
                    type: GS_GET_ACTIVITES,
                    payload: responses[1].data['hydra:member']
                })
            );
            request3.then((response3) =>
                dispatch({
                    type: GS_GET_FOURNISSEUR,
                    payload: responses[2].data['hydra:member']
                })
            );
            // use/access the results 
        })).catch(errors => {
            // react on errors.
        })
    }

}


export function setGlobalSearchText(event) {
    return {
        type: GS_SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function showSearch() {
    return {
        type: GS_OPEN,
    }
}

export function hideSearch() {
    return {
        type: GS_CLOSE,
    }
}


