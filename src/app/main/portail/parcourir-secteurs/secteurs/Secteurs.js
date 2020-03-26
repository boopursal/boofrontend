import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import HeaderSecteurs from './HeaderSecteurs';
import CardSecteur from './CardSecteur';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import ContentLoader from 'react-content-loader'
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
    paper: {
        borderTop: '2px solid ' + theme.palette.secondary.main,
    },
    title: {
        fontSize: 20,
        color: theme.palette.primary.main,
        marginBottom: 16,
    },
}));
function generate(element) {
    return [0, 1, 2, 3].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}
function Secteurs(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const secteurs = useSelector(({ parcourirSecteurs }) => parcourirSecteurs.pSecteurs);

    useEffect(() => {
        if (!secteurs.data)
            dispatch(Actions.getPSecteurs());
    }, [dispatch, secteurs.data]);


    return (
        <>
            {
                <Helmet>
                    <title>{'Tous les secteurs d’activité | Les Achats Industriels'}</title>
                    <meta name="description" content='Tous les secteurs d’activité | Les Achats Industriels'/>
                    <meta property="og:title" content='Tous les secteurs d’activité | Les Achats Industriels' />
                    <meta property="og:description" content='Tous les secteurs d’activité | Les Achats Industriels' />
                </Helmet>
            }
            <div className="flex flex-col min-h-xl">
                <div
                    className={clsx(classes.middle, "mb-0 relative overflow-hidden flex flex-col flex-shrink-0 ")}>
                    <div className={classes.overlay} />
                    <Grid container spacing={2} className=" max-w-2xl mx-auto py-8  sm:px-16 items-center z-9999">
                        <Grid item sm={12} xs={12}>
                            <HeaderSecteurs {...props} />
                        </Grid>
                    </Grid>
                </div>
                <Grid container spacing={4} className=" max-w-2xl mx-auto py-8  sm:px-16 ">
                    <Grid item sm={8} xs={12}>
                        <Paper variant="outlined" className={clsx(classes.paper, 'p-32 my-16')}>
                            <Typography className={classes.title} component="h1" color="primary">
                                Découvrez <span className="font-bold">Les Achats Industriels</span> à travers ses secteurs d'activité
                        </Typography>
                            <Grid container spacing={2} className="">
                                {
                                    secteurs.loading ?
                                        <>
                                            {
                                                generate(
                                                    <Grid item sm={6} xs={12}>
                                                        <ContentLoader
                                                            speed={2}
                                                            width={300}
                                                            height={210}
                                                            viewBox="0 0 300 210"
                                                        >
                                                            <rect x="20" y="19" rx="0" ry="0" width="129" height="17" />
                                                            <rect x="14" y="45" rx="0" ry="0" width="223" height="60" />
                                                            <rect x="40" y="115" rx="0" ry="0" width="118" height="9" />
                                                            <circle cx="25" cy="119" r="9" />
                                                            <rect x="40" y="135" rx="0" ry="0" width="118" height="9" />
                                                            <circle cx="25" cy="139" r="9" />
                                                            <rect x="40" y="155" rx="0" ry="0" width="118" height="9" />
                                                            <circle cx="25" cy="159" r="9" />
                                                            <rect x="40" y="175" rx="0" ry="0" width="118" height="9" />
                                                            <circle cx="25" cy="179" r="9" />
                                                            <rect x="152" y="191" rx="0" ry="0" width="88" height="12" />
                                                        </ContentLoader>
                                                    </Grid>
                                                )

                                            }
                                        </>
                                        :
                                        (

                                            secteurs.data && secteurs.data.map((item, index) => (
                                                <Grid item sm={6} xs={12} key={index}>

                                                    <CardSecteur {...props} secteur={item} />
                                                </Grid>

                                            ))
                                        )
                                }

                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4} className="sticky top-0">
                        <Paper className="w-full h-200 p-32 mt-16 text-center">
                            Ads
                    </Paper>
                    </Grid>
                </Grid>
            </div >
        </>

    )
}

export default withReducer('parcourirSecteurs', reducer)(Secteurs);