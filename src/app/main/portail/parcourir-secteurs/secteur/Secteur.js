import React, {  useEffect } from 'react';
import { Grid, Paper, Typography, ListItem, Icon, Divider, List, ListItemText, ListItemSecondaryAction, IconButton, Avatar, ListItemAvatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import HeaderSecteur from './HeaderSecteur';
import _ from '@lodash';
import { FuseUtils } from '@fuse';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
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
    fiche: {
        minHeight: 230,
        maxHeight: 230,
        backgroundColor: theme.palette.primary.main,
        backgroundImage: 'url(https://source.unsplash.com/collection/9631824/1600x900)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    title: {
        fontSize: 28,
        color: theme.palette.secondary.main,
        fontWeight: 'bold'
    },
    divTitle: {
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'absolute',
        top: 10,
        left: 10,
        maxWidth: 610,
        padding: '5px 10px'
    },
    inline: {
        display: 'inline',
    },
    businessDownIcon: {
        position: 'absolute',
        top: 10,
        left: 5,
        color: 'white',
        opacity: .5,
        fontSize: 100,
        pointerEvents: 'none'
    },
    top: {
        position: 'absolute',
        bottom: 0,
        left: 80,
        color: 'white',
        opacity: .5,
        fontSize: 20,
        pointerEvents: 'none'
    },
}));

