
import agent from 'agent';

export const REQUEST_VISITE_DEMANDE = '[DEMANDE APP] REQUEST_VISITE_DEMANDE';
export const GET_VISITE_DEMANDE = '[DEMANDE APP] GET_VISITE_DEMANDE';

export const REQUEST_DEMANDE = '[DEMANDE APP] REQUEST DEMANDE';
export const GET_DEMANDE = '[DEMANDE APP] GET DEMANDE';

export const SAVE_ERROR = '[DEMANDE APP] SAVE ERROR';

export const CLEAN_UP = '[DEMANDE APP] CLEAN_UP';



export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getDemande(params) {
    const request = agent.get(`/api/demande_achats/${params}/fournisseur`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_DEMANDE,
        });
        return request.then((response) => {
            dispatch({
                type: GET_DEMANDE,
                payload: response.data
            })
        }

        );
    }

}


export function getVisiteDemande(fournisseur_id, demande_id) {
    const request = agent.get(`/api/detail_visites?fournisseur=${fournisseur_id}&demande=${demande_id}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_VISITE_DEMANDE,
        });
        return request.then((response) => {
            console.log(response.data['hydra:member'][0])
            dispatch({
                type: GET_VISITE_DEMANDE,
                payload: response.data['hydra:member'][0]
            })
        }

        );
    }

}





