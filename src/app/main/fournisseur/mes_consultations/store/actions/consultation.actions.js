
import agent from 'agent';
import { FuseUtils } from '@fuse';
import { showMessage } from 'app/store/actions/fuse';

export const REQUEST_CONSULTATION = '[CONSULTATION APP] REQUEST CONSULTATION';
export const GET_CONSULTATION = '[CONSULTATION APP] GET CONSULTATION';
export const GET_PERSONNELS = '[CONSULTATION APP] GET_PERSONNELS';

export const REQUEST_SAVE = '[CONSULTATION APP] REQUEST SAVE';
export const SAVE_CONSULTANTION = '[CONSULTATION APP] SAVE CONSULTANTION';
export const SAVE_ERROR = '[CONSULTATION APP] SAVE ERROR';

export const CLEAN_UP = '[CONSULTATION APP] CLEAN_UP';



export function cleanUp() {

    return (dispatch) => dispatch({
        type: CLEAN_UP,
    });
}

export function getConsultation(params) {
    const request = agent.get(`/api/detail_visites/${params}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_CONSULTATION,
        });
        return request.then((response) => {
            dispatch({
                type: GET_CONSULTATION,
                payload: response.data
            })
        }

        );
    }

}

export function getPersonnels(params) {
    const request = agent.get(`/api/fournisseurs/${params}/personnels`);

    return (dispatch) => {
        
        return request.then((response) => {
            dispatch({
                type: GET_PERSONNELS,
                payload: response.data['hydra:member']
            })
        }

        );
    }

}

export function putConsultation(data) {

   
    let UpdatedData = {
        budget : parseFloat(data.budget),
        personnel : data.personnel? data.personnel.value : null,
        statut : data.statut,
        sendEmail: data.sendEmail ? data.sendEmail : false,
    }

    const request = agent.put(data['@id'], UpdatedData);

    return (dispatch) => {
      
        dispatch({
            type:REQUEST_SAVE
        });
        return request.then((response) => {

            dispatch(showMessage({ message: 'Consultation Modifié' }));
            return dispatch({
                type: SAVE_CONSULTANTION,
                payload: response.data
            })
        }
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    }

}





