
import { FuseUtils } from '@fuse';
import agent from 'agent';
import * as Actions from '@fuse/components/FuseNavigation/store/actions';


export const REQUEST_MESSAGE = '[MESSAGE APP] REQUEST MESSAGE';
export const GET_MESSAGE = '[MESSAGE APP] GET MESSAGE';
export const SAVE_ERROR = '[MESSAGE APP] SAVE ERROR';



export function getMessage(params) {
    const request = agent.get(`/api/contact_fournisseurs/${params}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_MESSAGE,
        });
        return request.then((response) => {
            dispatch(Actions.getCountForBadge('messages'));
            return dispatch({
                type: GET_MESSAGE,
                payload: response.data
            })
        }

        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error),

            })
        });
    }

}


