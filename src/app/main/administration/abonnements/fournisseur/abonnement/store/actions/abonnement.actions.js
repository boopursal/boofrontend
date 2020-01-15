
import agent from 'agent';
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';
import * as Actions from '@fuse/components/FuseNavigation/store/actions';

export const REQUEST_ABONNEMENT = '[ABONNEMENT APP] REQUEST ABONNEMENT';
export const GET_ABONNEMENT = '[ABONNEMENT APP] GET ABONNEMENT';

export const REQUEST_SOUS_SECTEURS = '[ABONNEMENT APP] REQUEST_SOUS_SECTEURS';
export const GET_SOUS_SECTEURS = '[ABONNEMENT APP] GET SOUS_SECTEURS';

export const REQUEST_OFFRES = '[ABONNEMENT APP] REQUEST OFFRES';
export const GET_OFFRES = '[ABONNEMENT APP] GET OFFRES';

export const REQUEST_SAVE = '[ABONNEMENT APP] REQUEST SAVE';
export const SAVE_ABONNEMENT = '[ABONNEMENT APP] SAVE ABONNEMENT';
export const SAVE_ERROR = '[ABONNEMENT APP] SAVE ERROR';
export const GET_PAIEMENT = '[ABONNEMENT APP] GET_PAIEMENT';
export const CLEAN_UP = '[ABONNEMENT APP] CLEAN_UP';
export const CLEAN_UP_FRS = '[ABONNEMENT APP] CLEAN_UP_FRS';
export const GET_DUREE = '[ABONNEMENT APP] GET_DUREE';

export const REQUEST_FOURNISSEURS = '[ABONNEMENT APP] REQUEST_FOURNISSEURS';
export const GET_FOURNISSEURS = '[ABONNEMENT APP] GET_FOURNISSEURS';
export const REQUEST_FOURNISSEUR = '[ABONNEMENT APP] REQUEST_FOURNISSEUR';
export const GET_FOURNISSEUR = '[ABONNEMENT APP] GET_FOURNISSEUR';



export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function cleanUpFrs() {

    return (dispatch) => dispatch({
        type: CLEAN_UP_FRS,
    });
}



export function getDurees() {
    const request = agent.get(`/api/durees`);

    return (dispatch) => {

        return request.then((response) => {
            dispatch({
                type: GET_DUREE,
                payload: response.data['hydra:member']
            })
        });
    }

}

export function getFournisseurs() {
    const request = agent.get(`/api/fournisseurs?pagination=false&del=false&isactif=true&props[]=id&props[]=societe`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_FOURNISSEURS,
        });
        return request.then((response) => {
            dispatch({
                type: GET_FOURNISSEURS,
                payload: response.data['hydra:member']
            })
        });
    }

}

export function getFournisseur(url) {
    const request = agent.get(url);

    return (dispatch) => {
        dispatch({
            type: REQUEST_FOURNISSEUR,
        });
        return request.then((response) => {
            dispatch({
                type: GET_FOURNISSEUR,
                payload: response.data
            })
        });
    }

}

export function saveAbonnement(data,sousSecteurs,offre,mode,duree, remise,paiement) {
    
    data.offre =offre['@id'];
    data.sousSecteurs = _.map(sousSecteurs, function (value, key) {
        return value.value;
    });
    data.mode=mode;
    data.duree=duree['@id'];
    data.fournisseur = data.fournisseur.value;
    data.statut=paiement;
    data.remise=remise;

    const request = agent.post('/api/abonnements', data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SAVE,
        });
        return request.then((response) => {

            dispatch(showMessage({ message: 'Abonnement sauvegarder' }));

            return dispatch({
                type: SAVE_ABONNEMENT,
                payload: response.data
            })
        }
        );
    }

}

export function updateAbonnement(data,sousSecteurs,offre,mode,duree, remise,paiement) {
    
    data.offre =offre['@id'];
    data.sousSecteurs = _.map(sousSecteurs, function (value, key) {
        return value.value;
    });
    data.mode=mode;
    data.duree=duree['@id'];
    data.paiement=paiement;
    data.remise=remise;

    const request = agent.put(data['@id'], data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SAVE,
        });
        return request.then((response) => {

            dispatch(showMessage({ message: 'Abonnement modifiée avec succès' }));
         //   dispatch(Actions.getCountForBadge('commandes-abonnements'));
          //  dispatch(Actions.getCountForBadge('abonnement-fournisseur'));
            return dispatch({
                type: SAVE_ABONNEMENT,
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

export function getAbonnement(params) {
    const request = agent.get(`/api/abonnements/${params}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_ABONNEMENT,
        });
        return request.then((response) => {
            return dispatch({
                type: GET_ABONNEMENT,
                payload: response.data
            })
        }

        );
    }

}




export function newAbonnement() {
    const data = {
        offre: null,
        sousSecteurs: []
    };

    return {
        type: GET_ABONNEMENT,
        payload: data
    }
}