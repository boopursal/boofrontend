import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import _ from '@lodash';

export const REQUEST_SOUS_SECTEUR = '[STEP APP] REQUEST SOUS_SECTEUR';
export const GET_SOUS_SECTEUR = '[STEP APP] GET SOUS SECTEUR';


export const REQUEST_UPDATE_FOURNISSEUR = '[STEP APP] REQUEST UPDATE FOURNISSEUR';
export const UPDATE_FOURNISSEUR = '[STEP APP] UPDATE FOURNISSEUR';

export const SAVE_ERROR = '[STEP APP] SAVE ERROR';

export function getSousSecteurs()
{
    const request = agent.get('/api/sous_secteur_p');

    return (dispatch) =>{
        dispatch({
            type   : REQUEST_SOUS_SECTEUR,
        });
       return request.then((response) =>{
            dispatch({
                type   : GET_SOUS_SECTEUR,
                payload: response.data
            })
        });

    }
        
}


export function setStep3(data,fournisseur_id)
{
  
    
    data.redirect = '/dashboard';
   
    return (dispatch, getState) => {

        const request = agent.put(`/api/fournisseurs/${fournisseur_id}`,data);
        dispatch({
            type   : REQUEST_UPDATE_FOURNISSEUR,
        });
        return request.then((response) =>
        
            Promise.all([
                console.log(response),
                dispatch({
                    type: UPDATE_FOURNISSEUR,
                    payload : response.data
                })
            ])
        )
        .catch((error)=>{
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    };
      
}

