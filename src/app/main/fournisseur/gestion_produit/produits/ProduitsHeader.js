import React,{useEffect,useState} from 'react';
import { Paper, Button, Input, Icon, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../store/actions';
import moment from 'moment';

function ProduitsHeader(props) {
    const dispatch = useDispatch();
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const parametres = useSelector(({ produitsFournisseursApp }) => produitsFournisseursApp.produits.parametres);
    const [abonnee, setAbonnee] = useState(false);
    const abonnement = useSelector(({ auth }) => auth.user.abonnement);

    useEffect(() => {
        if (abonnement) {
            let days = moment(abonnement.expired).diff(moment(), 'days');
            if (abonnement.statut && days > 0) {
                setAbonnee(true);
            }
        }
    }, [abonnement]);



    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="text-32 mr-0 sm:mr-12">shopping_cart</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex" variant="h6">Vos produits</Typography>
                </FuseAnimate>
            </div>

            <div className="flex flex-1 items-center justify-center px-12">

               
            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Button component={Link} to="/produits/new" className="whitespace-no-wrap" variant="contained">
                        <span className="hidden sm:flex">Ajouter nouveau produit</span>
                        <span className="flex sm:hidden">New</span>
                    </Button>
                </FuseAnimate>

        </div>
    );
}

export default ProduitsHeader;
