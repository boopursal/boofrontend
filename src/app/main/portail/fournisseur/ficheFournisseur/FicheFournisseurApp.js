import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {  Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FicheFournisseur from './FicheFournisseur';
import HeaderFicheFournisseur from './HeaderFicheFournisseur';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    middle: {
        backgroundColor: theme.palette.grey[300],
        position: 'relative',
        marginBottom: theme.spacing(4),
    },
  

}));

function FicheFournisseurApp(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const parametres = useSelector(({ ficheFournisseurApp }) => ficheFournisseurApp.fournisseur.parametres);

    useEffect(() => {

        function updateFournisseurState() {
            const params = props.match.params;
            const { id,tab } = params;
            if(!tab){
                dispatch(Actions.getFournisseur(id));
                dispatch(Actions.getFournisseurProduitsApercu(id));
            }
            
            
        }

        updateFournisseurState();
    }, [dispatch, props.match.params]);

    useEffect(() => {

        function updateProduitsState() {
            const params = props.match.params;
            const { id,tab } = params;
            if(tab){
                dispatch(Actions.getFournisseur(id));
                dispatch(Actions.getFournisseurProduits(id, parametres));
                
            }
            
        }

        updateProduitsState();
    }, [dispatch, props.match.params, parametres]);

    return (
        <div className="flex flex-col min-h-xl">
            <div
                className={clsx(classes.middle, "mb-0 relative overflow-hidden flex flex-col flex-shrink-0 ")}>
                <Grid container spacing={2} className=" max-w-2xl mx-auto py-8  sm:px-16 items-center z-9999">
                    <Grid item sm={12} xs={12}>
                        <HeaderFicheFournisseur {...props} />
                    </Grid>
                </Grid>
            </div>
            <FicheFournisseur {...props} />
        </div>


    )
}

export default withReducer('ficheFournisseurApp', reducer)(FicheFournisseurApp);