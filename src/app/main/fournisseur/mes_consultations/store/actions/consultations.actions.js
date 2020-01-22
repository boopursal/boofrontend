import agent from "agent";

export const REQUEST_CONSULTATIONS = '[CONSULTATIONS APP] REQUEST CONSULTATIONS';
export const SET_PARAMETRES_DATA = '[CONSULTATIONS APP] SET PARAMETRES DATA';


export const GET_CONSULTATIONS = '[USERS APP] GET CONSULTATIONS';
export const SET_CONSULTATIONS_SEARCH_TEXT = '[USERS APP] SET CONSULTATIONS SEARCH TEXT';

export function getConsultations(parametres, id) {
    //var description = parametres.description ? `=${parametres.description}` : '';
    const request = agent.get(`/api/detail_visites?page=${parametres.page}&fournisseur=${id}&order[${parametres.filter.id}]=${parametres.filter.direction}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_CONSULTATIONS,
        });
        return request.then((response) =>
            dispatch({
                type: GET_CONSULTATIONS,
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

export function setConsultationsSearchText(event) {
    return {
        type: SET_CONSULTATIONS_SEARCH_TEXT,
        searchText: event.target.value
    }
}



