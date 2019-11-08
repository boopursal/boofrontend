import agent from "agent";

export const REQUEST_DEMANDES = '[DEMANDES APP] REQUEST DEMANDES';

export const GET_DEMANDES = '[USERS APP] GET DEMANDES';
export const SET_DEMANDES_SEARCH_TEXT = '[USERS APP] SET DEMANDES SEARCH TEXT';

export function getDemandes(id_acheteur)
{
    const request = agent.get(`/api/acheteurs/${id_acheteur}/demandes`);

    return (dispatch) =>{
        dispatch({
            type   : REQUEST_DEMANDES,
        });
       return request.then((response) =>
            dispatch({
                type   : GET_DEMANDES,
                payload: response.data
            })
        );
    }
       
}

export function setDemandesSearchText(event)
{
    return {
        type      : SET_DEMANDES_SEARCH_TEXT,
        searchText: event.target.value
    }
}

