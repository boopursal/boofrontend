import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import {showMessage} from 'app/store/actions/fuse';
import _ from '@lodash';

export const GET_PAYS = '[PAYS APP] GET PAYS';
export const GET_ZONES = '[ZONES APP] GET ZONES';
export const SET_SEARCH_TEXT = '[ZONES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_ZONES = '[ZONES APP] TOGGLE IN SELECTED ZONES';
export const SELECT_ALL_ZONES = '[ZONES APP] SELECT ALL ZONES';
export const DESELECT_ALL_ZONES = '[ZONES APP] DESELECT ALL ZONES';
export const OPEN_NEW_ZONES_DIALOG = '[ZONES APP] OPEN NEW ZONES DIALOG';
export const CLOSE_NEW_ZONES_DIALOG = '[ZONES APP] CLOSE NEW ZONES DIALOG';
export const OPEN_EDIT_ZONES_DIALOG = '[ZONES APP] OPEN EDIT ZONES DIALOG';
export const CLOSE_EDIT_ZONES_DIALOG = '[ZONES APP] CLOSE EDIT ZONES DIALOG';
export const ADD_ZONE = '[ZONES APP] ADD ZONE';
export const SAVE_ERROR = '[ZONES APP] SAVE ERROR';
export const UPDATE_ZONE = '[ZONES APP] UPDATE ZONE';
export const REMOVE_ZONE = '[ZONES APP] REMOVE ZONE';
export const UPLOAD_IMAGE = '[ZONES APP] UPLOAD ZONE';
export const STATUT_ZONE = '[ZONES APP] STATUT ZONE';

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


export function getZones()
{
    const request = agent.get('/api/zone_commercials');

    return (dispatch) =>
        request.then((response) =>{
            dispatch({
                type   : GET_ZONES,
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


export function openNewZonesDialog()
{
    return {
        type: OPEN_NEW_ZONES_DIALOG
    }
}

export function closeNewZonesDialog()
{
    return {
        type: CLOSE_NEW_ZONES_DIALOG
    }
}

export function openEditZonesDialog(data)
{
    return {
        type: OPEN_EDIT_ZONES_DIALOG,
        data
    }
}

export function closeEditZonesDialog()
{
    return {
        type: CLOSE_EDIT_ZONES_DIALOG
    }
}

export function addZone(newZone)
{
    if (newZone.pays)
    newZone.pays = newZone.pays.map((item => {return item.value}));

    return (dispatch, getState) => {

       
        const request = agent.post('/api/zone_commercials',newZone);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_ZONE
                }),
                dispatch(showMessage({message: 'Admin commercials bien ajouté!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getZones()))
        ).catch((error)=>{
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error),

            })
        });
    };
}

export function updateZone(Zone)
{
    if (Zone.pays)
    Zone.pays = Zone.pays.map((item => {return item.value}));

    if(Zone.avatar && Zone.avatar.url)
    Zone.avatar = Zone.avatar['@id'];


    return (dispatch, getState) => {

     
        const request = agent.put(Zone['@id'],Zone);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_ZONE
                }),
                dispatch(showMessage({message: 'Admin commercials bien modifié!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getZones()))
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

export function removeZone(Zone)
{
    Zone.del=true;
    delete Zone.pays;
    Zone.name=Zone.name+'_deleted-'+Zone.id;
    return (dispatch, getState) => {

        
        const request = agent.put(Zone['@id'],Zone);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_ZONE
                }),
                dispatch(showMessage({message: 'Admin commercials bien supprimé!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getZones()))
        );
    };
}

export function activeAccount(Zone,active)
{
    
    let UpdateZone = {isactif : active}
    return (dispatch, getState) => {

        
        const request = agent.put(Zone['@id'],UpdateZone);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: STATUT_ZONE
                }),
                dispatch(showMessage({message: 'Statut modifié!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ]).then(() => dispatch(getZones()))
        );
    };
}

export function uploadImage(file)
{
    
    return (dispatch, getState) => {

        const formData = new FormData();
        formData.append("file", file);

        const request = agent.post('/api/avatars', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPLOAD_IMAGE,
                    payload: response.data['hydra:member']

                }),
                dispatch(showMessage({message: 'Image uploaded!',anchorOrigin: {
                    vertical  : 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'success'}))
            ])
        );
    };
}


