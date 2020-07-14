import React, { useState, useEffect } from 'react';
import { Tabs, Card, CardContent, Typography, Tab, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Icon } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import FournisseurTab from './tabs/FournisseurTab';
import AcheteurTab from './tabs/AcheteurTab';
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        background: 'radial-gradient(' + darken(theme.palette.secondary.dark, 0.5) + ' 0%, ' + theme.palette.secondary.dark + ' 80%)',
        color: theme.palette.primary.contrastText
    },
    cardcontent: {
        padding: 0,
        "&:last-child": {
            paddingBottom: 0
        }
    },
    green: {
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    inscription: {
        backgroundColor: '#f6f6f6',
        borderLeft: ' 1px solid #d9d9d9',
        [theme.breakpoints.down('xs')]: {
            borderLeft: 'none',
            borderTop: ' 1px solid #d9d9d9',
        }
    }
}));


function RegisterPage(props) {

    const classes = useStyles();
    const params = props.match.params;
    const { page } = params;
    const [selectedTab, setSelectedTab] = useState(page <= 2 && page >= 1 ? page - 1 : 0);

    useEffect(() => {
        setSelectedTab(page <= 2 && page >= 1 ? page - 1 : 0);
    }, [page]);

    function handleTabChange(event, value) {
        setSelectedTab(value);
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}>

            <div className="flex flex-col items-center justify-center w-full">

                <FuseAnimate animation="transition.expandIn">

                    <Card className="  max-w-xl">

                        <CardContent className={clsx("flex flex-col items-center justify-center", classes.cardcontent)}>

                            <Grid container >
                                <Grid item sm={7} xs={12} className="p-32">

                                    <Typography variant="h6" className="mt-16 mb-16 uppercase text-center">Inscrivez-vous en tant que :</Typography>

                                    <Tabs
                                        value={selectedTab}
                                        onChange={handleTabChange}
                                        variant="fullWidth"
                                        className="mb-32"
                                    >
                                        <Tab
                                            icon={<img className="h-40 " src="assets/images/logos/manufacture.png" alt="Fournisseur" />}
                                            className="min-w-0"
                                            label="Fournisseur"
                                        />
                                        <Tab
                                            icon={<img className="h-40" src="assets/images/logos/customer-behavior.png" alt="Acheteur" />}
                                            className="min-w-0"
                                            label="Acheteur"
                                        />

                                    </Tabs>

                                    {selectedTab === 0 && <FournisseurTab {...props} />}
                                    {selectedTab === 1 && <AcheteurTab {...props} />}


                                    <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                        <span className="font-medium text-blue">Vous avez déjà un compte?</span>
                                        <Link className="font-medium text-blue" to="/login">Connexion</Link>
                                    </div>
                                </Grid>

                                <Grid item sm={5} xs={12} className={clsx(" p-32", classes.inscription)}>
                                    {
                                        selectedTab === 0 ?
                                            <div>
                                                <Typography variant="h6" className="mt-16 mb-16 uppercase text-center">Création de compte <strong>FOURNISSEUR</strong></Typography>

                                                <Typography variant="subtitle1" className="text-center">L'inscription sur notre site est gratuite ainsi que la réception des demandes de prix. <br />
                                                    Afin de recevoir le maximum d'alertes, veuillez choisir le maximum de produits pour lesquelles vous souhaitez recevoir de demandes.
                                                </Typography>
                                                <List >
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar className={classes.green}>
                                                                <Icon>email</Icon>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Recevez des demandes" />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar className={classes.green}>
                                                                <Icon>group_work</Icon>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Découvrez votre prospect" />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar className={classes.green}>
                                                                <Icon>contact_phone</Icon>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Contactez directement votre prospect" />
                                                    </ListItem>
                                                </List>
                                            </div>
                                            :
                                            <div>
                                                <Typography variant="h6" className="mt-16 mb-16 uppercase text-center">Création de compte <strong>acheteur</strong></Typography>

                                                <Typography variant="subtitle1" className="text-center">Inscrivez-vous en tant qu'ACHETEUR. Vous pouvez vous inscrire en même temps en tant que FOURNISSEUR, dans ce cas vous devez vous déconnecter et vous inscrire en cliquant sur le lien FOURNISSEUR.
                                            </Typography>
                                                <List >
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar className={classes.green}>
                                                                <Icon>launch</Icon>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Lancez des demandes" />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar className={classes.green}>
                                                                <Icon>email</Icon>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Recevez des offres" />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar className={classes.green}>
                                                                <Icon>compare_arrows</Icon>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Comparez et décidez" />
                                                    </ListItem>
                                                </List>
                                            </div>
                                    }

                                </Grid>
                            </Grid>


                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default withRouter(RegisterPage);
