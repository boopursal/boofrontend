import React, { useEffect, useRef, useState } from 'react';
import { Button, InputAdornment, Icon, Grid, MenuItem } from '@material-ui/core';
import { TextFieldFormsy, SelectFormsy } from '@fuse';
import Formsy from 'formsy-react';
import * as authActions from 'app/auth/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

function FournisseurTab(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const register = useSelector(({ auth }) => auth.register);

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        if (register.error && (register.error.civilite || register.error.firstName || register.error.lastName || register.error.societe || register.error.phone || register.error.email || register.error.password || register.error.confirmpassword)) {
            formRef.current.updateInputsWithError({
                ...register.error
            });
            disableButton();
        }
    }, [register.error]);

    useEffect(() => {
        if (register.success) {
            props.history.push('/mail-confirm');
        }
    }, [register.success]);

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit(model) {
        dispatch(authActions.submitRegisterFournisseur(model));
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
                <Grid container spacing={3}>

                    <Grid item xs={12} sm={2}>
                        <SelectFormsy
                            className="mb-16"
                            name="civilite"
                            label="Civilité"
                            value="M."
                            variant="outlined"
                            required

                        >

                            <MenuItem value="M.">M.</MenuItem>
                            <MenuItem value="Mme">Mme</MenuItem>
                            <MenuItem value="Mlle">Mlle</MenuItem>
                        </SelectFormsy>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextFieldFormsy
                            className="mb-16"
                            type="text"
                            name="lastName"
                            label="Nom"
                            validations={{
                                minLength: 4
                            }}
                            validationErrors={{
                                minLength: 'La longueur minimale de caractère est 4'
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                            }}
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextFieldFormsy
                            className="mb-16"
                            type="text"
                            name="firstName"
                            label="Prénom"
                            validations={{
                                minLength: 4
                            }}
                            validationErrors={{
                                minLength: 'La longueur minimale de caractère est 4'
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                            }}
                            variant="outlined"
                            required
                        />
                    </Grid>

                </Grid>
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="societe"
                    label="Raison sociale"
                    validations={{
                        minLength: 3,
                    }}
                    validationErrors={{
                        minLength: 'La longueur minimale de caractère est 3',
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">work_outline</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="email"
                    label="Email"
                    validations="isEmail"
                    validationErrors={{
                        isEmail: 'Please enter a valid email'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="phone"
                    label="Téléphone"
                    validations={{
                        minLength: 10,
                        maxLength: 13,
                    }}
                    validationErrors={{
                        minLength: 'La longueur minimale de caractère est 10',
                        maxLength: 'La longueur maximale de caractère est 13'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">phone</Icon></InputAdornment>
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

                <TextFieldFormsy
                    className="mb-16"
                    type="password"
                    name="confirmpassword"
                    label="Confirm Password"
                    validations="equalsField:password"
                    validationErrors={{
                        equalsField: 'Passwords do not match'
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
                    color="primary"
                    className="w-full mx-auto mt-16 normal-case"
                    aria-label="REGISTER"
                    disabled={!isFormValid || register.loading}
                    value="legacy"
                >
                    Register
                    {register.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Button>

            </Formsy>

        </div>
    );
}

export default FournisseurTab;
