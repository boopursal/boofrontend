import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, ListItem, List, ListItemText, Divider, Icon, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FuseAnimateGroup } from '@fuse';
import clsx from 'clsx';
import { green, red } from '@material-ui/core/colors';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Duree from './commande/Duree';

function getSteps() {
    return ['Configuration', 'Activités', 'Paiement'];
}

const useStyles = makeStyles(theme => ({

    badge: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.getContrastText(theme.palette.error.main)
    },
    price: {
        backgroundColor: theme.palette.primary[600],
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ddd'
    },
    populaire: {
        '&:before': {
            content: 'ddddddd',
        }
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },

}));

function Packs(props) {
    const classes = useStyles();
    const { currency } = props;
    const dispatch = useDispatch();
    const commande = useSelector(({ billingApp }) => billingApp.commande);
    const [offre, setOffre] = useState(null);
    const [duree, setDuree] = useState(null);
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    useEffect(() => {
        dispatch(Actions.getOffres());
    }, [dispatch]);

    useEffect(() => {
        dispatch(Actions.getDurees());
    }, [dispatch]);

    useEffect(() => {
        if (
            (commande.durees && !duree)
        ) {
            setDuree(commande.durees[0])
        }
    }, [duree, commande.durees, setDuree]);


    if (commande.loadingOffres) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <CircularProgress color="secondary" /> &ensp;
               Chargement ...
            </div>
        );
    }

    function handleChangeDuree(duree) {
        console.log(duree)
        setDuree(duree)
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Duree durees={commande.durees} offre={offre} selected={duree} loading={commande.loadingDuree} onChange={handleChangeDuree} currency={currency} />;
            case 1:
                return 'Step 2: What is an ad group anyways?';
            case 2:
                return 'Step 3: This is the bit I really care about!';
            default:
                return 'Unknown step';
        }
    }
    function handleSelectOffre(item) {
        setOffre(item);
        setOpen(true);

    }
    const handleClose = () => {
        setOpen(false);
        setOffre(null)

    };
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    return (
        <div>
            <div className="p-24 ">
                <div className="w-full max-w-2xl mx-auto">

                    <FuseAnimate duration={300} delay={600}>
                        <Grid container >
                            <Grid item xs={6} sm={6} md={4} container>
                                <Grid item xs={12} className="h-160">

                                </Grid>
                                <Grid item xs={12}>
                                    <List className={classes.root}>
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} >
                                            <ListItemText
                                                classes={{
                                                    primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                }}
                                                primary="Présentations de Produits / Services"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "text-10 sm:text-12 md:text-14 lg:text-15 ml-16"
                                                }}
                                                primary="Images / Photos"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "text-10 sm:text-12 md:text-14 lg:text-15 ml-16"
                                                }}
                                                primary="Fiches Techniques"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "text-10 sm:text-12 md:text-14 lg:text-15 ml-16"
                                                }}
                                                primary="Vidéos"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "text-10 sm:text-12 md:text-14 lg:text-15 ml-16"
                                                }}
                                                primary="Réception des demandes par produit exposé"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                }}
                                                primary="Activités"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                }}
                                                primary="Mini-site de votre société"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56" }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                }}
                                                primary="Catalogues produits"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                }}
                                                primary="Catalogues produits PDF téléchargeable"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                }}
                                                primary="Réception de demande de devis ( RFQ ) par mail"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                }}
                                                primary="Gestion commerciale"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "text-10 sm:text-12 md:text-14 lg:text-15 ml-16"
                                                }}
                                                primary="Création d’Agences / Services"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "text-10 sm:text-12 md:text-14 lg:text-15 ml-16"
                                                }}
                                                primary="Affectation les demandes d’achats ( RFQ )"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "text-10 sm:text-12 md:text-14 lg:text-15 ml-16"
                                                }}
                                                primary="Suivi des ventes de vos Agences / Services"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                }}
                                                primary="Présentation de produit en « 1ere Page »"

                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                        <ListItem classes={{ root: "h-60 sm:h-56 " }} alignItems="flex-start">
                                            <ListItemText
                                                classes={{
                                                    primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                }}
                                                primary="Bannière publicitaire 720x90px en « 1ere Page »"

                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} sm={6} md={8} container spacing={1}>
                                {// FREE 
                                }
                                <Grid item xs={12} sm={6} md={3} container>
                                    <Grid item xs={12} style={{
                                        background: "linear-gradient(to top left, #ddd 10%, #ddd 30%, #fff 60%, #fff 60%)",
                                        borderRadius: "20px 20px 0 0",
                                        border: "1px solid #ddd"
                                    }} className="text-center h-160 ">
                                        <div className="text-black uppercase font-extrabold pt-16 text-24">FREE</div>
                                        <div className="flex justify-center mt-12 text-black">
                                            <span className=" uppercase text-10 sm:text-12 md:text-14 lg:text-15">
                                                {currency === 'MAD' ? 'MAD' : '$'}
                                            </span>
                                            <span className=" uppercase font-extrabold text-32">
                                                00<span className="text-10">,00</span>
                                            </span>

                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <List className={classes.root}>
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                                                <ListItemText
                                                    justify="center"
                                                    classes={{
                                                        primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15 "
                                                    }}
                                                    primary={
                                                        <Icon style={{ color: green[500] }}>check_circle</Icon>
                                                    }

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                <ListItemText
                                                    classes={{
                                                        primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15 "
                                                    }}
                                                    primary="Max 5"

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                <ListItemText
                                                    classes={{
                                                        primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15 "
                                                    }}
                                                    primary="Max 5"

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                <ListItemText
                                                    classes={{
                                                        primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15 "
                                                    }}
                                                    primary="Max 5"

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                                                <ListItemText
                                                    classes={{
                                                        primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15 "
                                                    }}
                                                    primary="illimité"

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                <ListItemText
                                                    classes={{
                                                        primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                    }}
                                                    primary="Limité par Nbr. produits"

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                <ListItemText
                                                    classes={{
                                                        primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                    }}
                                                    primary={
                                                        <Icon style={{ color: green[500] }}>check_circle</Icon>
                                                    }

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                <ListItemText
                                                    classes={{
                                                        primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                    }}
                                                    primary={
                                                        <Icon style={{ color: green[500] }}>check_circle</Icon>
                                                    }

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                <ListItemText
                                                    classes={{
                                                        primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                    }}
                                                    primary={
                                                        <Icon style={{ color: red[500] }}>close</Icon>
                                                    }

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                <ListItemText
                                                    classes={{
                                                        primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                    }}
                                                    primary="illimité"

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                <ListItemText
                                                    classes={{
                                                        primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                    }}
                                                    primary={
                                                        <Icon style={{ color: red[500] }}>close</Icon>
                                                    }

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                <ListItemText
                                                    classes={{
                                                        primary: "text-10 sm:text-12 md:text-14 lg:text-15"
                                                    }}
                                                    primary={
                                                        <Icon style={{ color: red[500] }}>close</Icon>
                                                    }

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                <ListItemText
                                                    classes={{
                                                        primary: "text-10 sm:text-12 md:text-14 lg:text-15 "
                                                    }}
                                                    primary={
                                                        <Icon style={{ color: red[500] }}>close</Icon>
                                                    }

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                <ListItemText
                                                    classes={{
                                                        primary: "text-10 sm:text-12 md:text-14 lg:text-15"
                                                    }}
                                                    primary={
                                                        <Icon style={{ color: red[500] }}>close</Icon>
                                                    }

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                <ListItemText
                                                    classes={{
                                                        primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                    }}
                                                    primary={
                                                        <Icon style={{ color: red[500] }}>close</Icon>
                                                    }

                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                <ListItemText
                                                    classes={{
                                                        primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                    }}
                                                    primary={
                                                        <Icon style={{ color: red[500] }}>close</Icon>
                                                    }


                                                />
                                            </ListItem>
                                        </List></Grid>

                                </Grid>
                                {// FIN FREE 
                                }

                                {
                                    commande.offres && commande.offres.map((item, index) => (
                                        <Grid item xs={12} sm={6} md={3} key={item.id} className="flex hidden sm:block md:block lg:block ">

                                            <Grid item xs={12} style={{
                                                background: "linear-gradient(to top left, #ddd 10%, #ddd 30%, #fff 60%, #fff 60%)",
                                                borderRadius: "20px 20px 0 0",
                                                border: "1px solid #ddd"
                                            }} className="text-center h-160 ">
                                                <div className="text-green uppercase font-extrabold pt-16 text-16">{item.name}</div>
                                                <div className="flex justify-center mt-12 text-green">
                                                    <span className=" uppercase text-10 sm:text-12 md:text-14 lg:text-15">
                                                        {currency === 'MAD' ? 'MAD' : '$'}
                                                    </span>
                                                    <span className=" uppercase font-extrabold text-32">
                                                        {currency === 'MAD' ? item.prixMad : item.prixEur}
                                                        <span className="text-10">,00 / mois
                                                {currency === 'MAD' && ' HT'}</span>
                                                    </span>

                                                </div>
                                                <div className="mt-6">
                                                    <Button variant="contained" onClick={() => handleSelectOffre(item)} color="secondary"> sélectionner</Button>

                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <List className={classes.root}>
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                                                        <ListItemText
                                                            justify="center"
                                                            classes={{
                                                                primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15 "
                                                            }}
                                                            primary={
                                                                <Icon style={{ color: green[500] }}>check_circle</Icon>
                                                            }

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                        <ListItemText
                                                            classes={{
                                                                primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15 "
                                                            }}
                                                            primary="5 par produit"

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                        <ListItemText
                                                            classes={{
                                                                primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15 "
                                                            }}
                                                            primary="1 par produit"

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                        <ListItemText
                                                            classes={{
                                                                primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15 "
                                                            }}
                                                            primary="1 par produit"

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                                                        <ListItemText
                                                            classes={{
                                                                primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15 "
                                                            }}
                                                            primary="illimité"

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                        <ListItemText
                                                            classes={{
                                                                primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                            }}
                                                            primary={`Jusqu'à ${item.nbActivite} activités`}

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                        <ListItemText
                                                            classes={{
                                                                primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                            }}
                                                            primary={
                                                                <Icon style={{ color: green[500] }}>check_circle</Icon>
                                                            }

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                        <ListItemText
                                                            classes={{
                                                                primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                            }}
                                                            primary={
                                                                <Icon style={{ color: green[500] }}>check_circle</Icon>
                                                            }

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                        <ListItemText
                                                            classes={{
                                                                primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                            }}
                                                            primary={
                                                                <Icon style={{ color: red[500] }}>close</Icon>
                                                            }

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                        <ListItemText
                                                            classes={{
                                                                primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                            }}
                                                            primary="illimité"

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                        <ListItemText
                                                            classes={{
                                                                primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                            }}
                                                            primary={
                                                                <Icon style={{ color: red[500] }}>close</Icon>
                                                            }

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                        <ListItemText
                                                            classes={{
                                                                primary: "text-10 sm:text-12 md:text-14 lg:text-15"
                                                            }}
                                                            primary={
                                                                <Icon style={{ color: red[500] }}>close</Icon>
                                                            }

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                        <ListItemText
                                                            classes={{
                                                                primary: "text-10 sm:text-12 md:text-14 lg:text-15 "
                                                            }}
                                                            primary={
                                                                <Icon style={{ color: red[500] }}>close</Icon>
                                                            }

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                        <ListItemText
                                                            classes={{
                                                                primary: "text-10 sm:text-12 md:text-14 lg:text-15"
                                                            }}
                                                            primary={
                                                                <Icon style={{ color: red[500] }}>close</Icon>
                                                            }

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                        <ListItemText
                                                            classes={{
                                                                primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                            }}
                                                            primary="1 produit (1 mois)"

                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                    <ListItem classes={{ root: "h-60 sm:h-56 text-center" }} >
                                                        <ListItemText
                                                            classes={{
                                                                primary: "font-bold text-10 sm:text-12 md:text-14 lg:text-15"
                                                            }}
                                                            primary={
                                                                <Icon style={{ color: red[500] }}>close</Icon>
                                                            }


                                                        />
                                                    </ListItem>
                                                </List>
                                            </Grid>

                                        </Grid>
                                    ))
                                }


                            </Grid>
                        </Grid>
                    </FuseAnimate>
                    {/**
                    <div className="flex flex-col items-center py-96 text-center sm:text-left max-w-xl mx-auto">

                        <Typography variant="h4" className="pb-32 font-light">Frequently Asked Questions</Typography>

                        <div className="flex flex-wrap w-full">

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">How does free trial work?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a diam nec augue tincidunt
                                    accumsan. In dignissim laoreet ipsum eu interdum.
                                </Typography>
                            </div>

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">Can I cancel any time?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    Aliquam erat volutpat. Etiam luctus massa ex, at tempus tellus blandit quis. Sed quis neque tellus.
                                    Donec maximus ipsum in malesuada hendrerit.
                                </Typography>
                            </div>

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">What happens after my trial ended?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    Aliquam erat volutpat. Etiam luctus massa ex, at tempus tellus blandit quis. Sed quis neque tellus.
                                    Donec maximus ipsum in malesuada hendrerit.
                                </Typography>
                            </div>

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">Can I have a discount?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a diam nec augue tincidunt
                                    accumsan. In dignissim laoreet ipsum eu interdum.
                                </Typography>
                            </div>
                        </div>
                    </div>
                    */}
                </div>
                <Dialog
                    fullWidth={true}
                    maxWidth="md"
                    open={open}
                    disableBackdropClick={true}
                    disableEscapeKeyDown={true}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle onClose={handleClose} className="flex flex-col text-center" id="alert-dialog-title">
                        <p className="font-extrabold uppercase">Activation d'abonnement</p>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </DialogTitle>
                    <DialogContent dividers className="min-h-xs text-center">
                        <Typography variant="h6" className="mb-16" >
                            {offre && offre.name}
                        </Typography>
                        {activeStep === steps.length ? (
                            <div>
                                <Typography className={classes.instructions}>All steps completed</Typography>
                                <Button >Reset</Button>
                            </div>
                        ) : (
                                <div>
                                    {getStepContent(activeStep)}
                                </div>
                            )}
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={handleClose} color="primary">
                            Annuler
                         </Button>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                        >
                            Arrière
                         </Button>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Envoyer' : 'Suivant'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default Packs;
