import { showMessage } from 'app/store/actions/fuse';
import agent from "agent";

export const REQUEST_MESSAGES = '[MESSAGES APP] REQUEST MESSAGES';
export const REMOVE_MESSAGE = '[MESSAGES APP] REMOVE MESSAGES';
export const STATUT_MESSAGE = '[MESSAGES APP] STATUT MESSAGES';
export const GET_MESSAGES = '[MESSAGES APP] GET MESSAGES';
export const SET_MESSAGES_SEARCH_TEXT = '[MESSAGES APP] SET MESSAGES SEARCH TEXT';

export function getMessages(id) {
    const request = agent.get(`/api/fournisseurs/${id}/messages?statut=1`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_MESSAGES,
        });
        return request.then((response) =>
            dispatch({
                type: GET_MESSAGES,
                payload: response.data
            })
        );
    }

}
export function removeMessage(message, id) {

    let Updatemessage = { del: true}
    return (dispatch) => {


        const request = agent.put(`/api/contact_fournisseurs/${message.id}`, Updatemessage);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_MESSAGE
                }),
                dispatch(showMessage({
                    message: 'Message bien supprimé!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getMessages(id)))
        );
    };
}



export function setMessagesSearchText(event) {
    return {
        type: SET_MESSAGES_SEARCH_TEXT,
        searchText: event.target.value
    }
}



