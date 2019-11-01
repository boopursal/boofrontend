import React, { useRef, useEffect, useState } from 'react';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { FusePageSimple } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Card, Grid, MenuItem, CardContent, InputAdornment, Icon, TextField, Typography, Stepper, Step, StepLabel, Button } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimate } from '@fuse';
import Formsy from 'formsy-react';
import { TextFieldFormsy, SelectFormsy } from '@fuse';
import SelectReactFormsy from '@fuse/components/formsy/SelectReactFormsy';
import StepConnector from '@material-ui/core/StepConnector';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import DomainIcon from '@material-ui/icons/Domain';
import SettingsIcon from '@material-ui/icons/Settings';
import { useForm } from '@fuse/hooks';
import _ from '@lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 675,
        maxWidth: 675,
    },
    root: {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
        color: theme.palette.primary.contrastText
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
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
const defaultFormState = {
    step2: '',
    ville: '',
    adresse1: '',
    adresse2: '',
    website: '',
    fix: '',
    ice: '',
    description: ''
};
const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <CheckIcon />,
        2: <DomainIcon />,
        3: <SettingsIcon />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

function getSteps() {
    return ['Registrement', 'Information de la société', 'Secteurs d\'activités'];
}

function Step2App(props) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const steps = getSteps();
    const user = useSelector(({auth}) => auth.user);

    const [isFormValid, setIsFormValid] = useState(false);
    const [showIce, setShowIce] = useState(false);
    const formRef = useRef(null);

    const Pays = useSelector(({ step2App }) => step2App.step2.pays);
    const Villes = useSelector(({ step2App }) => step2App.step2.villes);
    const step2 = useSelector(({ step2App }) => step2App.step2);

    const { form, handleChange, setForm } = useForm(defaultFormState);

    useEffect(() => {
        dispatch(Actions.getPays());
    }, [dispatch]);

    useEffect(() => {
        if (step2.error && (step2.error.pays || step2.error.ville || step2.error.adresse1 || step2.error.adresse2 || step2.error.website || step2.error.fix || step2.error.ice || step2.error.description)) {
        {
            formRef.current.updateInputsWithError({
                ...step2.error
            });
        }
        disableButton();
        }
    }, [step2.error]);

    useEffect(() => {
        if (step2.success) {
           if(step2.redirect_success){
               console.log(step2.redirect_success)
                props.history.push(step2.redirect_success);
           }
        }
    }, [step2.success]);

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit(model) {
         dispatch(Actions.setStep2(model,user.id));
    }



    function handleChipChange(value, name) {

        if (name === 'ville') {
            setForm(_.set({ ...form }, name, value));
        }
        else {
            setForm(_.set({ ...form }, name, value));
            if (value.value) {
                dispatch(Actions.getVilles(value.value));
            }

            if (value.label === 'Maroc') {
                setShowIce(true)
            }
            else {
                setShowIce(false)
            }
        }

    }


    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}>

            <div className="flex flex-col items-center justify-center w-full">

                <img className="w-100 m-20" src="assets/images/logos/icon.png" alt="logo" />

                <FuseAnimate animation="transition.expandIn">

                    <Card className={classes.card}>

                        <CardContent >


                            <div >

                                <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
                                    {steps.map(label => (
                                        <Step key={label}>
                                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                                <div>

                                    <div className="w-full">
                                        <Formsy
                                            onValidSubmit={handleSubmit}
                                            onValid={enableButton}
                                            onInvalid={disableButton}
                                            ref={formRef}
                                            className="flex flex-col justify-center w-full"
                                        >

                                            <Grid container spacing={3} className=" min-w-450 max-w-450">


                                                <Grid item xs={12} sm={6}>
                                                    <SelectReactFormsy
                                                        id="pays"
                                                        name="pays"
                                                        value={
                                                            form.pays
                                                        }
                                                        placeholder="Selectionner une Pays"
                                                        textFieldProps={{
                                                            label: 'Pays',
                                                            InputLabelProps: {
                                                                shrink: true
                                                            },
                                                            variant: 'outlined'
                                                        }}

                                                        className="mb-16"
                                                        options={Pays}
                                                        onChange={(value) => handleChipChange(value, 'pays')}
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <SelectReactFormsy
                                                        id="ville"
                                                        name="ville"
                                                        value={
                                                            form.ville
                                                        }
                                                        placeholder="Selectionner une ville"
                                                        textFieldProps={{
                                                            label: 'Ville',
                                                            InputLabelProps: {
                                                                shrink: true
                                                            },
                                                            variant: 'outlined'
                                                        }}
                                                        className="mb-16"
                                                        options={Villes}
                                                        onChange={(value) => handleChipChange(value, 'ville')}
                                                        required
                                                    />
                                                </Grid>


                                            </Grid>

                                            <Grid container spacing={3} >
                                                <Grid item xs={12} sm={6}>
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="adresse1"
                                                        value={form.adresse1}
                                                        onChange={handleChange}
                                                        autoComplete="adresse"
                                                        label="Adresse 1"
                                                        validations={{
                                                            minLength: 10,
                                                        }}
                                                        validationErrors={{
                                                            minLength: 'La longueur minimale de caractère est 10',
                                                        }}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                                                        }}
                                                        variant="outlined"
                                                        required
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="adresse2"
                                                        value={form.adresse2}
                                                        onChange={handleChange}
                                                        autoComplete="adresse"
                                                        label="Adresse 2"
                                                        validations={{
                                                            minLength: 10,
                                                        }}
                                                        validationErrors={{
                                                            minLength: 'La longueur minimale de caractère est 10',
                                                        }}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                                                        }}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={3} >
                                                <Grid item xs={12} sm={6}>
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="website"
                                                        value={form.website}
                                                        onChange={handleChange}
                                                        autoComplete="website"
                                                        label="Site Web"
                                                        validations="isUrl"
                                                        validationErrors={{
                                                            isUrl: 'Exemple : http://www.exemple.com',
                                                        }}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">language</Icon></InputAdornment>
                                                        }}
                                                        variant="outlined"
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="fix"
                                                        value={form.fix}
                                                        onChange={handleChange}
                                                        label="Fix"
                                                        autoComplete="fix"
                                                        validations={{
                                                            minLength: 10,
                                                            maxLength: 13,
                                                        }}
                                                        validationErrors={{
                                                            minLength: 'La longueur minimale de caractère est 10',
                                                            maxLength: 'La longueur maximale de caractère est 13'
                                                        }}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">local_phone</Icon></InputAdornment>
                                                        }}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            </Grid>

                                            {
                                                showIce ?
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="ice"
                                                        value={form.ice}
                                                        onChange={handleChange}
                                                        label="ICE"
                                                        autoComplete="ice"
                                                        validations="isNumeric "
                                                        validationErrors={{
                                                            isNumeric: 'Cette valeur doit être numérique. ',
                                                        }}
                                                        validations={{
                                                            minLength: 15,
                                                            maxLength: 15,
                                                            isNumeric: "isNumeric",
                                                        }}
                                                        validationErrors={{
                                                            minLength: 'La longueur minimale de caractère est 15',
                                                            maxLength: 'La longueur maximale de caractère est 15',
                                                            isNumeric: 'Cette valeur doit être numérique. ',
                                                        }}

                                                        variant="outlined"
                                                        required
                                                    />
                                                    :
                                                    ''
                                            }

                                            <TextFieldFormsy
                                                className="mb-16  w-full"
                                                type="text"
                                                name="description"
                                                value={form.description}
                                                onChange={handleChange}
                                                label="Présentation"
                                                autoComplete="description"
                                                validations={{
                                                    minLength: 10,
                                                }}
                                                validationErrors={{
                                                    minLength: 'La longueur minimale de caractère est 10',
                                                }}

                                                variant="outlined"
                                                multiline
                                                rows="4"

                                            />


                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className="w-full mx-auto mt-16 normal-case"
                                                aria-label="Suivant"
                                                disabled={!isFormValid || step2.loading}
                                                value="legacy"
                                            >
                                                Suivant
                                                {step2.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                                
                                            </Button>

                                        </Formsy>

                                    </div>


                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default withReducer('step2App', reducer)(Step2App);