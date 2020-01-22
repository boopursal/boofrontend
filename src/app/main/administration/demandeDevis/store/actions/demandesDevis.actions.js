import { showMessage } from 'app/store/actions/fuse';
import agent from "agent";
import * as Actions from '@fuse/components/FuseNavigation/store/actions';

export const REQUEST_DEMANDES = '[DEMANDES APP] REQUEST DEMANDES';
export const REMOVE_DEMANDE = '[DEMANDES APP] REMOVE DEMANDES';
export const STATUT_DEMANDE = '[DEMANDES APP] STATUT DEMANDES';
export const SET_PARAMETRES_DATA = '[DEMANDES APP] SET PARAMETRES DATA';


export const GET_DEMANDES = '[DEMANDES APP] GET DEMANDES';
export const SET_DEMANDES_SEARCH_TEXT = '[DEMANDES APP] SET DEMANDES SEARCH TEXT';

export function getDemandes(parametres) {
  //  var description = parametres.description ? `=${parametres.description}` : '';
    const request = agent.get(`/api/demande_devis?page=${parametres.page}&order[${parametres.filter.id}]=${parametres.filter.direction}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_DEMANDES,
        });
        return request.then((response) =>
            dispatch({
                type: GET_DEMANDES,
                payload: response.data
            })
        );
    }

}
export function removeDemande(demande, parametres) {

    let Updatedemande = { del: true}
    return (dispatch, getState) => {


        const request = agent.put(`/api/demande_devis/${demande.id}`, Updatedemande);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_DEMANDE
                }),
                dispatch(Actions.getCountForBadge('demandes-devis')),
                dispatch(showMessage({
                    message: 'Demande bien supprimé!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ]).then(() => dispatch(getDemandes(parametres)))
        );
    };
}



export function setParametresData(parametres) {
    return {
        type: SET_PARAMETRES_DATA,
        parametres
    }
}

export function setDemandesSearchText(event) {
    return {
        type: SET_DEMANDES_SEARCH_TEXT,
        searchText: event.target.value
    }
}



