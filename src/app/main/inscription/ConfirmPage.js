import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import * as Actions from 'app/store/actions';
import {  FuseSplashScreen } from '@fuse';
import _ from '@lodash';


function ConfirmPage(props) {
    const dispatch = useDispatch();
    const login = useSelector(({ auth }) => auth.login);
    const user = useSelector(({auth}) => auth.user);

    useEffect(() => {
        if (props.match.params) {
            dispatch(authActions.submitLoginWithConfirmToken(props.match.params));
        }
    }, [dispatch, props.match.params]);

    useEffect(() => {
        if(login.error && (login.error.confirmationToken || login.error.Erreur))
        dispatch(
            Actions.showMessage({
                message: _.map(login.error, function (value, key) {
                    return  login.error.confirmationToken ? 'Le code d\'activation est incorrect' : value;
                }),
                autoHideDuration: 6000,//ms
                anchorOrigin: {
                    vertical: 'top',//top bottom
                    horizontal: 'right'//left center right
                },
                variant: 'error'//success error info warning null
            }));
           
            const timer = setTimeout(() => {
                props.history.push({
                    pathname: '/login'
                })
              }, 3000);
              return () => clearTimeout(timer);
            

    }, [dispatch, login.error]);

    useEffect(() => {
        if (login.success) {
            dispatch(
                Actions.showMessage({
                    message: 'ok',//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'//success error info warning null
                }));
                if(user.data.redirect){
                    props.history.push({
                        pathname: user.data.redirect
                    });
                }
                
        }

    }, [dispatch, login.success]);


    return (
        <FuseSplashScreen/>
    )
}

export default ConfirmPage;
