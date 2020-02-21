import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useSelector } from 'react-redux';
import { FuseAnimateGroup } from '@fuse';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        marginTop: 10,
        maxWidth: '100%',
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

function ProduitListItem(props) {

    const produits = useSelector(({ produitsApp }) => produitsApp.produits.data);
    const loading = useSelector(({ produitsApp }) => produitsApp.produits.loading);
    const { classes } = props;
    return (
        <div className={classes.root}>
            {
                loading ?
                    'Loading ...'
                    :
                    (
                        <FuseAnimateGroup
                            enter={{
                                animation: "transition.slideUpBigIn"
                            }}
                        >
                            {
                                produits && produits.map((produit, index) => (

                                    <Paper className={classes.paper} key={index}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <ButtonBase className={classes.image}>
                                                    <img className={classes.img} alt="complex" src="assets/images/ecommerce/product-placeholder.jpg" />
                                                </ButtonBase>
                                            </Grid>
                                            <Grid item xs={12} sm container>
                                                <Grid item xs container direction="column" spacing={2}>
                                                    <Grid item xs>
                                                        <Typography gutterBottom variant="subtitle1">
                                                            Standard license
                                    </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            Full resolution 1920x1080 • JPEG
                                    </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            ID: 1030114
                                    </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                                            Remove
                                    </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1">19.00</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                ))
                            }

                        </FuseAnimateGroup>

                    )
            }

        </div>
    );
}

ProduitListItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProduitListItem);