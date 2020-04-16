import React, { useRef, useEffect, useState } from 'react';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Card, CardContent, Stepper, Step, StepLabel, Button } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimate } from '@fuse';
import Formsy from 'formsy-react';
import StepConnector from '@material-ui/core/StepConnector';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import { useForm } from '@fuse/hooks';
import _ from '@lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import SelectReactFormsyS_S from '@fuse/components/formsy/SelectReactFormsyS_S';
import { Helmet } from "react-helmet";

/**=============== FOUNRISSEUR SOUS-SECTEURS ======================= */
const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 675,
        maxWidth: 675,
        overflow: 'visible'
    },
    select: {
        zIndex: 999,
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
    sousSecteurs: null
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
        2: <CheckIcon />,
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

function Step3App(props) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const steps = getSteps();
    const user = useSelector(({ auth }) => auth.user);

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    const step3 = useSelector(({ step3App }) => step3App.step3);

    const { form, setForm } = useForm(defaultFormState);

    useEffect(() => {
        dispatch(Actions.getSousSecteurs());
    }, [dispatch]);

    useEffect(() => {
        if (step3.success) {
            if (step3.redirect_success) {
                props.history.push(step3.redirect_success);
            }
        }
    }, [step3.success]);

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit(model) {
        let data =
        {
            sousSecteurs: _.map(model.sousSecteurs, function (value, key) {
                return value.value;
            })
        }
        dispatch(Actions.setStep3(data, user.id, props.history));
    }

    function handleChipChange(value, name) {

        if (!_.some(value, 'value')) {
            setForm(_.set({ ...form }, name, ''));
        }
        else {
            setForm(_.set({ ...form }, name, value));
        }
    }


    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}>
            <Helmet>
                <title>Inscription Fournisseur| Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <div className="flex flex-col items-center justify-center w-full">

                <img className="w-100 m-20" src="assets/images/logos/icon.png" alt="logo" />

                <FuseAnimate animation="transition.expandIn">

                    <Card className={classes.card}>

                        <CardContent >


                            <div >

                                <Stepper alternativeLabel activeStep={2} connector={<ColorlibConnector />}>
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
                                            <SelectReactFormsyS_S

                                                id="sousSecteurs"
                                                name="sousSecteurs"
                                                className={classes.select}
                                                value={

                                                    form.sousSecteurs


                                                }
                                                onChange={(value) => handleChipChange(value, 'sousSecteurs')}
                                                placeholder="Selectionner vos activités"
                                                textFieldProps={{
                                                    label: 'Activités',
                                                    InputLabelProps: {
                                                        shrink: true
                                                    },
                                                    variant: 'outlined'
                                                }}
                                                options={step3.sousSecteurs}
                                                fullWidth
                                                isMulti
                                                required
                                            />
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className="w-full mx-auto mt-16 normal-case"
                                                aria-label="Suivant"
                                                disabled={!isFormValid || step3.loading}
                                                value="legacy"
                                            >
                                                Terminer
                                                {step3.loading && <CircularProgress size={24} className={classes.buttonProgress} />}

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

export default withReducer('step3App', reducer)(Step3App);