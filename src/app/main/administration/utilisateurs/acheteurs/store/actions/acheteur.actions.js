import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';
import * as Actions from '@fuse/components/FuseNavigation/store/actions';

export const REQUEST_ACHETEUR = '[ACHETEURS ADMIN APP] REQUEST ACHETEUR';
export const GET_ACHETEUR = '[ACHETEURS ADMIN APP] GET ACHETEUR';
export const GET_PAYS = '[ACHETEURS ADMIN APP] GET PAYS';
export const GET_VILLES = '[ACHETEURS ADMIN APP] GET VILLES';
export const REQUEST_PAYS = '[ACHETEURS ADMIN APP] REQUEST PAYS';
export const REQUEST_VILLES = '[ACHETEURS ADMIN APP] REQUEST VILLES';
export const SAVE_ERROR = '[ACHETEURS ADMIN APP] SAVE ERROR';
export const UPDATE_ACHETEUR = '[ACHETEURS ADMIN APP] UPDATE ACHETEUR';
export const REQUEST_UPDATE_ACHETEUR = '[ACHETEURS ADMIN APP] REQUEST UPDATE_ACHETEUR';
export const GET_SECTEURS = '[ACHETEURS ADMIN APP] GET_SECTEURS';

export const REQUEST_ADD_VILLE = '[ACHETEURS ADMIN APP] REQUEST_ADD_VILLE';
export const SAVE_ADD_VILLE = '[ACHETEURS ADMIN APP] SAVE_ADD_VILLE';
export const SAVE_ERROR_ADD_VILLE = '[ACHETEURS ADMIN APP] SAVE_ERROR_ADD_VILLE';
export const CLEAN_UP_VILLE = '[ACHETEURS ADMIN APP] CLEAN_UP_VILLE';

export const UPLOAD_AVATAR = '[ACHETEURS ADMIN APP] UPLOAD AVATAR';
export const UPLOAD_REQUEST = '[ACHETEURS ADMIN APP] UPLOAD REQUEST';
export const UPLOAD_ERROR = '[ACHETEURS ADMIN APP] UPLOAD ERROR';


export const CLEAN_UP_ACHETEUR = '[ACHETEUR ADMIN APP] CLEAN_UP_ACHETEUR';


export function cleanUpAcheteur() {

    return (dispatch) => dispatch({
        type: CLEAN_UP_ACHETEUR,
    });
}


export function cleanUpAddedVille() {

    return (dispatch) => dispatch({
        type: CLEAN_UP_VILLE,
    });
}


