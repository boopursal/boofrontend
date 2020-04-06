import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';
import _ from '@lodash';

export const REQUEST_FOURNISSEUR = '[FOURNISSEURS ADMIN APP] REQUEST FOURNISSEUR';
export const GET_FOURNISSEUR = '[FOURNISSEURS ADMIN APP] GET FOURNISSEUR';
export const GET_PAYS = '[FOURNISSEURS ADMIN APP] GET PAYS';
export const GET_VILLES = '[FOURNISSEURS ADMIN APP] GET VILLES';
export const REQUEST_PAYS = '[FOURNISSEURS ADMIN APP] REQUEST PAYS';
export const REQUEST_VILLES = '[FOURNISSEURS ADMIN APP] REQUEST VILLES';
export const SAVE_ERROR = '[FOURNISSEURS ADMIN APP] SAVE ERROR';
export const UPDATE_FOURNISSEUR = '[FOURNISSEURS ADMIN APP] UPDATE FOURNISSEUR';
export const REQUEST_UPDATE_FOURNISSEUR = '[FOURNISSEURS ADMIN APP] REQUEST UPDATE_FOURNISSEUR';

export const REQUEST_SOUS_SECTEUR = '[FOURNISSEURS ADMIN APP] REQUEST_SOUS_SECTEUR';
export const GET_SOUS_SECTEUR = '[FOURNISSEURS ADMIN APP] GET_SOUS_SECTEUR';

export const UPLOAD_AVATAR = '[FOURNISSEURS ADMIN APP] UPLOAD AVATAR';
export const UPLOAD_REQUEST = '[FOURNISSEURS ADMIN APP] UPLOAD REQUEST';
export const UPLOAD_ERROR = '[FOURNISSEURS ADMIN APP] UPLOAD ERROR';


export const CLEAN_UP_FOURNISSEUR = '[FOURNISSEUR ADMIN APP] CLEAN_UP_FOURNISSEUR';


export function cleanUpFournisseur() {

    return (dispatch) => dispatch({
        type: CLEAN_UP_FOURNISSEUR,
    });
}

export function getFournisseur(id_fournisseur) {
    const request = agent.get(`/api/fournisseurs/${id_fournisseur}`);

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
    const request = agent.get(`/api/pays/${pays_id}/villes?pagination=false&props[]=id&props[]=name`);

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


export function getSousSecteurs(url) {
    const request = agent.get(`/api/sous_secteurs?pagination=false&props[]=id&props[]=name`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SOUS_SECTEUR,
        });
        return request.then((response) => {
            dispatch({
                type: GET_SOUS_SECTEUR,
                payload: response.data["hydra:member"]
            })
        });

    }

}



export function updateSocieteInfo(data, id_fournisseur) {


    if (data.pays.label !== 'Maroc') {
        data.ice = null;
    }
    data.pays = data.pays.value;
    data.ville =  data.ville.value;

    if (data.codepostal === null) {
        delete data.codepostal;
    } else {
        data.codepostal = parseInt(data.codepostal);
    }

    return (dispatch, getState) => {

        const request = agent.put(`/api/fournisseurs/${id_fournisseur}`, data);
        dispatch({
            type: REQUEST_UPDATE_FOURNISSEUR,
        });
        return request.then((response) =>

            Promise.all([
                dispatch({
                    type: UPDATE_FOURNISSEUR,
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

export function etatFournisseur(fournisseur,active)
{
    
    let Updatefournisseur = {isactif : active}
    return (dispatch, getState) => {
        dispatch({
            type: REQUEST_UPDATE_FOURNISSEUR,
        });
        const request = agent.put(fournisseur['@id'],Updatefournisseur);
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_FOURNISSEUR,
                    payload: response.data
                }),
                dispatch(showMessage({message: 'Statut modifié!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ])
        );
    };
}

export function updateSocieteSousSecteurs(data, id_fournisseur) {

    if (data.sousSecteurs)
        data.sousSecteurs = data.sousSecteurs.map((item => { return item.value }));

    return (dispatch, getState) => {

        const request = agent.put(`/api/fournisseurs/${id_fournisseur}`, data);
        dispatch({
            type: REQUEST_UPDATE_FOURNISSEUR,
        });
        return request.then((response) =>

            Promise.all([
                dispatch({
                    type: UPDATE_FOURNISSEUR,
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

export function updateUserInfo(data, id_fournisseur) {

    return (dispatch, getState) => {

        const request = agent.put(`/api/fournisseurs/${id_fournisseur}`, data);
        dispatch({
            type: REQUEST_UPDATE_FOURNISSEUR,
        });
        return request.then((response) =>

            Promise.all([
                dispatch({
                    type: UPDATE_FOURNISSEUR,
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


export function uploadAvatar(file, id_fournisseur) {

    return (dispatch, getState) => {

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
                dispatch(updateUserAvatar({ avatar: response.data['@id'] }, id_fournisseur))
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

export function updateUserAvatar(data, id_fournisseur) {



    return (dispatch, getState) => {

        const request = agent.put(`/api/fournisseurs/${id_fournisseur}`, data);
        dispatch({
            type: REQUEST_UPDATE_FOURNISSEUR,
        });
        return request.then((response) =>

            Promise.all([
                dispatch({
                    type: UPDATE_FOURNISSEUR,
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

