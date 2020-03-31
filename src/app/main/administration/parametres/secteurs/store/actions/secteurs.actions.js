import agent from "agent";

export const REQUEST_SECTEURS = '[SECTEURS APP ADMIN] REQUEST SECTEURS';
export const GET_SECTEURS = '[SECTEURS APP ADMIN] GET SECTEURS';
export const SET_SECTEURS_SEARCH_TEXT = '[SECTEURS APP ADMIN] SET SECTEURS SEARCH TEXT';

export function setSearchText(event)
{
    return {
        type      : SET_SECTEURS_SEARCH_TEXT,
        searchText: event.target.value
    }
}
export function getSecteurs() {
    const request = agent.get(`/api/secteurs?pagination=false&props[]=name&props[]=id&props[]=del&props[]=image`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SECTEURS,
        });
        return request.then((response) =>
            dispatch({
                type: GET_SECTEURS,
                payload: response.data
            })
        );
    }

}

export function setSecteursSearchText(event) {
    return {
        type: SET_SECTEURS_SEARCH_TEXT,
        searchText: event.target.value
    }
}


