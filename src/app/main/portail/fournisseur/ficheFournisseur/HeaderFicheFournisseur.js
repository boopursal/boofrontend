import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {  FuseAnimate } from '@fuse';
import { Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    layoutRoot: {},
    link: {
        display: 'flex',
        color: theme.palette.grey[600]+'!important',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));

function HeaderFicheFournisseur(props) {
    const classes = useStyles();
    const data = useSelector(({ ficheFournisseurApp }) => ficheFournisseurApp.fournisseur.data);

    return (
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>

                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="textPrimary" to="/" className={clsx(classes.link,'underline')}>
                        <HomeIcon className={classes.icon} />
                        Accueil
                    </Link>
                </Breadcrumbs>

            </FuseAnimate>
    )
}

export default HeaderFicheFournisseur;