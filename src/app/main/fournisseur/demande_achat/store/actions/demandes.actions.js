import agent from "agent";

export const REQUEST_DEMANDES = '[DEMANDES FOURNISSEUR APP] REQUEST DEMANDES';
export const SET_PARAMETRES_DATA = '[DEMANDES FOURNISSEUR APP] SET PARAMETRES DATA';


export const GET_DEMANDES = '[DEMANDES FOURNISSEUR APP] GET DEMANDES';
export const SET_DEMANDES_SEARCH_TEXT = '[DEMANDES FOURNISSEUR APP] SET DEMANDES SEARCH TEXT';

export function getDemandes(parametres) {
    var description = parametres.description ? `=${parametres.description}` : '';
    const request = agent.get(`/api/demande_achats/fournisseur?page=${parametres.page}&description${description}&order[${parametres.filter.id}]=${parametres.filter.direction}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_DEMANDES,
        });
        return request.then((response) =>
            dispatch({
                type: GET_DEMANDES,
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

export function setDemandesSearchText(event) {
    return {
        type: SET_DEMANDES_SEARCH_TEXT,
        searchText: event.target.value
    }
}



