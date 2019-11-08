import React, { useRef, useEffect, useState } from 'react';
import { Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography, LinearProgress, MenuItem, Grid, CircularProgress } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FusePageCarded, FuseUtils, TextFieldFormsy, DatePickerFormsy, SelectReactFormsyS_S, CheckboxFormsy, SelectFormsy } from '@fuse';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import Formsy from 'formsy-react';
import moment from 'moment';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    demandeImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    demandeImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    select: {
        zIndex: 999,
    },
    demandeImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $demandeImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $demandeImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $demandeImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));
moment.defaultFormat = "DD/MM/YYYY HH:mm";
function Demande(props) {

    const dispatch = useDispatch();
    const demande = useSelector(({ demandesApp }) => demandesApp.demande);


    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);
    const { form, handleChange, setForm } = useForm(null);

    const classes = useStyles(props);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        dispatch(Actions.getSousSecteurs());
    }, [dispatch]);

    useEffect(() => {
        if (demande.error && (demande.error.reference || demande.error.description || demande.error.descriptionEn || demande.error.descriptionEs || demande.error.dateExpiration || demande.error.isPublic || demande.error.isAnonyme || demande.error.sousSecteurs || demande.error.langueP)) {
        {
            formRef.current.updateInputsWithError({
                ...demande.error
            });
        }
        disableButton();
        }
    }, [demande.error]);

    useEffect(() => {
        if (demande.success) {
                props.history.push('/demandes');
        }
    }, [demande.success]);

    useEffect(() => {
        function updateDemandeState() {
            const params = props.match.params;
            const { demandeId } = params;

            if (demandeId === 'new') {
                dispatch(Actions.newDemande());
            }
            else {
                dispatch(Actions.getDemande(demandeId));
            }
        }

        updateDemandeState();
    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (
            (demande.data && !form) ||
            (demande.data && form && demande.data.id !== form.id)
        ) {
            setForm(demande.data);
            if (demande.data.sousSecteurs) {
                let sousSecteurs = demande.data.sousSecteurs.map(item => ({
                    value: item['@id'],
                    label: item.name
                }));
                setForm(_.set({ ...demande.data }, 'sousSecteurs', sousSecteurs));
            }

        }
    }, [form, demande.data, setForm]);

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }

    function handleUploadChange(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = () => {
            setForm(_.set({ ...form }, `images`,
                [
                    {
                        'id': FuseUtils.generateGUID(),
                        'url': `data:${file.type};base64,${btoa(reader.result)}`,
                        'type': 'image'
                    },
                    ...form.images
                ]
            ));
        };

        reader.onerror = function () {
            console.log("error on load image");
        };
    }

    function handleDateChange(value, name) {
        //setForm(_.set({...form}, name, value.map(item => item.value)));
        setForm(_.set({ ...form }, name, moment(value).format('YYYY-MM-DDTHH:mm:ssZ')));
    }

    function handleLangueChange(value, name) {
        setForm(_.set({ ...form }, name, value.target.value));
        console.log(value)
        console.log(name)
    }

    function handleChipChange(value, name) {

        if (!_.some(value, 'value')) {
            setForm(_.set({ ...form }, name, ''));
        }
        else {
            setForm(_.set({ ...form }, name, value));
        }
    }

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit(model) {
        //event.preventDefault();
        console.log(model)
        model.sousSecteurs =  _.map(model.sousSecteurs, function(value, key) {
            return value.value;
         });
        const params = props.match.params;
        const { demandeId } = params;

        if (demandeId === 'new') {
            dispatch(Actions.saveDemande(model));
        }
        else {
            dispatch(Actions.getDemande(demandeId));
        }
    }

    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                !demande.loading
                    ?

                    form && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/demandes" color="inherit">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Retour
                                </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">

                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.reference ? form.reference : 'Nouvelle Demande'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Demande Detail</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!isFormValid || demande.loading}
                                    onClick={handleSubmit}
                                    type='submit'
                                >
                                    Save
                            </Button>
                            </FuseAnimate>
                        </div>
                    )
                    :
                    ''
            }
            contentToolbar={
                demande.loading ?
                    <div className={classes.root}>
                        <LinearProgress color="secondary" />
                    </div>
                    :
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{ root: "w-full h-64" }}
                    >
                        <Tab className="h-64 normal-case" label="Basic Info" />
                        <Tab className="h-64 normal-case" label="Pièce(s) jointe(s)" />

                    </Tabs>

            }
            content={
                !demande.loading ?

                    form && (
                        <div className="p-10  sm:p-24 max-w-2xl">
                            {tabValue === 0 &&
                                (
                                    <Formsy
                                        onValidSubmit={handleSubmit}
                                        onValid={enableButton}
                                        onInvalid={disableButton}
                                        ref={formRef}
                                        className="flex pt-10 flex-col ">
                                        <div className="flex">

                                            <TextFieldFormsy
                                                className="mb-24"
                                                label="Référence"
                                                autoFocus
                                                id="reference"
                                                name="reference"
                                                value={form.reference}
                                                onChange={handleChange}
                                                variant="outlined"
                                                validations={{
                                                    minLength: 4
                                                }}
                                                validationErrors={{
                                                    minLength: 'Min character length is 4'
                                                }}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">RFQ-</InputAdornment>,
                                                }}
                                                required
                                                fullWidth
                                            />
                                        </div>
                                        <div className="flex">

                                            <DatePickerFormsy
                                                className="mb-24"
                                                label="Date d'éxpiration"
                                                id="dateExpiration"
                                                name="dateExpiration"
                                                value={form.dateExpiration}
                                                onChange={(value) => handleDateChange(value, 'dateExpiration')}
                                                variant="outlined"
                                                required
                                                fullWidth
                                            />
                                        </div>
                                        <SelectReactFormsyS_S
                                            className="mb-24 z-9999"
                                            id="sousSecteurs"
                                            name="sousSecteurs"
                                            value={
                                                form.sousSecteurs
                                            }
                                            onChange={(value) => handleChipChange(value, 'sousSecteurs')}
                                            placeholder="Selectionner multiple Sous-secteurs"
                                            textFieldProps={{
                                                label: 'Sous-secteurs',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant: 'outlined'
                                            }}
                                            options={demande.sousSecteurs}
                                            fullWidth
                                            isMulti
                                            required
                                        />

                                        <Grid container spacing={3} >
                                            <Grid item xs={12} sm={4}>
                                                <SelectFormsy
                                                    className="mb-24 block"
                                                    name="langueP"
                                                    label="Choisissez la langue de la demande"
                                                    value={form.langueP ? form.langueP : 'fr'}
                                                    variant="outlined"
                                                    onChange={(value) => handleLangueChange(value, 'langueP')}
                                                    fullWidth
                                                >
                                                    <MenuItem value="fr">
                                                        <em>Français</em>
                                                    </MenuItem>
                                                    <MenuItem value="es">Espagne</MenuItem>
                                                    <MenuItem value="en">Anglais</MenuItem>
                                                    <MenuItem value="ts">Toutes les langues</MenuItem>
                                                </SelectFormsy>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <CheckboxFormsy
                                                    className="mb-10"
                                                    name="isPublic"
                                                    value={form.isPublic}
                                                    label="Mettre en ligne après validation"
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={4}>
                                                <CheckboxFormsy
                                                    className="mb-10"
                                                    name="isAnonyme"
                                                    value={form.isAnonyme}
                                                    label="Mettre la demande anonyme"
                                                />
                                            </Grid>
                                        </Grid>

                                        {
                                            form.langueP === 'ts' ?
                                                <>
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="description"
                                                        value={form.description}
                                                        onChange={handleChange}
                                                        label="Description (Français)"
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
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="descriptionEn"
                                                        value={form.descriptionEn}
                                                        onChange={handleChange}
                                                        label="Description (Anglais)"
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
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="descriptionEs"
                                                        value={form.descriptionEs}
                                                        onChange={handleChange}
                                                        label="Description (Espagne)"
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
                                                </>
                                                :
                                                (
                                                    form.langueP === 'es'
                                                    ? 
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="descriptionEs"
                                                        value={form.descriptionEs}
                                                        onChange={handleChange}
                                                        label="Description (Espagne)"
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
                                                    : 
                                                    form.langueP === 'en' 
                                                    ?
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="descriptionEn"
                                                        value={form.descriptionEn}
                                                        onChange={handleChange}
                                                        label="Description (Anglais)"
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
                                                    :
                                                    <TextFieldFormsy
                                                        className="mb-16  w-full"
                                                        type="text"
                                                        name="description"
                                                        value={form.description}
                                                        onChange={handleChange}
                                                        label="Description (Français)"
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
                                                )


                                        }

                                         <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className="w-200 pr-auto mt-16 normal-case"
                                                aria-label="Suivant"
                                                disabled={!isFormValid || demande.loading}
                                                value="legacy"
                                            >
                                                Sauvegarder
                                                {demande.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                                
                                            </Button>

                                    </Formsy>
                                )}
                            {tabValue === 1 && (
                                <div>
                                    <input
                                        accept="image/*"
                                        className="hidden"
                                        id="button-file"
                                        type="file"
                                        onChange={handleUploadChange}
                                    />
                                    <div className="flex justify-center sm:justify-start flex-wrap">
                                        <label
                                            htmlFor="button-file"
                                            className={
                                                clsx(
                                                    classes.demandeImageUpload,
                                                    "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                                                )}
                                        >
                                            <Icon fontSize="large" color="action">cloud_upload</Icon>
                                        </label>

                                    </div>
                                </div>
                            )}

                        </div>
                    )
                    : ''
            }
            innerScroll
        />
    )
}

export default withReducer('demandesApp', reducer)(Demande);
