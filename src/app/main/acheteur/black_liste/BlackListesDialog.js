import React, { useEffect, useCallback, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, DialogTitle, DialogContentText } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { TextFieldFormsy, CheckboxFormsy } from '@fuse';
import Formsy from 'formsy-react';
import _ from '@lodash';
import Autosuggest from 'react-autosuggest';
import agent from "agent";
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const defaultFormState = {
    raison: '',
    fournisseur: "",
};

const useStyles = makeStyles(theme => ({
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
        width: '100%',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,

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

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.societe, query);
    const parts = parse(suggestion.societe, matches);
    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map(part => (
                    <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
                        {part.text}
                    </span>
                ))}
            </div>
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
            required

            {...other}
        />
    );
}
function BlackListesDialog(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const BlackListesDialog = useSelector(({ blackListesApp }) => blackListesApp.blackListes.blackListesDialog);
    const [fournisseur, setFournisseur] = React.useState({ societe: '' });
    const [suggestions, setSuggestions] = React.useState([]);
    const user = useSelector(({ auth }) => auth.user);
    const { form, handleChange, setForm } = useForm(defaultFormState);


    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);
    const autosuggestProps = {
        renderInputComponent,
        renderSuggestion,
    };

    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if (BlackListesDialog.type === 'edit' && BlackListesDialog.data) {
                setForm({ ...BlackListesDialog.data });
                setFournisseur(BlackListesDialog.data.fournisseur);
                setForm(_.set({ ...BlackListesDialog.data }, 'fournisseur', BlackListesDialog.data.fournisseur['@id']));
            }

            /**
             * Dialog type: 'new'
             */
            if (BlackListesDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...BlackListesDialog.data,
                });
            }
        },
        [BlackListesDialog.data, BlackListesDialog.type, setForm],
    );

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (BlackListesDialog.props.open) {
            initDialog();
        }

    }, [BlackListesDialog.props.open, initDialog]);



    function closeComposeDialog() {
        BlackListesDialog.type === 'edit' ? dispatch(Actions.closeEditBlackListesDialog()) : dispatch(Actions.closeNewBlackListesDialog());
    }


    function handleCheckBoxChange(e,name) {

        setForm(_.set({ ...form }, name, e.target.checked));
    }
    function handleSubmit(event) {
        //event.preventDefault();



        if (BlackListesDialog.type === 'new') {
            dispatch(Actions.addBlackListe(form, user.id));
            setFournisseur({ societe: '' });
        }
        else {
            dispatch(Actions.updateBlackListe(form, user.id));
            setFournisseur({ societe: '' });
        }
        closeComposeDialog();
    }

    function handleRemove() {

        dispatch(Actions.removeBlackListe(form, user.id));
        dispatch(Actions.closeDialog())
        closeComposeDialog();
    }


    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }


    return (
        <Dialog
            classes={{
                paper: "m-24 overflow-visible"
            }}
            {...BlackListesDialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {BlackListesDialog.type === 'new' ? 'Nouveau BlackListe' : 'Edit BlackListe'}
                    </Typography>
                </Toolbar>

            </AppBar>
            <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col overflow-visible">
                <DialogContent classes={{ root: "p-24 overflow-visible" }}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">work</Icon>
                        </div>
                        <Autosuggest

                            suggestions={suggestions}
                            {...autosuggestProps}
                            onSuggestionsFetchRequested={async ({ value }) => {
                                if (!value) {
                                    setSuggestions([]);
                                    return;
                                }
                                try {
                                    const response = await agent.get(
                                        `/api/fournisseurs?societe=${value}&del=false&isactif=true&props[]=id&props[]=societe`
                                    );

                                    setSuggestions(
                                        response.data['hydra:member']
                                    );
                                } catch (e) {
                                    setSuggestions([]);

                                }
                            }}
                            onSuggestionsClearRequested={() => {
                                setSuggestions([]);

                            }}
                            getSuggestionValue={suggestion => suggestion.societe}

                            onSuggestionSelected={(event, { suggestion, method }) => {
                                if (method === "enter") {
                                    event.preventDefault();
                                }
                                setFournisseur(suggestion);
                                setForm(_.set({ ...form }, 'fournisseur', suggestion['@id']))

                            }}
                            required
                            inputProps={{
                                classes,
                                label: 'Fournisseur',
                                placeholder: "Cherchez avec le nom du société",
                                value: fournisseur.societe,
                                variant: "outlined",
                                name: "fournisseur",
                                onChange: (_event, { newValue }) => {
                                    setFournisseur({ societe: newValue });
                                },
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
                                <Paper {...options.containerProps} square>
                                    {options.children}
                                </Paper>
                            )}
                        />

                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">chat</Icon>
                        </div>

                        <TextFieldFormsy
                            className="mb-24 mt-24"
                            label="Raison"
                            autoFocus
                            id="raison"
                            name="raison"
                            value={form.raison}
                            onChange={handleChange}
                            variant="outlined"
                            validations={{
                                minLength: 6
                            }}
                            validationErrors={{
                                minLength: 'Min character length is 6'
                            }}
                            required
                            multiline
                            rows="4"
                            fullWidth
                        />
                    </div>
                    {
                        BlackListesDialog.type === 'edit' ?
                            <div className="flex">
                                <div className="min-w-48 ">
                                </div>
                                <CheckboxFormsy
                                    className="mb-24 "
                                    name="etat"
                                    value={form.etat}
                                    label="Blacklister"
                                    onChange={(e) => handleCheckBoxChange(e, 'etat')}
                                    fullWidth
                                />
                            </div>
                            : ''
                    }


                </DialogContent>

                {BlackListesDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!isFormValid || !fournisseur['@id']}
                        >
                            Ajouter
                        </Button>
                    </DialogActions>
                ) : (
                        <DialogActions className="justify-between pl-16">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!isFormValid || !fournisseur['@id']}
                            >
                                Modifier
                        </Button>
                            <IconButton
                                onClick={() => dispatch(Actions.openDialog({
                                    children: (
                                        <React.Fragment>
                                            <DialogTitle id="alert-dialog-title">Suppression</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Voulez vous vraiment supprimer cet enregistrement ?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => dispatch(Actions.closeDialog())} color="primary">
                                                    Non
                                                </Button>
                                                <Button onClick={handleRemove} color="primary" autoFocus>
                                                    Oui
                                                </Button>

                                            </DialogActions>
                                        </React.Fragment>
                                    )
                                }))}


                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        </DialogActions>
                    )}
            </Formsy>
        </Dialog>
    );
}

export default BlackListesDialog;
