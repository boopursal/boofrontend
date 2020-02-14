import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, DemoContent, FuseAnimate } from '@fuse';
import { Typography, Grid } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import DetailProduit from './DetailProduit';
import HeaderDetailProduit from './HeaderDetailProduit';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';

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

}));

function DetailProduitApp(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const produit = useSelector(({ detailProduitApp }) => detailProduitApp.detailProduit);

    useEffect(() => {

        function updateProduitState() {
            const params = props.match.params;
            const { slug } = params;
            dispatch(Actions.getProduit(slug));
        }

        updateProduitState();
    }, [dispatch, props.match.params]);


    return (
        <div className="flex flex-col">
            <div
                className={clsx(classes.middle, "mb-0 relative overflow-hidden flex flex-col flex-shrink-0  p-16 sm:p-24 h-96 sm:h-60 ")}>
                <div className={classes.overlay} />
                <Grid container spacing={2} className="max-w-2xl mx-auto px-8  sm:px-16 items-center z-9999">
                    <Grid item sm={12} xs={12}>
                        <HeaderDetailProduit {...props} />
                    </Grid>
                </Grid>
            </div>
            <DetailProduit {...props} />
        </div>


    )
}

export default withReducer('detailProduitApp', reducer)(DetailProduitApp);