import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';

export const GET_PAYS = '[PAYS APP] GET PAYS';
export const SET_SEARCH_TEXT = '[PAYS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_PAYS = '[PAYS APP] TOGGLE IN SELECTED PAYS';
export const SELECT_ALL_PAYS = '[PAYS APP] SELECT ALL PAYS';
export const DESELECT_ALL_PAYS = '[PAYS APP] DESELECT ALL PAYS';
export const OPEN_NEW_PAYS_DIALOG = '[PAYS APP] OPEN NEW PAYS DIALOG';
export const CLOSE_NEW_PAYS_DIALOG = '[PAYS APP] CLOSE NEW PAYS DIALOG';
export const OPEN_EDIT_PAYS_DIALOG = '[PAYS APP] OPEN EDIT PAYS DIALOG';
export const CLOSE_EDIT_PAYS_DIALOG = '[PAYS APP] CLOSE EDIT PAYS DIALOG';
export const ADD_PAYS = '[PAYS APP] ADD PAYS';
export const SAVE_ERROR = '[PAYS APP] SAVE ERROR';
export const UPDATE_PAYS = '[PAYS APP] UPDATE PAYS';
export const REMOVE_PAYS = '[PAYS APP] REMOVE PAYS';
export const REMOVE_PAYSS = '[PAYS APP] REMOVE PAYSS';


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

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedPays(PaysId)
{
    return {
        type: TOGGLE_IN_SELECTED_PAYS,
        PaysId
    }
}

export function selectAllPays()
{
    return {
        type: SELECT_ALL_PAYS
    }
}

export function deSelectAllPays()
{
    return {
        type: DESELECT_ALL_PAYS
    }
}

export function openNewPaysDialog()
{
    return {
        type: OPEN_NEW_PAYS_DIALOG
    }
}

export function closeNewPaysDialog()
{
    return {
        type: CLOSE_NEW_PAYS_DIALOG
    }
}

export function openEditPaysDialog(data)
{
    return {
        type: OPEN_EDIT_PAYS_DIALOG,
        data
    }
}

export function closeEditPaysDialog()
{
    return {
        type: CLOSE_EDIT_PAYS_DIALOG
    }
}

export function addPays(newPays)
{
    
    return (dispatch, getState) => {

       
        const request = agent.post('/api/pays',newPays);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_PAYS
                })
            ]).then(() => dispatch(getPays()))
        ).catch((error)=>{
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error),

            })
        });
    };
}

export function updatePays(Pays)
{
    
    return (dispatch, getState) => {

     
        const request = agent.put(Pays['@id'],Pays);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_PAYS
                })
            ]).then(() => dispatch(getPays()))
        )
        .catch((error)=>{
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error),

            })
        });
    };
}

export function removePays(Pays)
{
    Pays.del=true;
    Pays.name=Pays.name+'_deleted-'+Pays.id;
    return (dispatch, getState) => {

        
        const request = agent.put(Pays['@id'],Pays);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_PAYS
                })
            ]).then(() => dispatch(getPays()))
        );
    };
}


export function removePayss(PaysIds)
{
    return (dispatch, getState) => {

        const request = agent.post('', {
            PaysIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_PAYSS
                }),
                dispatch({
                    type: DESELECT_ALL_PAYS
                })
            ]).then(() => dispatch(getPays()))
        );
    };
}

