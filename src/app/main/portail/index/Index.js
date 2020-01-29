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
//import * as Actions from '../store/actions';
//import reducer from '../store/reducers';

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
    icon: {
        color: theme.palette.secondary.dark,
        padding: theme.spacing(0.5, 0, 0, 0),
        fontSize: 34,
    },
    title: {
        padding: theme.spacing(2, 2, 0, 2),
    },
}));
function generate(element) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value =>
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
    useEffect(() => {
        // Mettre à jour le titre du document en utilisant l'API du navigateur
        document.title = title;
    }, [title]);

    return (
        <div className="flex flex-col flex-1 w-full">
            <div
                className={clsx(classes.header, "relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-256 sm:h-288")}>

                <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                    <Paper className="flex p-4 items-center w-full max-w-640 px-8 py-4" elevation={1}>

                        <Icon className="mr-8" color="action">search</Icon>

                        <Input
                            placeholder="Rechercher un produit, une activité, un fournisseur"
                            className="flex flex-1 h-48"
                            disableUnderline
                            fullWidth
                            inputProps={{
                                'aria-label': 'Search'
                            }}
                        />
                    </Paper>
                </FuseAnimate>

                <FuseAnimate duration={400} delay={600}>
                    <Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
                        <span className="opacity-75">
                            Les Achats Industriels est la place de marchée B2B N°1 au Maroc qui permet aux Achteurs et aux Fournisseurs de se rencontrer dans une même plate-forme.
                            </span>
                    </Typography>
                </FuseAnimate>

                <Icon className={classes.headerIcon}>school</Icon>
            </div>


            <Grid container spacing={2} className="max-w-2xl mx-auto px-8 sm:px-16 py-24">
                <Grid item sm={4}>

                    <div className={classes.demo}>
                        <Typography variant="h6" className={classes.title}>
                            <Icon className={classes.icon}>format_list_bulleted</Icon>&ensp;CATÉGORIES
                    </Typography>
                        <List dense={dense}>
                            {generate(
                                <Categories />,
                            )}
                        </List>
                    </div>
                </Grid>
                <Grid item sm={8}>

                    <div className={classes.demo}>
                        <Typography variant="h6" className={classes.title}>
                            <Icon className={classes.icon}>featured_play_list</Icon>&ensp;DERNIÈRES DEMANDES DE DEVIS :
                        </Typography>
                        <List className="p-0 w-full" >
                            <FuseAnimateGroup
                                enter={{
                                    animation: "transition.slideUpBigIn"
                                }}
                            >
                                {generate(
                                    <DemandeAchatsListItem />,
                                )}
                            </FuseAnimateGroup>
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Index;
