import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';

export const GET_PAYS = '[PAYS APP] GET PAYS';
export const GET_VILLES = '[VILLES APP] GET VILLES';
export const SET_SEARCH_TEXT = '[VILLES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_VILLES = '[VILLES APP] TOGGLE IN SELECTED VILLES';
export const SELECT_ALL_VILLES = '[VILLES APP] SELECT ALL VILLES';
export const DESELECT_ALL_VILLES = '[VILLES APP] DESELECT ALL VILLES';
export const OPEN_NEW_VILLES_DIALOG = '[VILLES APP] OPEN NEW VILLES DIALOG';
export const CLOSE_NEW_VILLES_DIALOG = '[VILLES APP] CLOSE NEW VILLES DIALOG';
export const OPEN_EDIT_VILLES_DIALOG = '[VILLES APP] OPEN EDIT VILLES DIALOG';
export const CLOSE_EDIT_VILLES_DIALOG = '[VILLES APP] CLOSE EDIT VILLES DIALOG';
export const ADD_VILLE = '[VILLES APP] ADD VILLE';
export const SAVE_ERROR = '[VILLES APP] SAVE ERROR';
export const UPDATE_VILLE = '[VILLES APP] UPDATE VILLE';
export const REMOVE_VILLE = '[VILLES APP] REMOVE VILLE';

export function getPays()
{
    const request = agent.get('/api/pays');

    return (dispatch) =>
        request.then((response) =>{
            
            dispatch({
                type   : GET_PAYS,
                payload: response.data['hydra:member']
            })
        });
}


export function getVilles()
{
    const request = agent.get('/api/villes');

    return (dispatch) =>
        request.then((response) =>{
            dispatch({
                type   : GET_VILLES,
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


export function openNewVillesDialog()
{
    return {
        type: OPEN_NEW_VILLES_DIALOG
    }
}

export function closeNewVillesDialog()
{
    return {
        type: CLOSE_NEW_VILLES_DIALOG
    }
}

export function openEditVillesDialog(data)
{
    return {
        type: OPEN_EDIT_VILLES_DIALOG,
        data
    }
}

export function closeEditVillesDialog()
{
    return {
        type: CLOSE_EDIT_VILLES_DIALOG
    }
}

export function addVille(newVille)
{
    newVille.pays = newVille.pays.value;
    return (dispatch, getState) => {

       
        const request = agent.post('/api/villes',newVille);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_VILLE
                })
            ]).then(() => dispatch(getVilles()))
        ).catch((error)=>{
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error),

            })
        });
    };
}

export function updateVille(Ville)
{
    Ville.pays = Ville.pays.value;
    return (dispatch, getState) => {

     
        const request = agent.put(Ville['@id'],Ville);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_VILLE
                })
            ]).then(() => dispatch(getVilles()))
        )
        .catch((error)=>{
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error),

            })
        });
    };
}

export function removeVille(Ville)
{
    Ville.del=true;
    delete Ville.pays;
    Ville.name=Ville.name+'_deleted-'+Ville.id;
    return (dispatch, getState) => {

        
        const request = agent.put(Ville['@id'],Ville);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_VILLE
                })
            ]).then(() => dispatch(getVilles()))
        );
    };
}



