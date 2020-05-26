import React, { useRef, useEffect, useState } from 'react';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Card, CardContent, Stepper, Step, StepLabel, Button, ListItemText, Popper, Typography, Chip } from '@material-ui/core';
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
import { Helmet } from "react-helmet";
import Autosuggest from 'react-autosuggest';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Highlighter from "react-highlight-words";

/**=============== FOUNRISSEUR SOUS-SECTEURS ======================= */
const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 675,
        maxWidth: 675,
        overflow: 'hidden'
    },
    chips:{
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
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
    container: {
        position: 'relative',
        width: '100%',
    },

    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing(2),
    },

}));
const defaultFormState = {
    categories: null
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
function renderSuggestion(suggestion, { query, isHighlighted }) {
    return (

        <MenuItem selected={isHighlighted} component="div" className="z-999" dense={true}>
            <ListItemText
                className="pl-0 "
                primary={
                    <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[query]}
                        autoEscape={true}
                        textToHighlight={suggestion.name}
                    />
                }
            />
        </MenuItem>

    );

}
function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;
    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}
function Step3App(props) {
    const suggestionsNode = useRef(null);
    const popperNode = useRef(null);
    const searchCategories = useSelector(({ step3App }) => step3App.searchCategories);
    const [categories, setCategories] = React.useState([]);

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
            categories: _.map(categories, function (value, key) {
                return value['@id'];
            })
        }
        dispatch(Actions.setStep3(data, user.id, props.history));
    }

    function handleChangeSearch(event) {
        dispatch(Actions.setGlobalSearchText(event))
    }
    function showSearch() {
        dispatch(Actions.showSearch());
        document.addEventListener("keydown", escFunction, false);
    }

    function escFunction(event) {
        if (event.keyCode === 27) {
            hideSearch();
            dispatch(Actions.cleanUp());
        }

    }

    function hideSearch() {
        dispatch(Actions.hideSearch());
        document.removeEventListener("keydown", escFunction, false);

    }


    function handleSuggestionsFetchRequested({ value, reason }) {
        console.log(reason)
        if (reason === 'input-changed') {
            value && value.trim().length > 1 && dispatch(Actions.loadSuggestions(value));
            // Fake an AJAX call
        }

    }
    function handleSuggestionsClearRequested() {
        //dispatch(Actions.hideSearch());

    }
    const autosuggestProps = {
        renderInputComponent,
        //alwaysRenderSuggestions: true,
        suggestions: searchCategories.suggestions,
        focusInputOnSuggestionClick:false,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        renderSuggestion
    };

    function handleDelete(id) {
        setCategories(_.reject(categories, function (o) { return o.id == id; }))
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



                            <Stepper alternativeLabel activeStep={2} connector={<ColorlibConnector />}>
                                {steps.map(label => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>


                            <div className="w-full">
                                <Formsy
                                    onValidSubmit={handleSubmit}
                                    onValid={enableButton}
                                    onInvalid={disableButton}
                                    ref={formRef}
                                    className="flex flex-col justify-center w-full"
                                >
                                    <div ref={popperNode} >
                                        <Autosuggest
                                            {...autosuggestProps}
                                            getSuggestionValue={suggestion => searchCategories.searchText}
                                            onSuggestionSelected={(event, { suggestion, method }) => {
                                                if (method === "enter") {
                                                    event.preventDefault();
                                                }
                                                !_.find(categories, ['name', suggestion.name]) &&
                                                    setCategories([ suggestion,...categories]);
                                                //setForm(_.set({ ...form }, 'categories', suggestion['@id']))
                                                //hideSearch();
                                                popperNode.current.focus();
                                            }}
                                            required
                                            inputProps={{
                                                classes,
                                                label: 'Activités',
                                                placeholder: "Activité (ex: Rayonnage lourd)",
                                                value: searchCategories.searchText,
                                                variant: "outlined",
                                                name: "categories",
                                                onChange: handleChangeSearch,
                                                onFocus: showSearch,
                                                InputLabelProps: {
                                                    shrink: true,
                                                }

                                            }}
                                            theme={{
                                                container: classes.container,
                                                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                                suggestionsList: classes.suggestionsList,
                                                suggestion: classes.suggestion,
                                            }}
                                            renderSuggestionsContainer={options => (
                                                <Popper
                                                    anchorEl={popperNode.current}
                                                    open={Boolean(options.children) || searchCategories.noSuggestions || searchCategories.loading}
                                                    popperOptions={{ positionFixed: true }}
                                                    className="z-9999 mb-8"
                                                >
                                                    <div ref={suggestionsNode}>
                                                        <Paper
                                                            elevation={1}
                                                            square
                                                            {...options.containerProps}
                                                            style={{ width: popperNode.current ? popperNode.current.clientWidth : null }}
                                                        >
                                                            {options.children}
                                                            {searchCategories.noSuggestions && (
                                                                <Typography className="px-16 py-12">
                                                                    Aucun résultat..
                                                                </Typography>
                                                            )}
                                                            {searchCategories.loading && (
                                                                <div className="px-16 py-12 text-center">
                                                                    <CircularProgress color="secondary" /> <br /> Chargement ...
                                                                </div>
                                                            )}
                                                        </Paper>
                                                    </div>
                                                </Popper>
                                            )}
                                        />
                                    </div>
                                    <div className={clsx(classes.chips)}>
                                        {
                                            categories && categories.length > 0 &&
                                            categories.map((item, index) => (
                                                <Chip
                                                    key={index}
                                                    label={item.name}
                                                    onDelete={() => handleDelete(item.id)}
                                                    className="mt-8 mr-8"
                                                />
                                            ))


                                        }
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="w-full mx-auto mt-16 normal-case"
                                        aria-label="Suivant"
                                        disabled={ step3.loading || categories.length === 0}
                                        value="legacy"
                                    >
                                        Terminer
                                                {step3.loading && <CircularProgress size={24} className={classes.buttonProgress} />}

                                    </Button>

                                </Formsy>

                            </div>



                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default withReducer('step3App', reducer)(Step3App);