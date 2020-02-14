import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { NavLinkAdapter} from '@fuse';
import { ListItem, ListItemAvatar, Avatar, List, ListItemText, Icon } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 260,
    },
    mainAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: theme.palette.secondary.main,
      },
      lightAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: theme.palette.primary.light,
      },
      darkAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: theme.palette.primary.dark,
      },
}));

export default function BioFournisseur(props) {
    const classes = useStyles();
    const { post } = props;

    return (
        <CardActionArea component={NavLinkAdapter}
        to={'/register'} >
            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography component="h2" variant="h5">
                            Voulez-vous vendre sur Les Achats Industriels ?
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Créez un compte fournisseur avec nous et convertissez-vous en fournisseur du portail leader où professionnels et entreprises achètent vos produits.
                        </Typography>
                        <List >

                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={classes.mainAvatar}>
                                        <Icon >local_mall</Icon>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Que vous soyez novice sur internet ou expert en e-commerce, nous vous aidons à augmenter vos ventes en ligne"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={classes.lightAvatar}>
                                        <Icon >people_outline</Icon>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Élargissez votre réseau de clients avec de nouveaux acheteurs au niveau local, national et international"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={classes.darkAvatar}>
                                        <Icon >remove_red_eye</Icon>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Profitez de notre large audience. Plus de 200.000 acheteurs nous visitent chaque jour"
                                />
                            </ListItem>
                        </List>
                        <Typography variant="subtitle1" color="primary">
                            Continue reading...
              </Typography>
                    </CardContent>
                </div>
                <Hidden xsDown>
                    <CardMedia className={classes.cardMedia} image='https://source.unsplash.com/collection/9457511' title='Inscrivez-vous' />
                </Hidden>
            </Card>
        </CardActionArea>
    );
}

BioFournisseur.propTypes = {
    post: PropTypes.object,
};