
import { FuseUtils } from '@fuse';
import agent from 'agent';
import * as Actions from '@fuse/components/FuseNavigation/store/actions';


export const REQUEST_DEMANDE = '[DEMANDE APP] REQUEST DEMANDE';
export const GET_DEMANDE = '[DEMANDE APP] GET DEMANDE';
export const SAVE_ERROR = '[DEMANDE APP] SAVE ERROR';



export function getDemande(params) {
    const request = agent.get(`/api/demande_devis/${params}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_DEMANDE,
        });
        return request.then((response) => {
            dispatch(Actions.getCountForBadge('product-devis'));
            return dispatch({
                type: GET_DEMANDE,
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


