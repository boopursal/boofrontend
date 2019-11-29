import React, { useRef, useEffect, useState } from 'react';
import { Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography, LinearProgress, MenuItem, Grid, CircularProgress, IconButton, Tooltip, SnackbarContent, Chip } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
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
import ErrorIcon from '@material-ui/icons/Error';
import ReactTable from "react-table";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },


    demandeImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: red[400],
        opacity: 0
    },
    demandeImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
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
    },

    error: {
        backgroundColor: theme.palette.error.dark,
    },

    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    margin: {
        margin: theme.spacing(1),
    },

    chip: {
        marginLeft: theme.spacing(1),
        background: '#ef5350',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px'

    },
    chip2: {
        marginLeft: theme.spacing(1),
        background: '#4caf50',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px'
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

        if (demande.attachement) {
            setForm(_.set({ ...form }, 'attachements', [
                demande.attachement,
                ...form.attachements
            ]));
            demande.attachement = null;
        }

    }, [demande.attachement]);

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
            demande.error = null;
        }
    }, [demande.error]);



    useEffect(() => {
        function updateDemandeState() {
            const params = props.match.params;
            const { demandeId } = params;
            dispatch(Actions.getDemande(demandeId));
        }

        updateDemandeState();
    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (
            (demande.data && !form) ||
            (demande.data && form && demande.data.id !== form.id)
        ) {
            setForm({ ...demande.data });
        }
    }, [form, demande.data, setForm]);

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/demandes_prix" color="inherit">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Retour
                                </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">

                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.reference ? 'RFQ-' + form.reference : 'Nouvelle Demande'}
                                                {
                                                    moment(form.dateExpiration) >= moment()
                                                        ?
                                                        form.statut === 0
                                                            ?
                                                            <Chip className={classes.chipOrange} label="En attente" />
                                                            :
                                                            (form.statut === 1 ? <Chip className={classes.chip2} label="En cours" />
                                                                :
                                                                <Chip className={classes.chip} label="Refusé" />
                                                            )
                                                        :
                                                        <Chip className={classes.chip} label="Expiré" />

                                                }
                                                {
                                                    moment(form.dateExpiration) >= moment()
                                                        ?

                                                        <Chip className={classes.chip2} label={moment(form.dateExpiration).diff(moment(), 'days') === 0 ? '+ ' + moment(form.dateExpiration).diff(moment(), 'hours') + ' h' : '+ ' + moment(form.dateExpiration).diff(moment(), 'days') + ' j'} />
                                                        :
                                                        <Chip className={classes.chip} label={moment(form.dateExpiration).diff(moment(), 'days') === 0 ? '- ' + moment(form.dateExpiration).diff(moment(), 'hours') + ' h' : '- ' + moment(form.dateExpiration).diff(moment(), 'days') + ' j'} />

                                                }
                                            </Typography>
                                        </FuseAnimate>
                                       
                                    </div>
                                </div>
                            </div>

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
                        <Tab className="h-64 normal-case"
                            label={
                                form && form.attachements.length > 0
                                    ? "Pièce(s) jointe(s) (" + form.attachements.length + ")"
                                    : "Pièce(s) jointe(s)"}

                        />


                    </Tabs>

            }
            content={
                !demande.loading ?

                    form && (
                        <div className="p-10  sm:p-24 max-w-2xl">
                            {tabValue === 0 &&
                                (

                                    <Formsy
                                        className="flex flex-col ">
                                        <Grid container spacing={3} >

                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    className="mb-24"
                                                    label="Référence"
                                                    id="reference"
                                                    name="reference"
                                                    value={form.reference}
                                                    InputProps={{
                                                        readOnly: true,
                                                        startAdornment: <InputAdornment position="start">RFQ-</InputAdornment>,
                                                    }}
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={4}>

                                                <TextFieldFormsy
                                                    className="mb-24"
                                                    label="Date d'éxpiration"
                                                    id="dateExpiration"
                                                    name="dateExpiration"
                                                    value={
                                                        moment(form.dateExpiration).format('DD/MM/YYYY HH:mm')
                                                    }
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />

                                            </Grid>
                                            <Grid item xs={12} sm={4}>

                                                <TextFieldFormsy
                                                    className="mb-24"
                                                    label="Date de création"
                                                    id="dateCreated"
                                                    name="dateCreated"
                                                    value={moment(form.created).format('DD/MM/YYYY HH:mm')}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />

                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={3} >

                                            <Grid item xs={12} sm={8}>
                                                <TextFieldFormsy
                                                    className="mb-24"
                                                    label="Sous-Secteurs"
                                                    id="sousSecteurs"
                                                    name="sousSecteurs"
                                                    value={_.join(_.map(form.sousSecteurs, 'name'), ', ')}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={4}>

                                                <TextFieldFormsy
                                                    className="mb-24"
                                                    label="Budget"
                                                    id="budget"
                                                    name="budget"
                                                    value={
                                                        parseFloat(form.budget).toLocaleString(
                                                            undefined, // leave undefined to use the browser's locale,
                                                            // or use a string like 'en-US' to override it.
                                                            { minimumFractionDigits: 2 }
                                                        )+ ' Dhs ' 
                                                        }
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />

                                            </Grid>

                                        </Grid>



                                        <TextFieldFormsy
                                            className="mb-16  w-full"
                                            type="text"
                                            name="description"
                                            value={form.description}
                                            label="Description"
                                            multiline
                                            rows="4"
                                            InputProps={{
                                                readOnly: true,
                                            }}

                                        />

                                    </Formsy>
                                )}
                            {tabValue === 1 && (
                                <div>

                                    <div className="flex justify-center sm:justify-start flex-wrap">



                                        {form.attachements.map(media => (
                                            <div
                                                className={
                                                    clsx(
                                                        classes.demandeImageItem,
                                                        "flex items-center cursor-pointer justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden  shadow-1 hover:shadow-5")
                                                }
                                                key={media.id}
                                                onClick={() => window.open(FuseUtils.getUrl() + media.url, "_blank")}
                                            >

                                                {_.split(media.type, '/', 1)[0] === 'image' ?
                                                    <img className="max-w-none w-auto h-full"
                                                        src={FuseUtils.getUrl() + media.url}
                                                        alt="demande" />
                                                    :
                                                    <Icon color="secondary" style={{ fontSize: 80 }}>insert_drive_file</Icon>
                                                }

                                            </div>
                                        ))}
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
