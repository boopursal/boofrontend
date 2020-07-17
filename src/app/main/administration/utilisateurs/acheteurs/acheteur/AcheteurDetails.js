import React, { useEffect, useState, useRef } from 'react';
import { Button, Tab, Tabs, InputAdornment, Icon, Typography, Divider, Grid, Avatar, MenuItem, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FusePageCarded, FuseUtils, TextFieldFormsy, SelectReactFormsy, SelectFormsy } from '@fuse';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import _ from '@lodash';
import Formsy from 'formsy-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

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
    acheteurImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },

    acheteurImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $acheteurImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $acheteurImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $acheteurImageFeaturedStar': {
                opacity: 1
            }
        }
    },
}));

function AcheteurDetails(props) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const acheteur = useSelector(({ acheteurDetailsApp }) => acheteurDetailsApp.acheteur);
    const [tabValue, setTabValue] = useState(0);
    const params = props.match.params;
    const { acheteurId } = params;


    useEffect(() => {

        function updateAcheteurState() {
            dispatch(Actions.getAcheteur(acheteurId));
        }

        updateAcheteurState();
        return () => {
            dispatch(Actions.cleanUpAcheteur())
        }
    }, [dispatch, acheteurId]);

    useEffect(() => {
        if (acheteurId)
            dispatch(Actions.getDemandesByAcheteur(acheteurId, acheteur.parametres));
    }, [dispatch, acheteur.parametres, acheteurId]);

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }

    //dispatch from function filter
    const run = (parametres) => (
        dispatch(Actions.setParametresData(parametres))
    )

    //call run function
    const fn =
        _.debounce(run, 1000);

    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                !acheteur.requestAcheteur ? acheteur.data && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/users/acheteurs" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Retour
                                </Typography>
                            </FuseAnimate>
                            <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    {acheteur.data.avatar ?
                                        (
                                            <Avatar className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" alt="user photo" src={FuseUtils.getUrl() + acheteur.data.avatar.url} />
                                        )
                                        :
                                        (
                                            <Avatar className="w-32 sm:w-48 mr-8 sm:mr-16 rounded">
                                                {acheteur.data.firstName[0]}
                                            </Avatar>
                                        )
                                    }
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {acheteur.data.firstName && acheteur.data.lastName ? acheteur.data.firstName + ' ' + acheteur.data.lastName : 'NOM & Prénom'}
                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">{acheteur.data.societe ? acheteur.data.societe : 'Société'} {acheteur.data.email ? ' | ' + acheteur.data.email : ''}</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                    </div>
                ) :
                    <LinearProgress color="secondary" />
            }
            contentToolbar={
                !acheteur.requestAcheteur ?
                    acheteur.data && (
                        <Tabs
                            value={tabValue}
                            onChange={handleChangeTab}
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="scrollable"
                            scrollButtons="auto"
                            classes={{ root: "w-full h-64" }}
                        >
                            <Tab className="h-64 normal-case" label="Infos société" />
                        </Tabs>)
                    :
                    <div className={classes.root}>
                        <LinearProgress color="secondary" />
                    </div>
            }
            content={
                !acheteur.requestAcheteur ? acheteur.data && (
                    <div className=" sm:p-10 max-w-2xl">
                        {tabValue === 0 && (
                            <Formsy
                                className="flex flex-col">

                                <Grid container spacing={3} className="mb-5">

                                    <Grid item xs={12} sm={4}>
                                        <div className="flex">
                                            <TextFieldFormsy
                                                className=""
                                                type="text"
                                                name="fullname"
                                                value={acheteur.data.civilite + ' ' + acheteur.data.firstName + ' ' + acheteur.data.lastName}
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
                                                value={acheteur.data.email}
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
                                            value={acheteur.data.phone}
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
                                                value={acheteur.data.societe}
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
                                                value={acheteur.data.fix}
                                                label="Fixe"
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
                                            value={acheteur.data.secteur ? acheteur.data.secteur.name : ''}
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
                                                value={acheteur.data.website}
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
                                                acheteur.data.ice ?
                                                    <TextFieldFormsy
                                                        className=""
                                                        type="text"
                                                        name="ice"
                                                        id="ice"
                                                        value={acheteur.data.ice}
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
                                                value={acheteur.data.adresse1}
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
                                            value={acheteur.data.pays ? acheteur.data.pays.name : ''}
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
                                                value={acheteur.data.adresse2}
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
                                                value={String(acheteur.data.codepostal)}
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
                                            value={acheteur.data.ville ? acheteur.data.ville.name : ''}
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
                                            value={acheteur.data.description}
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
                        }
                    </div>
                )
                    : ""
            }
            innerScroll
        />
    )
}

export default withReducer('acheteurDetailsApp', reducer)(AcheteurDetails);
