import agent from "agent";

export const GS_SET_SEARCH_TEXT = '[GLOBAL SEARCH APP] GS_SET_SEARCH_TEXT';
export const GS_REQUEST_PRODUITS = '[GLOBAL SEARCH APP] GS_REQUEST_PRODUITS';
export const GS_GET_PRODUITS = '[GLOBAL SEARCH APP] GS_GET_PRODUITS';
export const GS_OPEN = '[GLOBAL SEARCH APP] GS_OPEN';
export const GS_CLOSE = '[GLOBAL SEARCH APP] GS_CLOSE';
export const CLEAN_UP = '[GLOBAL SEARCH APP] CLEAN_UP';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getResults(searchText)
{
    const request = agent.get(`/api/produits?itemsPerPage=5&titre=${searchText}&isValid=true&props[]=titre&props[]=description&props[]=pu&props[]=currency`);

    return (dispatch) =>{
        dispatch({
            type   : GS_REQUEST_PRODUITS,
        });
       return request.then((response) =>
            dispatch({
                type   : GS_GET_PRODUITS,
                payload: response.data['hydra:member']
            })
        );
    }
       
}


export function setGlobalSearchText(event)
{
    return {
        type      : GS_SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function showSearch()
{
    return {
        type      : GS_OPEN,
    }
}

export function hideSearch()
{
    return {
        type      : GS_CLOSE,
    }
}


