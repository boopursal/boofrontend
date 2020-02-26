import agent from "agent";
import axios from "axios";
import _ from '@lodash';

export const CLEAN_UP = '[PRODUITS APP] CLEAN_UP';
export const REQUEST_PRODUITS = '[PRODUITS APP] REQUEST_PRODUITS';
export const REQUEST_SECTEURS_COUNT = '[PRODUITS APP] REQUEST_SECTEURS_COUNT';
export const REQUEST_PAYS_COUNT = '[PRODUITS APP] REQUEST_PAYS_COUNT';
export const REQUEST_ACTIVITES_COUNT = '[PRODUITS APP] REQUEST_ACTIVITES_COUNT';
export const REQUEST_CATEGORIES_COUNT = '[PRODUITS APP] REQUEST_CATEGORIES_COUNT';

export const GET_ACTIVITES_COUNT = '[PRODUITS APP] GET_ACTIVITES_COUNT';
export const GET_CATEGORIES_COUNT = '[PRODUITS APP] GET_CATEGORIES_COUNT';
export const GET_PRODUITS = '[PRODUITS APP] GET_PRODUITS';
export const GET_SECTEURS_COUNT = '[PRODUITS APP] GET_SECTEURS_COUNT';
export const GET_PAYS_COUNT = '[PRODUITS APP] GET_PAYS_COUNT';
export const SET_PARAMETRES_DATA = '[PRODUITS APP] SET PARAMETRES DATA';

export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getProduits(params, pays, parametres) {
    const { secteur, activite, categorie } = params;
    let parametre = '';
    if (secteur) {
        parametre += `secteur.slug=${secteur}`
    }
    if (pays) {
        if (parametre)
            parametre += `&pays.slug=${pays}`
        else
            parametre += `pays.slug=${pays}`
    }
    if (activite) {
        parametre += `&sousSecteurs.slug=${activite}`
    }
    if (categorie) {
        parametre += `&categorie.slug=${categorie}`
    }

    if (parametre) {
        parametre = '&' + parametre;
    }
    let order = _.split(parametres.filter.id, '-');
    const request = agent.get(`/api/produits?page=${parametres.page}&itemsPerPage=${parametres.itemsPerPage}&order[${order[0]}]=${order[1]}` + (parametre ? parametre : ''));

    return (dispatch) => {
        dispatch({
            type: REQUEST_PRODUITS,
        });

        return request.then((response) => {

            dispatch({
                type: GET_PRODUITS,
                payload: response.data
            })

        }

        );
    }

}


export function getSecteursCounts(params, pays) {
    const { secteur, activite, categorie } = params;
    const request = agent.get(`/count_produit_categorie?secteur=${secteur ? secteur : ''}&sousSecteur=${activite ? activite : ''}&categorie=${categorie ? categorie : ''}&pays=${pays ? pays : ''}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SECTEURS_COUNT,
        });

        return request.then((response) => {

            dispatch({
                type: GET_SECTEURS_COUNT,
                payload: response.data
            })

        }



        );
    }

}

export function getActivitesCounts(params, pays) {
    const { secteur, activite, categorie } = params;
    const request = agent.get(`/count_produit_categorie?secteur=${secteur ? secteur : ''}&sousSecteur=${activite ? activite : ''}&categorie=${categorie ? categorie : ''}&pays=${pays ? pays : ''}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_ACTIVITES_COUNT,
        });

        return request.then((response) => {

            dispatch({
                type: GET_ACTIVITES_COUNT,
                payload: response.data
            })

        }



        );
    }

}

export function getCategoriesCounts(params, pays) {
    const { secteur, activite, categorie } = params;
    const request = agent.get(`/count_produit_categorie?secteur=${secteur ? secteur : ''}&sousSecteur=${activite ? activite : ''}&categorie=${categorie ? categorie : ''}&pays=${pays ? pays : ''}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_CATEGORIES_COUNT,
        });

        return request.then((response) => {

            dispatch({
                type: GET_CATEGORIES_COUNT,
                payload: response.data
            })

        }



        );
    }

}



export function getPaysCounts(params, pays) {
    const { secteur, activite, categorie } = params;
    const request = agent.get(`/count_produit_pays?secteur=${secteur ? secteur : ''}&sousSecteur=${activite ? activite : ''}&categorie=${categorie ? categorie : ''}&pays=${pays ? pays : ''}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_PAYS_COUNT,
        });

        return request.then((response) => {

            dispatch({
                type: GET_PAYS_COUNT,
                payload: response.data
            })

        }



        );
    }

}


export function getSecteursAndPaysCounts() {

    const request = agent.get(`/count_produit_categorie`);
    const request2 = agent.get(`/count_produit_pays`);
    return (dispatch) => {
        dispatch({
            type: REQUEST_PAYS_COUNT,
        });
        dispatch({
            type: REQUEST_SECTEURS_COUNT,
        });

        axios.all([request, request2]).then(axios.spread((...responses) => {

            request.then((response) =>
                dispatch({
                    type: GET_SECTEURS_COUNT,
                    payload: responses[0].data
                })
            );
            request2.then((response2) =>
                dispatch({
                    type: GET_PAYS_COUNT,
                    payload: responses[1].data
                })
            );

            // use/access the results 
        })).catch(errors => {
            // react on errors.
        })
    }

}

export function setParametresData(parametres) {
    return {
        type: SET_PARAMETRES_DATA,
        parametres
    }
}