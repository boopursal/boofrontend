import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';
import _ from '@lodash';
import jwtService from 'app/services/jwtService';
import { setUserData } from "app/auth/store/actions";
/**
 * 
 *    TO KNOW :  '/api/*_p' ==> p = api personnalisé
 * 
 */




export const GET_PAYS = '[STEP APP] GET PAYS';
export const GET_SECTEURS = '[STEP APP] GET SECTEURS';
export const GET_VILLES = '[STEP APP] GET VILLES';
export const REQUEST_PAYS = '[STEP APP] REQUEST PAYS';
export const REQUEST_VILLES = '[STEP APP] REQUEST VILLES';
export const REQUEST_UPDATE_ACHETEUR = '[STEP APP] REQUEST UPDATE ACHETEUR';
export const UPDATE_ACHETEUR = '[STEP APP] UPDATE ACHETEUR';
export const SAVE_ERROR = '[STEP APP] SAVE ERROR';


export function getPays()
{
    const request = agent.get('/api/pays_p');

    return (dispatch) =>{
        dispatch({
            type   : REQUEST_PAYS,
        });
       return request.then((response) =>{
            
            dispatch({
                type   : GET_PAYS,
                payload: response.data
            })
        });

    }
        
}

export function getSecteurs()
{
    const request = agent.get('/api/secteurs_p');

    return (dispatch) =>{
       
       return request.then((response) =>{
            
            dispatch({
                type   : GET_SECTEURS,
                payload: response.data
            })
        });

    }
        
}

export function getVilles(pays_id)
{
    const request = agent.get(`/api/pays_p/${pays_id}/villes`);

    return (dispatch) =>{
        dispatch({
            type   : REQUEST_VILLES,
        });
       return request.then((response) =>{
            
            dispatch({
                type   : GET_VILLES,
                payload: response.data
            })
        });

    }
        
}


export function setStep4(data,acheteur_id)
{
  
    
    data.pays = '/api/pays/'+data.pays.value;
    data.ville = '/api/villes/'+data.ville.value;
    data.secteur = '/api/secteurs/'+data.secteur.value;
    data.redirect = '/dashboard';
    data.roles = ['ROLE_ACHETEUR'];
    
    return (dispatch, getState) => {

        const request = agent.put(`/api/acheteurs/${acheteur_id}`,data);
        dispatch({
            type   : REQUEST_UPDATE_ACHETEUR,
        });
        return request.then((response) =>
        
            Promise.all([
                console.log(response),
                dispatch({
                    type: UPDATE_ACHETEUR,
                    payload : response.data
                }),
                jwtService.signInWithToken()
                .then(user => {
                    dispatch(setUserData(user));

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

