import jwtService from 'app/services/jwtService';
import {setUserData} from './user.actions';
import {getTokenFournisseur} from './user.actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({email, password})
{
    return (dispatch) =>
        jwtService.signInWithEmailAndPassword(email, password)
            .then((user) => {
                    dispatch(setUserData(user));

                    {/* ============= TOKENS FOURNISSEURS ============*/}
                    if(user.role === 'ROLE_FOURNISSEUR'){
                        dispatch(getTokenFournisseur());
                    }
                    return dispatch({
                        type: LOGIN_SUCCESS
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: error
                });
            });
}

export function submitLoginWithConfirmToken(confirmationToken)
{
    
    return (dispatch) =>

        jwtService.signInWithConfirmToken(confirmationToken)
            .then((user) => {
                    dispatch(setUserData(user));

                    return dispatch({
                        type: LOGIN_SUCCESS
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: error
                });
            });
}

