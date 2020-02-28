import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, DemoContent, FuseAnimate } from '@fuse';
import { Typography, Grid, Breadcrumbs } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import SideBareSearch from './SideBareSearch';
import HomeIcon from '@material-ui/icons/Home';
import ContentList from './ContentList';
import _ from '@lodash';
import { Helmet } from "react-helmet";

const useStyles = makeStyles(theme => ({
    middle: {
        background: 'linear-gradient(to right, ' + theme.palette.secondary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        position: 'relative',
        marginBottom: theme.spacing(4),
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));

function useQuery(location) {
    return new URLSearchParams(location.search);
}

function FournisseursApp(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery(props.location);
    const params = props.match.params;
    const { secteur, activite } = params;
    const pays = query.get("pays");
    const parametres = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseurs.parametres);

    useEffect(() => {

        function updateFournisseurState() {
            dispatch(Actions.getFournisseurs(params, pays, parametres));
        }

        updateFournisseurState();
    }, [dispatch, params, pays, parametres]);

    useEffect(() => {

        function updateFournisseurState() {
            if (!secteur && !pays) {
                dispatch(Actions.getSecteursAndPaysCounts());
            }
            if (!secteur && pays) {
                dispatch(Actions.getSecteursCounts(params, pays));
            }
            if (secteur && !pays) {
                dispatch(Actions.getActivitesCounts(params, pays));
                dispatch(Actions.getPaysCounts(params, pays));
            }
            if (secteur && pays) {
                dispatch(Actions.getActivitesCounts(params, pays));
            }
        }

        updateFournisseurState();
    }, [dispatch, params, pays]);

    return (
        <div className="flex flex-col min-h-xl">
            <Helmet>
                <title>Vente de fournisseurs {
                    activite ? _.capitalize(activite.replace('-', ' ')) :
                        (secteur ? _.capitalize(secteur.replace('-', ' ')) : '')
                }
                    {
                        pays ? ' au ' + _.capitalize(pays.replace('-', ' ')) : ''
                    }</title>
                <meta name="description" content='d' />
            </Helmet>
            <div
                className={clsx(classes.middle, "mb-0 relative overflow-hidden flex flex-col flex-shrink-0  p-16 sm:p-24 h-96 sm:h-60 ")}>
                <div className={classes.overlay} />
                <Grid container spacing={2} className="max-w-2xl mx-auto px-8  sm:px-16 items-center z-9999">
                    <Grid item sm={12} xs={12}>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>

                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" to="/" className={classes.link}>
                                    <HomeIcon className={classes.icon} />
                                    Accueil
                                </Link>
                                {
                                    secteur ?
                                        <Link color="inherit" to={`/vente-fournisseurs/${secteur}`} className={classes.link}>
                                            {_.capitalize(secteur.replace('-', ' '))}
                                        </Link>
                                        : ''
                                }
                                {
                                    activite ?
                                        <Link color="inherit" to={`/vente-fournisseurs/${secteur}/${activite}`} className={classes.link}>
                                            {_.capitalize(activite.replace('-', ' '))}
                                        </Link>
                                        : ''
                                }


                            </Breadcrumbs>

                        </FuseAnimate>
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={2} className="max-w-2xl mx-auto sm:px-16 pt-24 items-start">
                <Grid item sm={12} xs={12}>
                    <Typography variant="h1" className="text-24 font-bold">Vente de fournisseurs {
                        activite ? _.capitalize(activite.replace('-', ' ')) :
                            (secteur ? _.capitalize(secteur.replace('-', ' ')) : '')
                    }
                        {
                            pays ? ' au ' + _.capitalize(pays.replace('-', ' ')) : ''
                        }
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} className="max-w-2xl mx-auto py-24 sm:px-16 items-start">

                <Grid item sm={4} md={3} xs={12} className="sticky top-0 order-last sm:order-first">
                    <SideBareSearch  {...props} />
                </Grid>
                <Grid item sm={8} md={9} xs={12}>
                    <ContentList />
                </Grid>
            </Grid>

        </div>


    )
}

export default withReducer('fournisseursApp', reducer)(FournisseursApp);