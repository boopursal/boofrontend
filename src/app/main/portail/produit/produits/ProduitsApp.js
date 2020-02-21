import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, DemoContent, FuseAnimate } from '@fuse';
import { Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import SideBareSearch from './SideBareSearch';
import ContentList from './ContentList';

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

function useQuery(location) {
    return new URLSearchParams(location.search);
}

function ProduitsApp(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery(props.location);
    const params = props.match.params;
    const { secteur, activite, categorie } = params;
    const pays = query.get("pays");

    useEffect(() => {

        function updateProduitState() {
            dispatch(Actions.getProduits(params));
        }

        updateProduitState();
    }, [dispatch, params,pays]);

    useEffect(() => {

        function updateProduitState() {
            if(!secteur && !pays){
                dispatch(Actions.getSecteursAndPaysCounts());
            }
        }

        updateProduitState();
    }, [dispatch,params, pays]);

    return (
        <div className="flex flex-col">
            <div
                className={clsx(classes.middle, "mb-0 relative overflow-hidden flex flex-col flex-shrink-0  p-16 sm:p-24 h-96 sm:h-60 ")}>
                <div className={classes.overlay} />
                <Grid container spacing={2} className="max-w-2xl mx-auto px-8  sm:px-16 items-center z-9999">
                    <Grid item sm={12} xs={12}>
                        Header
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={2} className="max-w-2xl mx-auto py-48 sm:px-16 items-start">
                <Grid item sm={4} xs={12} className="sticky top-0 order-last sm:order-first">
                    <SideBareSearch  {...props} />
                </Grid>
                <Grid item sm={8} xs={12}>
                    <ContentList />
                </Grid>
            </Grid>

        </div>


    )
}

export default withReducer('produitsApp', reducer)(ProduitsApp);