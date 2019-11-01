import agent from "agent";
import FuseUtils from '@fuse/FuseUtils';

export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export function submitRegisterFournisseur(newFournisseur) {
    return (dispatch, getState) => {

        const request = agent.post('/api/fournisseurs', newFournisseur);

        dispatch({
            type: REQUEST_REGISTER,
        });
        
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REGISTER_SUCCESS
                }),
            ])
        ).catch((error) => {
            dispatch({
                type: REGISTER_ERROR,
                payload: FuseUtils.parseApiErrors(error)

            });
        });
    };

}

export function submitRegisterAcheteur(newAcheteur) {

    return (dispatch, getState) => {

        const request = agent.post('/api/acheteurs', newAcheteur);

        dispatch({
            type: REQUEST_REGISTER,
        });
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REGISTER_SUCCESS
                })
            ])
        ).catch((error) => {
            dispatch({
                type: REGISTER_ERROR,
                payload: FuseUtils.parseApiErrors(error)

            });
        });
    };

}

