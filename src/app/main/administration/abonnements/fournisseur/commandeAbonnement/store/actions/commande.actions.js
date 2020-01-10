
import agent from 'agent';
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';


export const REQUEST_COMMANDE = '[COMMANDE APP] REQUEST COMMANDE';
export const GET_COMMANDE = '[COMMANDE APP] GET COMMANDE';

export const REQUEST_SOUS_SECTEURS = '[COMMANDE APP] REQUEST_SOUS_SECTEURS';
export const GET_SOUS_SECTEURS = '[COMMANDE APP] GET SOUS_SECTEURS';

export const REQUEST_OFFRES = '[COMMANDE APP] REQUEST OFFRES';
export const GET_OFFRES = '[COMMANDE APP] GET OFFRES';

export const REQUEST_SAVE = '[COMMANDE APP] REQUEST SAVE';
export const SAVE_COMMANDE = '[COMMANDE APP] SAVE COMMANDE';
export const SAVE_ERROR = '[COMMANDE APP] SAVE ERROR';
export const GET_PAIEMENT = '[COMMANDE APP] GET_PAIEMENT';
export const CLEAN_UP = '[COMMANDE APP] CLEAN_UP';



export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function updateCommande(data,sousSecteurs,offre,mode) {
    
    data.offre =offre['@id'];
    data.sousSecteurs = _.map(sousSecteurs, function (value, key) {
        return value.value;
    });
    data.mode=mode;
    const request = agent.put(data['@id'], data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SAVE,
        });
        return request.then((response) => {

            dispatch(showMessage({ message: 'Commande modifiée avec succès' }));

            return dispatch({
                type: SAVE_COMMANDE,
                payload: response.data
            })
        }
        );
    }

}


export function getSousSecteurs() {
    const request = agent.get('/api/sous_secteurs?parent[exists]=false&pagination=false&properties[]=id&properties[]=name');

    return (dispatch) => {
        dispatch({
            type: REQUEST_SOUS_SECTEURS,
        });
        return request.then((response) => {
            dispatch({
                type: GET_SOUS_SECTEURS,
                payload: response.data['hydra:member']
            })
        });

    }

}

export function getPaiements() {
    const request = agent.get(`/api/paiements`);

    return (dispatch) => {

        return request.then((response) => {
            dispatch({
                type: GET_PAIEMENT,
                payload: response.data['hydra:member']
            })
        });
    }

}

export function getOffres() {
    const request = agent.get(`/api/offres`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_OFFRES,
        });
        return request.then((response) => {
            return dispatch({
                type: GET_OFFRES,
                payload: response.data['hydra:member']
            })
        }

        );
    }

}

export function getCommande(params) {
    const request = agent.get(`/api/demande_abonnements/${params}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_COMMANDE,
        });
        return request.then((response) => {
            return dispatch({
                type: GET_COMMANDE,
                payload: response.data
            })
        }

        );
    }

}