export function getAcheteur(id_acheteur) {
    const request = agent.get(`/api/acheteurs/${id_acheteur}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_ACHETEUR,
        });
        return request.then((response) => {

            dispatch({
                type: GET_ACHETEUR,
                payload: response.data
            })
        });

    }

}
export function getPays() {
    const request = agent.get('/api/pays?pagination=false&props[]=id&props[]=name');

    return (dispatch) => {
        dispatch({
            type: REQUEST_PAYS,
        });
        return request.then((response) => {

            dispatch({
                type: GET_PAYS,
                payload: response.data['hydra:member']
            })
        });

    }


}

export function getVilles(pays_id) {
    const request = agent.get(`${pays_id}/villes?pagination=false&props[]=id&props[]=name`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_VILLES,
        });
        return request.then((response) => {

            dispatch({
                type: GET_VILLES,
                payload: response.data['hydra:member']
            })
        });

    }

}

export function addVille(name, pays_id, acheteur_id) {

    let data = {
        name,
        pays: `/api/pays/${pays_id}`
    }

    const request = agent.post(`/api/villes`, data);

    return (dispatch) => {
        dispatch({
            type: REQUEST_ADD_VILLE,
        });
        dispatch({
            type: REQUEST_UPDATE_ACHETEUR,
        });
        return request.then((response) => {
            dispatch(getVilles(`/api/pays/${pays_id}`));
            let data = {
                ville: response.data['@id'],
                autreVille: null
            }
            const request2 = agent.put(`/api/acheteurs/${acheteur_id}`, data);
            return request2.then((response) => {
                dispatch(Actions.getCountForBadge('acheteur-admin'));
                dispatch({
                    type: UPDATE_ACHETEUR,
                    payload: response.data
                });
                dispatch({
                    type: SAVE_ADD_VILLE,
                });
            });
        }).catch((error) => {
            dispatch({
                type: SAVE_ERROR_ADD_VILLE,
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
                }));
        });;

    }

}


export function getSecteurs() {
    const request = agent.get(`/api/secteurs?pagination=false&props[]=id&props[]=name`);

    return (dispatch) => {

        return request.then((response) => {
            dispatch({
                type: GET_SECTEURS,
                payload: response.data["hydra:member"]
            })
        });

    }

}



export function updateSocieteInfo(data, id_acheteur) {


    let putData = {
        ...data,
        ice: data.pays.label !== 'Maroc' && null,
        pays: data.pays.value,
        ville: data.ville.value,
        secteur: data.secteur.value,
        codepostal: data.codepostal ? parseInt(data.codepostal) : null,
    }
    if (putData.codepostal === null) {
        delete putData.codepostal;
    }

    return (dispatch) => {

        const request = agent.put(`/api/acheteurs/${id_acheteur}`, putData);
        dispatch({
            type: REQUEST_UPDATE_ACHETEUR,
        });
        return request.then((response) =>

            Promise.all([
                dispatch({
                    type: UPDATE_ACHETEUR,
                    payload: response.data
                }),
                dispatch(showMessage({
                    message: 'Bien modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ])
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    };

}

export function etatAcheteur(acheteur, active) {

    let Updateacheteur = { isactif: active }
    return (dispatch) => {
        dispatch({
            type: REQUEST_UPDATE_ACHETEUR,
        });
        const request = agent.put(acheteur['@id'], Updateacheteur);
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_ACHETEUR,
                    payload: response.data
                }),
                dispatch(showMessage({
                    message: 'Statut modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ])
        );
    };
}

export function updateUserInfo(data, id_acheteur) {

    return (dispatch) => {

        const request = agent.put(`/api/acheteurs/${id_acheteur}`, data);
        dispatch({
            type: REQUEST_UPDATE_ACHETEUR,
        });
        return request.then((response) =>

            Promise.all([
                dispatch({
                    type: UPDATE_ACHETEUR,
                    payload: response.data
                }),
                dispatch(showMessage({
                    message: 'Bien modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ])
        )
            .catch((error) => {
                dispatch({
                    type: SAVE_ERROR,
                    payload: FuseUtils.parseApiErrors(error)
                });
            });
    };

}


export function uploadAvatar(file, id_acheteur) {

    return (dispatch) => {

        const formData = new FormData();
        formData.append("file", file);

        const request = agent.post('/api/avatars', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: UPLOAD_REQUEST
        });
        return request.then((response) =>

            Promise.all([
                (response),
                dispatch({
                    type: UPLOAD_AVATAR,
                    payload: response.data

                }),
                dispatch(updateUserAvatar({ avatar: response.data['@id'] }, id_acheteur))
            ])
        ).catch((error) => {
            dispatch({
                type: UPLOAD_ERROR,
            });
            dispatch(
                showMessage({
                    message: _.map(FuseUtils.parseApiErrors(error), function (value, key) {
                        return key + ': ' + value;
                    }),//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }))
        }

        );
    };
}

export function updateUserAvatar(data, id_acheteur) {

    return (dispatch) => {

        const request = agent.put(`/api/acheteurs/${id_acheteur}`, data);
        dispatch({
            type: REQUEST_UPDATE_ACHETEUR,
        });
        return request.then((response) =>

            Promise.all([
                dispatch({
                    type: UPDATE_ACHETEUR,
                    payload: response.data
                }),
                dispatch(showMessage({
                    message: 'Bien modifié!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ])
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    };

}

