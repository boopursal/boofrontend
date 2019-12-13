import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import {showMessage} from 'app/store/actions/fuse';
import _ from '@lodash';

export const GET_BLACK_LISTES = '[BLACK_LISTES APP] GET BLACK_LISTES';
export const SET_SEARCH_TEXT = '[BLACK_LISTES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_BLACK_LISTES = '[BLACK_LISTES APP] TOGGLE IN SELECTED BLACK_LISTES';
export const SELECT_ALL_BLACK_LISTES = '[BLACK_LISTES APP] SELECT ALL BLACK_LISTES';
export const DESELECT_ALL_BLACK_LISTES = '[BLACK_LISTES APP] DESELECT ALL BLACK_LISTES';
export const OPEN_NEW_BLACK_LISTES_DIALOG = '[BLACK_LISTES APP] OPEN NEW BLACK_LISTES DIALOG';
export const CLOSE_NEW_BLACK_LISTES_DIALOG = '[BLACK_LISTES APP] CLOSE NEW BLACK_LISTES DIALOG';
export const OPEN_EDIT_BLACK_LISTES_DIALOG = '[BLACK_LISTES APP] OPEN EDIT BLACK_LISTES DIALOG';
export const CLOSE_EDIT_BLACK_LISTES_DIALOG = '[BLACK_LISTES APP] CLOSE EDIT BLACK_LISTES DIALOG';
export const ADD_BLACK_LISTE = '[BLACK_LISTES APP] ADD BLACK_LISTE';
export const SAVE_ERROR = '[BLACK_LISTES APP] SAVE ERROR';
export const UPDATE_BLACK_LISTE = '[BLACK_LISTES APP] UPDATE BLACK_LISTE';
export const REMOVE_BLACK_LISTE = '[BLACK_LISTES APP] REMOVE BLACK_LISTE';
/*export const GET_FOURNISSEURS = '[BLACK_LISTES APP] GET FOURNISSEURS';


export function getFournisseurs(societe)
{
    const request = agent.get(`/api/fournisseurs?societe${societe}=&props[]=id&props[]=societe`);

    return (dispatch) =>
        request.then((response) =>{
            console.log(response)
            dispatch({
                type   : GET_FOURNISSEURS,
                payload: response.data['hydra:member']
            })
        });
}
*/
export function getBlackListes(id_acheteur)
{
    const request = agent.get(`/api/acheteurs/${id_acheteur}/blacklistes`);

    return (dispatch) =>
        request.then((response) =>{
            dispatch({
                type   : GET_BLACK_LISTES,
                payload: response.data['hydra:member']
            })
        });
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}


export function openNewBlackListesDialog()
{
    return {
        type: OPEN_NEW_BLACK_LISTES_DIALOG
    }
}

export function closeNewBlackListesDialog()
{
    return {
        type: CLOSE_NEW_BLACK_LISTES_DIALOG
    }
}

export function openEditBlackListesDialog(data)
{
    return {
        type: OPEN_EDIT_BLACK_LISTES_DIALOG,
        data
    }
}

export function closeEditBlackListesDialog()
{
    return {
        type: CLOSE_EDIT_BLACK_LISTES_DIALOG
    }
}

export function addBlackListe(newBlackListe,id_acheteur)
{
    
    newBlackListe.acheteur=`/api/acheteurs/${id_acheteur}`;
    console.log(newBlackListe)
    return (dispatch, getState) => {

       
        const request = agent.post('/api/black_listes',newBlackListe);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_BLACK_LISTE
                }),
                dispatch(showMessage({message: 'Blacklisté avec succès!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getBlackListes(id_acheteur)))
        ).catch((error)=>{
            dispatch({
                type: SAVE_ERROR,
            });
            dispatch(
                showMessage({
                    message     : _.map(FuseUtils.parseApiErrors(error), function(value, key) {
                        return key+': '+value;
                      }) ,//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical  : 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }))
        });
    };
}

export function updateBlackListe(BlackListe,id_acheteur)
{
    return (dispatch, getState) => {

     
        console.log(BlackListe);
        const request = agent.put(BlackListe['@id'],BlackListe);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_BLACK_LISTE
                }),
                dispatch(showMessage({message: 'Bien modifié!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getBlackListes(id_acheteur)))
        )
        .catch((error)=>{
            dispatch({
                type: SAVE_ERROR,

            });
            dispatch(
                showMessage({
                    message     : _.map(FuseUtils.parseApiErrors(error), function(value, key) {
                        return key+': '+value;
                      }) ,//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical  : 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }))
        });
    };
}

export function removeBlackListe(BlackListe,state,id_acheteur)
{
    let Update = { etat: state }
    return (dispatch, getState) => {

        
        const request = agent.put(BlackListe['@id'],Update);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_BLACK_LISTE
                }),
                dispatch(showMessage({message: state?'Bien blacklisté':'Bien déblacklisté' ,anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getBlackListes(id_acheteur)))
        );
    };
}



