import React from 'react';
import { Grid, Card, CircularProgress, CardContent, Typography, Icon, Avatar, Button, Chip, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FuseAnimate, FuseUtils } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from "react-content-loader"
import * as Actions from '../store/actions';
import { Helmet } from "react-helmet";
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
        borderTop: '2px solid ' + theme.palette.secondary.main

    },
    progress: {
        margin: theme.spacing(2),
    },
    title: {
        fontSize: 30,
        textTransform: 'capitalize'
    },
    chip: {
        padding: 0,
        background: '#ef5350',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 24


    },
    chip2: {
        padding: 0,
        background: '#4caf50',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        height: 24
    },

}));

function DemandeDetail(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const demande = useSelector(({ demandesAchat }) => demandesAchat.demande);

    /*
        if ( !Demande.data )
        {
            return props.history.push('/')
        }
        if ( Demande.data.length === 0 && !Demande.loading)
        {
            return (
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        Il n'y a pas de Villes!
                    </Typography>
                </div>
            );
        }
    */

    function handleDownload(fiche) {

        dispatch(Actions.getFile(fiche))

        // window.open(FuseUtils.getUrl() + fiche.url);

    }

    return (
        <>
            {
                demande.data &&
                <Helmet>
                    <title>{demande.data.titre}</title>
                    <meta name="description" content={demande.data.description} />
                    <meta property="og:title" content={demande.data.titre} />
                    <meta property="og:description" content={demande.data.description} />
                </Helmet>
            }

            <Grid container spacing={2} className="max-w-2xl mx-auto py-48 sm:px-16 items-start">

                {
                    demande.loading ?
                        <Grid item xs={12} sm={12}>
                            <ContentLoader
                                speed={2}
                                width={480}
                                height={400}
                                viewBox="0 0 480 400"
                            >
                                <rect x="5" y="5" rx="3" ry="3" width="121" height="13" />
                                <rect x="219" y="7" rx="3" ry="3" width="85" height="8" />
                                <rect x="6" y="27" rx="3" ry="3" width="297" height="160" />
                                <rect x="92" y="199" rx="0" ry="0" width="22" height="19" />
                                <rect x="122" y="199" rx="0" ry="0" width="22" height="19" />
                                <rect x="153" y="199" rx="0" ry="0" width="22" height="19" />
                                <rect x="181" y="199" rx="0" ry="0" width="22" height="19" />
                                <rect x="4" y="228" rx="3" ry="3" width="299" height="18" />
                                <rect x="3" y="255" rx="3" ry="3" width="299" height="82" />
                                <rect x="354" y="4" rx="3" ry="3" width="121" height="20" />
                                <circle cx="373" cy="51" r="20" />
                                <rect x="398" y="35" rx="3" ry="3" width="69" height="13" />
                                <rect x="399" y="57" rx="3" ry="3" width="69" height="7" />
                                <rect x="362" y="79" rx="3" ry="3" width="102" height="23" />
                                <rect x="362" y="109" rx="3" ry="3" width="102" height="23" />
                            </ContentLoader>
                        </Grid>
                        :
                        (
                            demande.data &&
                            (
                                <>
                                    <Grid item xs={12} sm={9} >
                                        <Card className={classes.root}>

                                            <CardContent>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <Typography className={classes.title} component="h1" color="primary">
                                                            {demande.data.titre}
                                                        </Typography>
                                                        <Typography color="textSecondary" >
                                                            {demande.data.reference && 'RFQ-' + demande.data.reference}
                                                        </Typography>
                                                    </div>

                                                </div>

                                                <div className="my-16 p-12 bg-gray-300 uppercase font-bold text-16" >
                                                    Description
                                                </div>

                                                <Typography component="p" className="whitespace-pre-line">
                                                    {
                                                       demande.data.description
                                                    }

                                                </Typography>

                                                <div className="my-16 p-12 bg-gray-300 uppercase font-bold text-16">
                                                    activités
                                                </div>
                                                {
                                                    demande.data.sousSecteurs &&
                                                    demande.data.sousSecteurs.map((item, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={item.name}
                                                            classes={{
                                                                root: clsx("h-24", props.className),
                                                                label: "pl-4 pr-6 py-4 text-11",
                                                                deleteIcon: "w-16 ml-0",
                                                                ...props.classes
                                                            }}
                                                            variant="outlined"
                                                            className="mr-4"
                                                        />
                                                    ))

                                                }

                                                {
                                                    demande.data.attachements &&
                                                    <>
                                                        <div className="my-16 p-12 bg-gray-300 uppercase font-bold text-16 ">
                                                            Pièce(s) jointe(s)
                                                            </div>
                                                        {

                                                            demande.data.attachements.map((item, index) => (
                                                                <Chip
                                                                    key={index}
                                                                    icon={<Icon className="text-16 mr-0">save_alt</Icon>}
                                                                    onClick={() => {
                                                                        handleDownload(item)
                                                                    }}
                                                                    label='Télécharger'
                                                                    classes={{
                                                                        root: clsx("h-24", props.className),
                                                                        label: "pl-4 pr-6 py-4 text-11",
                                                                        deleteIcon: "w-16 ml-0",
                                                                        ...props.classes
                                                                    }}
                                                                    variant="outlined"
                                                                    className="mr-4 cursor-pointer"
                                                                />
                                                            ))
                                                        }

                                                    </>
                                                }


                                            </CardContent>

                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>

                                        <div className="w-full mb-16 border border-teal-darkest bg-teal-lighter font-bold text-teal text-center text-lg rounded-lg py-32 px-6">
                                            <Typography className="uppercase" component="h6" >
                                                budget
                                            </Typography>
                                            {demande.data.budget ?
                                                parseFloat(demande.data.budget).toLocaleString(
                                                    'fr', // leave undefined to use the browser's locale,
                                                    // or use a string like 'en-US' to override it.
                                                    { minimumFractionDigits: 2 }
                                                ) +
                                                (demande.data.currency && ' ' + demande.data.currency.name) + ' HT'
                                                :
                                                <span className="capitalize">à consulter</span>
                                            }
                                        </div>
                                        <div className="w-full mb-16 border border-gray-darkest bg-gray-light font-bold text-gray text-center text-md rounded-lg py-32 px-6">
                                            <Icon className="text-16 mr-0">location_on</Icon> {demande.data.ville + ', ' + demande.data.pays}
                                        </div>

                                        <table className="table   w-full">

                                            <tbody>
                                                <tr className="bg-gray-200 text-gray-700">
                                                    <td className=" px-8 py-2 uppercase font-bold">statut</td>
                                                    <td className=" px-8 py-2">{
                                                        moment(demande.data.dateExpiration) >= moment()
                                                            ?
                                                            (demande.data.statut === 1 && <Chip className={classes.chip2} label="En cours" />)
                                                            :
                                                            <Chip className={classes.chip} label="Expirée" />

                                                    }</td>
                                                </tr>
                                                <tr className="bg-gray-400 text-gray-700">
                                                    <td className=" px-8 py-2 uppercase font-bold">publiée le</td>

                                                    <td className=" px-8 py-2"> {
                                                        moment(demande.data.created).format("DD-MM-YYYY à HH:mm")
                                                    }</td>
                                                </tr>
                                                <tr className="bg-gray-200 text-gray-700">
                                                    <td className=" px-8 py-2 uppercase font-bold">expire le</td>
                                                    <td className=" px-8 py-2">{
                                                        moment(demande.data.dateExpiration).format("DD-MM-YYYY à HH:mm")
                                                    }</td>
                                                </tr>
                                            </tbody>
                                        </table>



                                    </Grid>
                                </>
                            )
                        )
                }


            </Grid>
        </>
    );
}

export default React.memo(DemandeDetail);