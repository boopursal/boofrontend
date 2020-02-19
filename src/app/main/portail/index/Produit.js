import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardActionArea, CardContent, CardActions, Button, CardMedia, Chip, Icon } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import _ from '@lodash';
import {FuseUtils} from '@fuse';
import moment from 'moment';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    mediaProduit: {
        height: 200,
    },
}));

export default function Produit(props) {
    const classes = useStyles();
    const { produit } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={`/detail-produit/${produit.sousSecteurs.slug}/${produit.categorie.slug}/${produit.id}-${produit.slug}`}>
                <CardMedia
                    className={classes.mediaProduit}
                    image={produit.featuredImageId ?
                        FuseUtils.getUrl() + produit.featuredImageId.url
                        :
                        'assets/images/ecommerce/product-placeholder.jpg'
                    }
                    title={produit.titre}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h5">
                        {_.capitalize(_.truncate(produit.titre, {
                            'length': 18
                        }))}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">Réf.{produit.reference}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className="mb-16 mt-8">
                        {_.capitalize(_.truncate(produit.description, {
                            'length': 150
                        }))}
                    </Typography>
                    {
                        produit.images.length > 0 ?
                            <Chip
                                icon={<Icon className="text-16 mr-0">image</Icon>}
                                label={produit.images.length}
                                classes={{
                                    root: "h-24",
                                    label: "pl-4 pr-6 py-4 text-11",
                                    deleteIcon: "w-16 ml-0",
                                    ...props.classes
                                }}
                                variant="outlined"
                                className="mr-4"
                            />
                            : ''
                    }
                    {
                        produit.videos ?
                            <Chip
                                icon={<Icon className="text-16 mr-0">videocam</Icon>}
                                label="1"
                                classes={{
                                    root: "h-24",
                                    label: "pl-4 pr-6 py-4 text-11",
                                    deleteIcon: "w-16 ml-0",
                                    ...props.classes
                                }}
                                variant="outlined"
                                className="mr-4"
                            />
                            : ''
                    }

                    {
                        produit.ficheTechnique ?
                            <Chip
                                icon={<Icon className="text-16 mr-0">picture_as_pdf</Icon>}
                                label="1 fiche technique"
                                classes={{
                                    root: "h-24",
                                    label: "pl-4 pr-6 py-4 text-11",
                                    deleteIcon: "w-16 ml-0",
                                    ...props.classes
                                }}
                                variant="outlined"
                                className="mr-4"
                            />
                            : ''
                    }


                </CardContent>
            </CardActionArea>
            
        </Card>
    );
}

Produit.propTypes = {
    produit: PropTypes.object,
};