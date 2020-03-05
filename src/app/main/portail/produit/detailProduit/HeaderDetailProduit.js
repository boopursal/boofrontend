import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import _ from '@lodash';

const useStyles = makeStyles(theme => ({
    layoutRoot: {},
    breadcrumbs: {
        fontSize: 11,
    },
    link: {
        display: 'flex',
        'align-items': 'center',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));

function HeaderDetailProduit(props) {
    const classes = useStyles();
    const produit = useSelector(({ produitsApp }) => produitsApp.detailProduit);

    return (
        produit.data && produit.data.fournisseur ? (
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>

                <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} className={classes.breadcrumbs}>
                    <Link color="inherit" to="/" className={classes.link}>
                        <HomeIcon className={classes.icon} />
                        Accueil
                    </Link>
                    <Link color="inherit" to={`/vente-produits/${produit.data.secteur ? produit.data.secteur.slug : ''}/${produit.data.sousSecteurs ? produit.data.sousSecteurs.slug : ''}`} className={classes.link}>
                        {produit.data.sousSecteurs ? produit.data.sousSecteurs.name : ''}
                    </Link>
                    <Link color="inherit" to={`/vente-produits/${produit.data.secteur ? produit.data.secteur.slug : ''}/${produit.data.sousSecteurs ? produit.data.sousSecteurs.slug : ''}/${produit.data.categorie ? produit.data.categorie.slug : ''}`} className={classes.link}>
                        {produit.data.categorie ? produit.data.categorie.name : ''}
                    </Link>
                    {
                        produit.data.titre &&
                        <span className="text-white">
                            {_.capitalize(produit.data.titre)}
                        </span>

                    }
                  
                </Breadcrumbs>

            </FuseAnimate>)
            : ''


    )
}

export default HeaderDetailProduit;