import agent from "agent";

export const REQUEST_DEMANDE_DEVIS = '[PORTAIL APP] REQUEST_DEMANDE_DEVIS';
export const GET_DEMANDE_DEVIS = '[PORTAIL APP] GET_DEMANDE_DEVIS';

export const REQUEST_ACTUALITE = '[PORTAIL APP] REQUEST_ACTUALITE';
export const GET_ACTUALITE = '[PORTAIL APP] GET_ACTUALITE';

export const REQUEST_FOCUS_PRODUITS = '[PORTAIL APP] REQUEST_FOCUS_PRODUITS';
export const GET_FOCUS_PRODUITS = '[PORTAIL APP] GET_FOCUS_PRODUITS';

export const SET_PARAMETRES_DATA = '[PORTAIL APP] SET PARAMETRES DATA';
export const CLEAN_UP = '[PORTAIL APP] CLEAN_UP';
export const SET_PORTAIL_SEARCH_TEXT = '[PORTAIL APP] SET PORTAIL SEARCH TEXT';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getFocusProduct()
{
    const request = agent.get(`/api/select_produits?produit[exists]=true`);

    return (dispatch) =>{
        dispatch({
            type   : REQUEST_FOCUS_PRODUITS,
        });
       return request.then((response) =>
            dispatch({
                type   : GET_FOCUS_PRODUITS,
                payload: response.data['hydra:member']
            })
        );
    }
       
}

export function getdemandeDevis()
{
    const request = agent.get(`/api/demande_achats/?itemsPerPage=4&statut=1&order[created]=desc`);

    return (dispatch) =>{
        dispatch({
            type   : REQUEST_DEMANDE_DEVIS,
        });
       return request.then((response) =>
            dispatch({
                type   : GET_DEMANDE_DEVIS,
                payload: response.data['hydra:member']
            })
        );
    }
       
}

export function getNews()
{
    const request = agent.get(`/api/actualites/?itemsPerPage=3&order[created]=desc`);

    return (dispatch) =>{
        dispatch({
            type   : REQUEST_ACTUALITE,
        });
       return request.then((response) =>
            dispatch({
                type   : GET_ACTUALITE,
                payload: response.data['hydra:member']
            })
        );
    }
       
}

export function setParametresData(parametres)
{
    return {
        type      : SET_PARAMETRES_DATA,
        parametres
    }
}

export function setProduitsSearchText(event)
{
    return {
        type      : SET_PORTAIL_SEARCH_TEXT,
        searchText: event.target.value
    }
}