function Secteur(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const activites = useSelector(({ parcourirSecteurs }) => parcourirSecteurs.pSecteur);
    const params = props.match.params;
    const { id, slug } = params;
    useEffect(() => {
        dispatch(Actions.getSecteur(id));
        dispatch(Actions.getPActivites(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(Actions.getTopFounrisseurs(slug));
    }, [dispatch, slug]);

    return (
        <>
         {
                activites.secteur &&
                <Helmet>
                    <title>{activites.secteur.name + ' | Les Achats Industriels'}</title>
                    <meta name="description" content={activites.secteur.name + ' | Les Achats Industriels'} />
                    <meta property="og:title" content={activites.secteur.name} />
                    <meta property="og:description" content={activites.secteur.name + ' | Les Achats Industriels'} />
                </Helmet>
            }
            <div className="flex flex-col min-h-md">
                <div
                    className={clsx(classes.middle, "mb-0 relative overflow-hidden flex flex-col flex-shrink-0 ")}>
                    <div className={classes.overlay} />
                    <Grid container spacing={2} className=" max-w-2xl mx-auto py-8  sm:px-16 items-center z-9999">
                        <Grid item sm={12} xs={12}>
                            <HeaderSecteur {...props} />
                        </Grid>
                    </Grid>
                </div>
                <Grid container spacing={4} className=" max-w-2xl mx-auto py-8  sm:px-16 ">
                    <Grid item sm={8} xs={12}>
                        <Paper variant="outlined" className={clsx(classes.paper, 'p-0 my-16')}>
                            <div className={clsx(classes.fiche, "rounded-t-md relative max-w-2xl mx-auto")} style={{
                                backgroundImage: activites.secteur && 
                                activites.secteur.image && 'url('+FuseUtils.getUrl()+activites.secteur.image.url+')'
                            }}>
                                <div className={clsx(classes.divTitle)}>
                                    <Typography className={clsx(classes.title)} component="h1" color="primary">
                                        {
                                            activites.loadingSecteur?'Chargement ...':
                                            activites.secteur && activites.secteur.name
                                        }
                                 </Typography>
                                </div>
                            </div>
                            <div className={clsx('p-32 ')}>
                                <Typography variant="h6" color="primary">
                                    Affiner votre recherche
                                </Typography>
                                <Grid container spacing={4} className="">
                                    {
                                        activites.loading ?

                                            <React.Fragment>
                                                <Grid item sm={6} xs={12}>
                                                    <ContentLoader viewBox="0 0 400 150" height={130} width={400}>
                                                        <circle cx="10" cy="20" r="8" />
                                                        <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
                                                        <circle cx="10" cy="50" r="8" />
                                                        <rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
                                                        <circle cx="10" cy="80" r="8" />
                                                        <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
                                                        <circle cx="10" cy="110" r="8" />
                                                        <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
                                                    </ContentLoader>
                                                </Grid>
                                                <Grid item sm={6} xs={12}>
                                                    <ContentLoader viewBox="0 0 400 150" height={130} width={400}>
                                                        <circle cx="10" cy="20" r="8" />
                                                        <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
                                                        <circle cx="10" cy="50" r="8" />
                                                        <rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
                                                        <circle cx="10" cy="80" r="8" />
                                                        <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
                                                        <circle cx="10" cy="110" r="8" />
                                                        <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
                                                    </ContentLoader>
                                                </Grid>
                                            </React.Fragment> :
                                            (
                                                <React.Fragment>
                                                    <Grid item sm={6} xs={12}>
                                                        <List dense={true} >
                                                            {
                                                                activites.data && activites.data.map((sousSecteur, i) => (
                                                                    (i + 1) % 2 !== 0 && (
                                                                        <React.Fragment key={i}>
                                                                            <ListItem button
                                                                                component="a"
                                                                                href={`/annuaire-entreprises/${slug}/${sousSecteur.id}-${sousSecteur.slug}`}
                                                                            >
                                                                                <ListItemText
                                                                                    disableTypography
                                                                                    primary={<Typography type="body2" style={{ fontSize: 12 }}>{sousSecteur.name}</Typography>}
                                                                                />
                                                                                <ListItemSecondaryAction>
                                                                                    <IconButton edge="end" aria-label="more">
                                                                                        <Icon className="text-16 arrow-icon">chevron_right</Icon>
                                                                                    </IconButton>
                                                                                </ListItemSecondaryAction>
                                                                            </ListItem>
                                                                            <Divider component="li" />
                                                                        </React.Fragment>)
                                                                ))
                                                            }

                                                        </List>

                                                    </Grid>
                                                    <Grid item sm={6} xs={12}>
                                                        <List dense={true} >
                                                            {
                                                                activites.data && activites.data.map((sousSecteur, i) => (
                                                                    (i + 1) % 2 === 0 && (
                                                                        <React.Fragment key={i}>
                                                                            <ListItem button
                                                                                component="a"
                                                                                href={`/annuaire-entreprises/${slug}/${sousSecteur.id}-${sousSecteur.slug}`}
                                                                            >
                                                                                <ListItemText
                                                                                    disableTypography
                                                                                    primary={<Typography type="body2" style={{ fontSize: 12 }}>{sousSecteur.name}</Typography>}
                                                                                />
                                                                                <ListItemSecondaryAction>
                                                                                    <IconButton edge="end" aria-label="more">
                                                                                        <Icon className="text-16 arrow-icon">chevron_right</Icon>
                                                                                    </IconButton>
                                                                                </ListItemSecondaryAction>
                                                                            </ListItem>
                                                                            <Divider component="li" />
                                                                        </React.Fragment>)
                                                                ))
                                                            }

                                                        </List>

                                                    </Grid>
                                                </React.Fragment>
                                            )
                                    }

                                </Grid>

                                <div className="bg-gray-300 text-center p-16 mt-16">
                                    <Typography variant="h6" >
                                        Et VOTRE entreprise, est-elle référencée dans ce secteur?
                                    </Typography>
                                    <Button component={Link} className="mt-8" to="/register" color="secondary" variant="contained">
                                        <span >Inscrivez-vous mantenant</span>
                                        <Icon className="ml-4 arrow-icon">keyboard_arrow_right</Icon>
                                    </Button>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4} className="sticky top-0 ">
                        <Paper className="my-16">
                            <div className="p-20 bg-gray-400  relative text-center font-bold text-16 ">
                                Entreprises les plus consultées du secteur
                                <Icon className={classes.businessDownIcon}>star_rate</Icon>
                                <div className={clsx(classes.top, 'uppercase')}>top 5</div>
                            </div>
                            {
                                activites.loadingFournisseurs ?
                                    <ContentLoader
                                        speed={2}
                                        width={400}
                                        height={150}
                                        viewBox="0 0 400 150"
                                    >
                                        <circle cx="34" cy="20" r="17" />
                                        <rect x="57" y="9" rx="5" ry="5" width="200" height="9" />
                                        <rect x="57" y="22" rx="5" ry="5" width="100" height="9" />
                                        <circle cx="34" cy="57" r="17" />
                                        <rect x="57" y="46" rx="5" ry="5" width="200" height="9" />
                                        <rect x="57" y="59" rx="5" ry="5" width="100" height="9" />
                                        <circle cx="34" cy="94" r="17" />
                                        <rect x="57" y="83" rx="5" ry="5" width="200" height="9" />
                                        <rect x="57" y="96" rx="5" ry="5" width="100" height="9" />
                                        <circle cx="34" cy="131" r="17" />
                                        <rect x="57" y="120" rx="5" ry="5" width="200" height="9" />
                                        <rect x="57" y="133" rx="5" ry="5" width="100" height="9" />
                                    </ContentLoader>
                                    :
                                    (
                                        <List className={classes.root}>
                                            {
                                                activites.fournisseurs && activites.fournisseurs.map((fournisseur, index) => (
                                                    <React.Fragment key={index}>
                                                        <ListItem alignItems="flex-start" button
                                                            component="a"
                                                            href={`/entreprise/${fournisseur.id}-${fournisseur.slug}`}>
                                                            <ListItemAvatar>
                                                                {
                                                                    fournisseur.avatar ?
                                                                        <Avatar
                                                                            className={clsx(classes.avatar, "avatar")}
                                                                            alt={fournisseur.societe}
                                                                            src={
                                                                                FuseUtils.getUrl() + fournisseur.avatar.url
                                                                            }
                                                                        /> :
                                                                        <Avatar className={clsx(classes.avatar2, "avatar text-40 ")}>
                                                                            <Icon >business</Icon>
                                                                        </Avatar>
                                                                }
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={fournisseur.societe}
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            component="span"
                                                                            variant="body2"
                                                                            className={classes.inline}
                                                                            color="textPrimary"
                                                                        >
                                                                            {fournisseur.pays && fournisseur.pays.name}
                                                                        </Typography>
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                                        <Divider variant="inset" component="li" />
                                                    </React.Fragment>
                                                ))
                                            }

                                        </List>
                                    )
                            }

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default withReducer('parcourirSecteurs', reducer)(Secteur);
