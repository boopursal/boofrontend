import React, {useEffect, useRef, useState} from 'react';
import {Button, InputAdornment, Icon} from '@material-ui/core';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import * as authActions from 'app/auth/store/actions';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/store/actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
      },
      wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
      },
     
      buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
  }));
function JWTLoginTab(props)
{
    const dispatch = useDispatch();
    const login = useSelector(({auth}) => auth.login);
    const classes = useStyles();
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = React.useState(false);
   // const [success, setSuccess] = React.useState(false);
    const formRef = useRef(null);
    const timer = React.useRef();

    useEffect(() => {
        if ( login.error && login.error.message )
        {
            dispatch(
                Actions.showMessage({
                    message     : login.error.message,//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical  : 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }));
                
        }
        enableButton();
        return () => {
            clearTimeout(timer.current);
          };
    }, [dispatch,login.error]);

    function handleButtonClick() {
        if (!loading) {
          //setSuccess(false);
          setLoading(true);
          timer.current = setTimeout(() => {
           // setSuccess(true);
            setLoading(false);
          }, 2000);
        }
      }

    function disableButton()
    {
        setIsFormValid(false);
    }

    function enableButton()
    {
        setIsFormValid(true);
    }

    function handleSubmit(model)
    {
        dispatch(authActions.submitLogin(model));
        disableButton();
    }

    return (
        <div className="w-full">
            <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col justify-center w-full"
            >
                <TextFieldFormsy
                    className="mb-16"
                    type="email"
                    name="email"
                    label="Email"
                    validations="isEmail"
                    validationErrors={{
                        isEmail:"This is not a valid email"
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="password"
                    name="password"
                    label="Password"
                    validations={{
                        minLength: 6
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 6'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    name="submit"
                    color="primary"
                    className="w-full mx-auto mt-16 normal-case"
                    aria-label="LOG IN"
                    disabled={!isFormValid}
                    value="legacy"
                    onClick={handleButtonClick}
                >
                    Login
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Button>

            </Formsy>

            

        </div>
    );
}

export default JWTLoginTab;
