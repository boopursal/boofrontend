import agent from "agent";

export const REQUEST_ABONNEMENTS = '[ABONNEMENTS FRS APP] REQUEST ABONNEMENTS';
export const SET_PARAMETRES_DATA = '[ABONNEMENTS FRS APP] SET PARAMETRES DATA';


export const GET_ABONNEMENTS = '[ABONNEMENTS FRS APP] GET ABONNEMENTS';
export const SET_ABONNEMENTS_SEARCH_TEXT = '[ABONNEMENTS FRS APP] SET ABONNEMENTS SEARCH TEXT';
export const CLEAN_UP = '[ABONNEMENTS FRS APP] CLEAN_UP';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getAbonnements(parametres,id) {
    var reference = parametres.reference ? `=${parametres.reference}` : '';
    const request = agent.get(`/api/fournisseurs/${id}/abonnements?page=${parametres.page}&reference${reference}&order[${parametres.filter.id}]=${parametres.filter.direction}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_ABONNEMENTS,
        });
        return request.then((response) =>
            dispatch({
                type: GET_ABONNEMENTS,
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

export function setAbonnementsSearchText(event) {
    return {
        type: SET_ABONNEMENTS_SEARCH_TEXT,
        searchText: event.target.value
    }
}



