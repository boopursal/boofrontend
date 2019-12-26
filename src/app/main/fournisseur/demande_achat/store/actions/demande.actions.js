
import agent from 'agent';
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';
import { getTokenFournisseur } from 'app/auth/store/actions/user.actions';
import * as Actions from '@fuse/components/FuseNavigation/store/actions';

export const REQUEST_VISITE_DEMANDE = '[DEMANDE APP] REQUEST_VISITE_DEMANDE';
export const GET_VISITE_DEMANDE = '[DEMANDE APP] GET_VISITE_DEMANDE';

export const REQUEST_DEMANDE = '[DEMANDE APP] REQUEST DEMANDE';
export const GET_DEMANDE = '[DEMANDE APP] GET DEMANDE';

export const SAVE_ERROR = '[DEMANDE APP] SAVE ERROR';

export const CLEAN_UP = '[DEMANDE APP] CLEAN_UP';



export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getDemande(params) {
    const request = agent.get(`/api/demande_achats/${params}/fournisseur`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_DEMANDE,
        });
        return request.then((response) => {
            dispatch(Actions.getCountForBadge('demandes_prix'));
            return dispatch({
                type: GET_DEMANDE,
                payload: response.data
            })
        }

        );
    }

}


export function getVisiteDemande(fournisseur_id, demande_id) {
    const request = agent.get(`/api/detail_visites?fournisseur=${fournisseur_id}&demande=${demande_id}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_VISITE_DEMANDE,
        });
        return request.then((response) => {
            dispatch({
                type: GET_VISITE_DEMANDE,
                payload: response.data['hydra:member'][0]
            })
        }

        );
    }

}

export function addVisiteDemande(fournisseur_id, demande) {

    let newVisit = {
        budget: parseFloat(0),
        demande: '/api/demande_achats/' + demande.id,
    }
    const request = agent.post(`/api/detail_visites`, newVisit);

    return (dispatch) => {
        dispatch({
            type: REQUEST_VISITE_DEMANDE,
        });
        return request.then((response) => {
            dispatch({
                type: GET_VISITE_DEMANDE,
                payload: response.data
            })
            dispatch(getTokenFournisseur())
        }

        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
            });
            dispatch(
                showMessage({
                    message: _.map(FuseUtils.parseApiErrors(error), function (value, key) {
                        return value;
                    }),//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }))
        });
    }

}






