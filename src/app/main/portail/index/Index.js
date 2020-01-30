import React, { useEffect, useState } from 'react';
import {
    Icon,
    Typography,
    Paper,
    Input,
    List,
    Grid,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    ListItem,
    ListItemAvatar,
    Avatar,
    Card,
    CardActionArea,
    CardActions,
    Button,
    CardMedia,
    CardContent,

} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FuseAnimateGroup } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
//import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
//import _ from '@lodash';
import { Link } from 'react-router-dom';
import DemandeAchatsListItem from './DemandeAchatsListItem';
import Categories from './Categories';
import BioFournisseur from './BioFournisseur';
import Slider from "react-slick";
//import * as Actions from '../store/actions';
//import reducer from '../store/reducers';
import YouTube from 'react-youtube';

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: 'linear-gradient(to right, ' + theme.palette.secondary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color: theme.palette.getContrastText(theme.palette.primary.main),
        position: 'relative',
        marginBottom: theme.spacing(4),
        backgroundColor: theme.palette.primary.main,
        backgroundImage: 'url(https://source.unsplash.com/collection/9456871/1600x900)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    middle: {
        background: 'linear-gradient(to right, ' + theme.palette.secondary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        position: 'relative',
        marginBottom: theme.spacing(4),
    },
    headerIcon: {
        position: 'absolute',
        top: -64,
        left: 0,
        opacity: .04,
        fontSize: 512,
        width: 512,
        height: 512,
        pointerEvents: 'none'
    },
    demo: {
        backgroundColor: theme.palette.background.paper,

    },
    mainHeader: {
        backgroundColor: 'rgba(0,0,0,.5)',
    },
    icon: {
        color: theme.palette.secondary.dark,
        padding: theme.spacing(0.5, 0, 0, 0),
        fontSize: 34,
    },
    title: {
        padding: theme.spacing(2, 2, 0, 2),
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainAvatar: {
        margin: theme.spacing(1.25, 1.25, 1.25, 0),
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    card: {
        //  margin: 10,
    },
    media: {
        height: 140,
    },
}));
function generate(element) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}
function generate2(element) {
    return [0, 1, 2, 3].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

function Index(props) {

    const dispatch = useDispatch();
    const classes = useStyles(props);
    const title = 'Les Achats Industriels | Place de marché B2B';
    const [dense, setDense] = React.useState(false);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToScroll: 4,
        className: "p-10",
        slidesToShow: 4,
        dots: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const opts = {
        width: '100%',
        height: '200px',
        playerVars: { // https://developers.google.com/youtube/player_parameters
          showinfo: 0,          
          fs: 0,
          modestbranding: 1,
          rel: 0,
        }
      };

    useEffect(() => {
        // Mettre à jour le titre du document en utilisant l'API du navigateur
        document.title = title;
    }, [title]);

    return (
        <div className="flex flex-col flex-1 w-full">

            {/** 
             ===================HEADER=================
            **/}
            <div
                className={clsx(classes.header, "relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-256 sm:h-288")}>
                <div className={classes.overlay} />
                <div className={clsx(classes.mainHeader, "items-center md:w-xl xs:w-auto z-999 px-8 py-20 rounded-lg")} >
                    <FuseAnimate duration={400} delay={600}>
                        <Typography variant="h1" component="h1" className="sm:text-20 text-13 font-bold mb-16  mx-auto max-w-xl">
                            Les Achats Industriels, c'est une communauté de 1000 sociétés, Acheteurs et Fournisseurs
                        </Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                        <Paper className="flex p-4 items-center mx-auto w-full max-w-640 " elevation={1}>

                            <Icon className="mr-8" color="action">search</Icon>

                            <Input
                                placeholder="Rechercher un produit, une activité, un fournisseur"
                                className="flex flex-1 h-48"
                                disableUnderline
                                fullWidth
                                autoFocus
                                inputProps={{
                                    'aria-label': 'Search'
                                }}
                            />
                        </Paper>
                    </FuseAnimate>



                </div>

                <Icon className={classes.headerIcon}>school</Icon>
            </div>


            {/** 
             ===================CATEGORIES & RFQs=================
            **/}                     
            <Grid container spacing={2} className="max-w-2xl mx-auto px-8 sm:px-16 py-24">
                <Grid item sm={4} xs={12}>

                    <div className={classes.demo}>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={classes.mainAvatar}>
                                    <Icon >format_list_bulleted</Icon>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="h2" component="h2" className="text-20 font-bold xs:text-11 mb-1">
                                        CATÉGORIES
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <List dense={dense}>
                            {generate(
                                <Categories />,
                            )}
                        </List>
                    </div>
                </Grid>
                <Grid item sm={8} xs={12}>

                    <div className={classes.demo}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={classes.mainAvatar}>
                                    <Icon >featured_play_list</Icon>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="h2" component="h2" className="text-20 font-bold xs:text-11 mb-1">
                                        DERNIÈRES DEMANDES DE DEVIS
                                    </Typography>
                                }
                            />
                        </ListItem>

                        <List className="p-0 w-full" >
                            <FuseAnimateGroup
                                enter={{
                                    animation: "transition.slideUpBigIn"
                                }}
                            >
                                {generate2(
                                    <DemandeAchatsListItem />,
                                )}
                            </FuseAnimateGroup>
                        </List>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2} className="max-w-2xl mx-auto px-8 sm:px-16 py-24">
                <Grid item sm={12}>
                    <div>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={classes.mainAvatar}>
                                    <Icon >collections_bookmark</Icon>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="h2" component="h2" className="text-20 font-bold xs:text-11 mb-1">
                                        FOCUS PRODUITS
                                    </Typography>
                                }
                                secondary='Un extrait des catalogues B2B des fournisseurs et fabricants présents sur Les Achats Industriels.'
                            />
                        </ListItem>

                        <Slider {...settings}>
                            {generate(
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image="https://source.unsplash.com/collection/9457511"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Share
                                        </Button>
                                        <Button size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>,
                            )}

                        </Slider>
                    </div>
                </Grid>
            </Grid>

             {/** 
             ===================DECOUVREZ LES SHA=================
            **/}
            <div
                className={clsx(classes.middle, "relative overflow-hidden flex flex-col flex-shrink-0  p-16 sm:p-24 h-512 sm:h-288 ")}>
                <div className={classes.overlay} />
                <Grid container spacing={2} className="max-w-2xl mx-auto px-8 sm:px-16 items-center py-24 z-9999">
                    <Grid item sm={7} xs={12}>
                        <Typography variant="h2" component="h2" className='text-white text-24 uppercase mb-16' >
                            Découvrez le service Les Achats Industriels
                        </Typography>
                        <Typography className="text-white opacity-75">
                            La place de marché N°1 au Maroc, qui permet aux Acheteurs et aux Fournisseurs de se rencontrer dans une même plate-forme (électronique).
                        </Typography>
                    </Grid>
                    <Grid item sm={5} xs={12}>
                        <YouTube
                            videoId="rv2v5pNCQb4"
                            opts={opts}
                        />
                    </Grid>
                </Grid>

                <Icon className={classes.headerIcon}>school</Icon>
            </div>

             {/** 
             ===================INSCRIPTION FOURNISSEUR=================
            **/}
            <Grid container spacing={2} className="max-w-2xl mx-auto px-8 sm:px-16 py-24">
                <Grid item sm={12}>
                    <BioFournisseur />
                </Grid>
            </Grid>

        </div>
    );
}

export default Index;
