
import { FuseUtils } from '@fuse';
import { showMessage } from 'app/store/actions/fuse';
import agent from 'agent';
import _ from '@lodash';

export const REQUEST_DEMANDE = '[DEMANDE APP] REQUEST DEMANDE';
export const GET_DEMANDE = '[DEMANDE APP] GET DEMANDE';
export const REDIRECT_SUCCESS = '[DEMANDE APP] REDIRECT SUCCESS';

export const SAVE_ERROR = '[DEMANDE APP] SAVE ERROR';


export const REQUEST_SOUS_SECTEUR = '[DEMANDE APP] REQUEST SOUS_SECTEUR';
export const GET_SOUS_SECTEUR = '[DEMANDE APP] GET SOUS SECTEUR';





export function getSousSecteurs() {
    const request = agent.get('/api/sous_secteur_p');

    return (dispatch) => {
        dispatch({
            type: REQUEST_SOUS_SECTEUR,
        });
        return request.then((response) => {
            dispatch({
                type: GET_SOUS_SECTEUR,
                payload: response.data
            })
        });

    }

}

export function getDemande(params) {
    const request = agent.get(`/api/demande_achats/${params}/fournisseur`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_DEMANDE,
        });
        return request.then((response) =>{
            dispatch({
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





