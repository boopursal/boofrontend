import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {  FuseAnimate } from '@fuse';
import { Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    layoutRoot: {},
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));

function HeaderDetailProduit(props) {
    const classes = useStyles();
    const produit = useSelector(({ detailProduitApp }) => detailProduitApp.detailProduit);

    return (
        produit.data && produit.data.fournisseur ? (
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>

                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to="/" className={classes.link}>
                        <HomeIcon className={classes.icon} />
                        Accueil
                </Link>
                    <Link color="inherit" to={`/vente-produits/${produit.data.sousSecteurs ? produit.data.sousSecteurs.slug : ''}`} className={classes.link}>
                        {produit.data.sousSecteurs ? produit.data.sousSecteurs.name : ''}
                    </Link>
                    <Link color="inherit" to={`/vente-produits/${produit.data.sousSecteurs ? produit.data.sousSecteurs.slug : ''}/${produit.data.categorie ? produit.data.categorie.slug : ''}`} className={classes.link}>
                        {produit.data.categorie ? produit.data.categorie.name : ''}
                    </Link>
                    <Typography color="textPrimary" className={classes.link}>
                        {produit.data.titre}
                    </Typography>
                </Breadcrumbs>

            </FuseAnimate>)
            : ''


    )
}

export default HeaderDetailProduit;