import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';

export const GET_SECTEURS = '[SECTEURS APP] GET SECTEURS';
export const GET_SOUS_SECTEURS = '[SOUS_SECTEURS APP] GET SOUS_SECTEURS';
export const SET_SEARCH_TEXT = '[SOUS_SECTEURS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_SOUS_SECTEURS = '[SOUS_SECTEURS APP] TOGGLE IN SELECTED SOUS_SECTEURS';
export const SELECT_ALL_SOUS_SECTEURS = '[SOUS_SECTEURS APP] SELECT ALL SOUS_SECTEURS';
export const DESELECT_ALL_SOUS_SECTEURS = '[SOUS_SECTEURS APP] DESELECT ALL SOUS_SECTEURS';
export const OPEN_NEW_SOUS_SECTEURS_DIALOG = '[SOUS_SECTEURS APP] OPEN NEW SOUS_SECTEURS DIALOG';
export const CLOSE_NEW_SOUS_SECTEURS_DIALOG = '[SOUS_SECTEURS APP] CLOSE NEW SOUS_SECTEURS DIALOG';
export const OPEN_EDIT_SOUS_SECTEURS_DIALOG = '[SOUS_SECTEURS APP] OPEN EDIT SOUS_SECTEURS DIALOG';
export const CLOSE_EDIT_SOUS_SECTEURS_DIALOG = '[SOUS_SECTEURS APP] CLOSE EDIT SOUS_SECTEURS DIALOG';
export const ADD_SOUS_SECTEUR = '[SOUS_SECTEURS APP] ADD SOUS_SECTEUR';
export const SAVE_ERROR = '[SOUS_SECTEURS APP] SAVE ERROR';
export const UPDATE_SOUS_SECTEUR = '[SOUS_SECTEURS APP] UPDATE SOUS_SECTEUR';
export const REMOVE_SOUS_SECTEUR = '[SOUS_SECTEURS APP] REMOVE SOUS_SECTEUR';

export function getSecteurs()
{
    const request = agent.get('/api/secteurs');

    return (dispatch) =>
        request.then((response) =>{
            
            dispatch({
                type   : GET_SECTEURS,
                payload: response.data['hydra:member']
            })
        });
}


export function getSousSecteurs()
{
    const request = agent.get('/api/sous_secteurs');

    return (dispatch) =>
        request.then((response) =>{
            dispatch({
                type   : GET_SOUS_SECTEURS,
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


export function openNewSousSecteursDialog()
{
    return {
        type: OPEN_NEW_SOUS_SECTEURS_DIALOG
    }
}

export function closeNewSousSecteursDialog()
{
    return {
        type: CLOSE_NEW_SOUS_SECTEURS_DIALOG
    }
}

export function openEditSousSecteursDialog(data)
{
    return {
        type: OPEN_EDIT_SOUS_SECTEURS_DIALOG,
        data
    }
}

export function closeEditSousSecteursDialog()
{
    return {
        type: CLOSE_EDIT_SOUS_SECTEURS_DIALOG
    }
}

export function addSousSecteur(newSousSecteur)
{
    newSousSecteur.secteur = newSousSecteur.secteur.value;
    return (dispatch, getState) => {

       
        const request = agent.post('/api/sous_secteurs',newSousSecteur);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_SOUS_SECTEUR
                })
            ]).then(() => dispatch(getSousSecteurs()))
        ).catch((error)=>{
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error),

            })
        });
    };
}

export function updateSousSecteur(SousSecteur)
{
    SousSecteur.secteur = SousSecteur.secteur.value;
    return (dispatch, getState) => {

     
        const request = agent.put(SousSecteur['@id'],SousSecteur);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_SOUS_SECTEUR
                })
            ]).then(() => dispatch(getSousSecteurs()))
        )
        .catch((error)=>{
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error),

            })
        });
    };
}

export function removeSousSecteur(SousSecteur)
{
    SousSecteur.del=true;
    delete SousSecteur.secteur;
    SousSecteur.name=SousSecteur.name+'_deleted-'+SousSecteur.id;
    return (dispatch, getState) => {

        
        const request = agent.put(SousSecteur['@id'],SousSecteur);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_SOUS_SECTEUR
                })
            ]).then(() => dispatch(getSousSecteurs()))
        );
    };
}



