import agent from "agent";

export const REQUEST_COMMANDES = '[COMMANDES AB FRS APP] REQUEST COMMANDES';
export const SET_PARAMETRES_DATA = '[COMMANDES AB FRS APP] SET PARAMETRES DATA';


export const GET_COMMANDES = '[COMMANDES AB FRS APP] GET COMMANDES';
export const SET_COMMANDES_SEARCH_TEXT = '[COMMANDES AB FRS APP] SET COMMANDES SEARCH TEXT';

export function getCommandes(parametres,id) {
    var reference = parametres.reference ? `=${parametres.reference}` : '';
    const request = agent.get(`/api/fournisseurs/${id}/demande_abonnements?page=${parametres.page}&reference${reference}&order[${parametres.filter.id}]=${parametres.filter.direction}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_COMMANDES,
        });
        return request.then((response) =>
            dispatch({
                type: GET_COMMANDES,
                payload: response.data
            })
        );
    }

}


export function setParametresData(parametres) {
    return {
        type: SET_PARAMETRES_DATA,
        parametres
    }
}

export function setCommandesSearchText(event) {
    return {
        type: SET_COMMANDES_SEARCH_TEXT,
        searchText: event.target.value
    }
}



