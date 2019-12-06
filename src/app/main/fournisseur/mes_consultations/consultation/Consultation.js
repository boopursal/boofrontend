import React, { useEffect, useState } from 'react';
import { Button, Tab, Tabs, InputAdornment, Icon, Typography, LinearProgress, Grid, Tooltip, Divider } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/styles';
import { FuseAnimate, FusePageCarded, FuseUtils, TextFieldFormsy } from '@fuse';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import Formsy from 'formsy-react';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';

const LightTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

const useStyles = makeStyles(theme => ({

    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },

    consultationImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: red[400],
        opacity: 0
    },

    consultationImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },

    consultationImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $consultationImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $consultationImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $consultationImageFeaturedStar': {
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
    },
    chip3: {
        margin: theme.spacing(1),
        background: 'green',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px'

    },
}));
moment.defaultFormat = "DD/MM/YYYY HH:mm";
function Consultation(props) {

    const dispatch = useDispatch();
    const consultation = useSelector(({ consultationsApp }) => consultationsApp.consultation);

    const user = useSelector(({ auth }) => auth.user);

    const classes = useStyles(props);
    const [tabValue, setTabValue] = useState(0);


    useEffect(() => {
        const params = props.match.params;
        const { consultationId } = params;
        dispatch(Actions.getConsultation(consultationId));
        return ()=>{
            dispatch(Actions.cleanUp())
        }

    }, [dispatch, props.match.params]);



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
                !consultation.loading
                    ?

                    consultation.data && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/consultations" color="inherit">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Retour
                                </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">

                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <div className="text-16 sm:text-20 truncate">
                                                {consultation.data.demande.reference ? 'RFQ-' + consultation.data.demande.reference : ''}
                                                {
                                                    moment(consultation.data.demande.dateExpiration) >= moment()
                                                        ?
                                                        consultation.data.demande.statut === 0
                                                            ?
                                                            <Chip className={classes.chipOrange} label="En attente" />
                                                            :
                                                            (consultation.data.demande.statut === 1 ? <Chip className={classes.chip2} label="En cours" />
                                                                :
                                                                <Chip className={classes.chip} label="Refusé" />
                                                            )
                                                        :
                                                        <Chip className={classes.chip} label="Expiré" />

                                                }
                                                {
                                                    moment(consultation.data.demande.dateExpiration) >= moment()
                                                        ?

                                                        <Chip className={classes.chip2} label={moment(consultation.data.demande.dateExpiration).diff(moment(), 'days') === 0 ? moment(consultation.data.demande.dateExpiration).diff(moment(), 'hours') + ' h' : moment(consultation.data.demande.dateExpiration).diff(moment(), 'days') + ' j'} />
                                                        :
                                                        <Chip className={classes.chip} label={moment(consultation.data.demande.dateExpiration).diff(moment(), 'days') === 0 ? moment(consultation.data.demande.dateExpiration).diff(moment(), 'hours') + ' h' : moment(consultation.data.demande.dateExpiration).diff(moment(), 'days') + ' j'} />

                                                }
                                            </div>
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
                consultation.loading ?
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
                                consultation.data && consultation.data.demande.attachements.length > 0
                                    ? "Pièce(s) jointe(s) (" + consultation.data.demande.attachements.length + ")"
                                    : "Pièce(s) jointe(s)"}

                        />

                        {
                            consultation.data ?
                            <Tab className="h-64 normal-case text-orange font-bold" label="Profil Acheteur" />
                            :
                            ''
                        }


                    </Tabs>

            }
            content={
                !consultation.loading ?

                    consultation.data && (
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
                                                    value={consultation.data.demande.reference}
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
                                                        moment(consultation.data.demande.dateExpiration).format('DD/MM/YYYY HH:mm')
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
                                                    value={moment(consultation.data.demande.created).format('DD/MM/YYYY HH:mm')}
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
                                                    value={_.join(_.map(consultation.data.demande.sousSecteurs, 'name'), ', ')}
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
                                                        parseFloat(consultation.data.demande.budget).toLocaleString(
                                                            undefined, // leave undefined to use the browser's locale,
                                                            // or use a string like 'en-US' to override it.
                                                            { minimumFractionDigits: 2 }
                                                        ) + ' Dhs '
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
                                            value={consultation.data.demande.description}
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



                                        {consultation.data.demande.attachements.length>0 ?
                                        consultation.data.demande.attachements.map(media => (
                                            <div
                                                className={
                                                    clsx(
                                                        classes.consultationImageItem,
                                                        "flex items-center cursor-pointer justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden  shadow-1 hover:shadow-5")
                                                }
                                                key={media.id}
                                                onClick={() => window.open(FuseUtils.getUrl() + media.url, "_blank")}
                                            >

                                                {_.split(media.type, '/', 1)[0] === 'image' ?
                                                    <img className="max-w-none w-auto h-full"
                                                        src={FuseUtils.getUrl() + media.url}
                                                        alt="consultation" />
                                                    :
                                                    <Icon color="secondary" style={{ fontSize: 80 }}>insert_drive_file</Icon>
                                                }

                                            </div>
                                        ))
                                    :'Aucune pièce jointe attaché a cette consultation'
                                    }
                                    </div>

                                </div>
                            )}
                            {tabValue === 2 && (
                                consultation.data ? (

                                    <Formsy

                                        className="flex flex-col">

                                        <Grid container spacing={3} className="mb-5">

                                            <Grid item xs={12} sm={4}>
                                                <div className="flex">
                                                    <TextFieldFormsy
                                                        className=""
                                                        type="text"
                                                        name="fullname"
                                                        value={consultation.data.demande.acheteur.civilite + ' ' + consultation.data.demande.acheteur.firstName + ' ' + consultation.data.demande.acheteur.lastName}
                                                        label="Nom complet"
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                        fullWidth

                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <div className="flex">
                                                    <TextFieldFormsy
                                                        className=""
                                                        name="email"
                                                        value={consultation.data.demande.acheteur.email}
                                                        label="Email"
                                                        fullWidth
                                                        InputProps={{
                                                            readOnly: true,
                                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>

                                                        }}

                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    className=""
                                                    type="text"
                                                    name="phonep"
                                                    id="phonep"
                                                    value={consultation.data.demande.acheteur.phone}
                                                    label="Téléphone"
                                                    InputProps={{
                                                        readOnly: true,
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">local_phone</Icon></InputAdornment>
                                                    }}
                                                    fullWidth
                                                />

                                            </Grid>

                                        </Grid>
                                        <Divider />
                                        <Grid container spacing={3} className="mb-5">

                                            <Grid item xs={12} sm={8}>
                                                <div className="flex">

                                                    <TextFieldFormsy
                                                        className="mt-20"
                                                        label="Raison sociale"
                                                        id="societe"
                                                        name="societe"
                                                        value={consultation.data.demande.acheteur.societe}
                                                        fullWidth
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                    />
                                                </div>


                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <div className="flex">
                                                    <TextFieldFormsy
                                                        className="mt-20"
                                                        name="fix"
                                                        value={consultation.data.demande.acheteur.fix}
                                                        label="Fix"
                                                        InputProps={{
                                                            readOnly: true,
                                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">local_phone</Icon></InputAdornment>
                                                        }}
                                                        fullWidth
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={8}>


                                                <TextFieldFormsy
                                                    id="secteur"
                                                    className=""
                                                    name="secteur"
                                                    label="Secteur"
                                                    value={consultation.data.demande.acheteur.secteur ? consultation.data.demande.acheteur.secteur.name : ''}
                                                    fullWidth
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />


                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <div className="flex">
                                                    <TextFieldFormsy
                                                        id="website"
                                                        className=""
                                                        type="text"
                                                        name="website"
                                                        value={consultation.data.demande.acheteur.website}
                                                        label="Site Web"
                                                        InputProps={{
                                                            readOnly: true,
                                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">language</Icon></InputAdornment>
                                                        }}
                                                        fullWidth
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <div className="flex">
                                                    {
                                                        consultation.data.demande.acheteur.ice ?
                                                            <TextFieldFormsy
                                                                className=""
                                                                type="text"
                                                                name="ice"
                                                                id="ice"
                                                                value={consultation.data.demande.acheteur.ice}
                                                                label="ICE"
                                                                fullWidth
                                                                InputProps={{
                                                                    readOnly: true,
                                                                }}
                                                            />
                                                            :
                                                            ''
                                                    }

                                                </div>

                                            </Grid>


                                        </Grid>
                                        <Divider />


                                        <Grid container spacing={3} className="mb-5">

                                            <Grid item xs={12} sm={8}>
                                                <div className="flex">

                                                    <TextFieldFormsy
                                                        className="mt-20"
                                                        type="text"
                                                        name="adresse1"
                                                        id="adresse1"
                                                        value={consultation.data.demande.acheteur.adresse1}
                                                        label="Adresse 1"
                                                        InputProps={{
                                                            readOnly: true,
                                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                                                        }}
                                                        fullWidth

                                                    />
                                                </div>

                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    className="mt-20"
                                                    type="text"
                                                    name="pays"
                                                    id="pays"
                                                    value={consultation.data.demande.acheteur.pays ? consultation.data.demande.acheteur.pays.name : ''}
                                                    label="Pays"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />

                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <div className="flex">
                                                    <TextFieldFormsy
                                                        className=""
                                                        type="text"
                                                        name="adresse2"
                                                        value={consultation.data.demande.acheteur.adresse2}
                                                        label="Adresse 2"
                                                        InputProps={{
                                                            readOnly: true,
                                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                                                        }}
                                                        fullWidth

                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <div className="flex">
                                                    <TextFieldFormsy
                                                        className=""
                                                        name="codepostal"
                                                        value={String(consultation.data.demande.acheteur.codepostal)}
                                                        label="Code Postal"
                                                        fullWidth
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}

                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    className=""
                                                    type="text"
                                                    name="ville"
                                                    id="ville"
                                                    value={consultation.data.demande.acheteur.ville ? consultation.data.demande.acheteur.ville.name : ''}
                                                    label="Ville"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />

                                            </Grid>

                                        </Grid>
                                        <Divider />

                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={12}>

                                                <TextFieldFormsy
                                                    className="mb-5 mt-20  w-full"
                                                    type="text"
                                                    name="description"
                                                    value={consultation.data.demande.acheteur.description}
                                                    label="Présentation"
                                                    multiline
                                                    rows="2"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}

                                                />

                                            </Grid>

                                        </Grid>




                                    </Formsy>
                                )
                                    : '')
                            }



                        </div>
                    )
                    : ''
            }
            innerScroll
        />
    )
}

export default withReducer('consultationsApp', reducer)(Consultation);
