import React, { useEffect, useState } from 'react';
import { Button, Icon, Typography, LinearProgress, Grid, FormControlLabel, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Divider, Chip, Avatar, Radio, Table, TableHead, TableRow, TableCell, TableBody, Tab, Tabs, InputAdornment } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/styles';
import { FuseAnimate, FusePageCarded, SelectReactFormsyS_S, RadioGroupFormsy, TextFieldFormsy } from '@fuse';
import { Link } from 'react-router-dom';
import Link2 from '@material-ui/core/Link';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import Formsy from 'formsy-react';
import { useForm } from '@fuse/hooks';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';


const useStyles = makeStyles(theme => ({

    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },

    commandeImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: red[400],
        opacity: 0
    },
    button: {
        margin: theme.spacing(1),
    },
    commandeImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },

    commandeImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $commandeImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $commandeImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $commandeImageFeaturedStar': {
                opacity: 1
            }
        }
    },

    error: {
        backgroundColor: theme.palette.error.dark,
    },

    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    margin: {
        margin: theme.spacing(1),
    },

    chip: {
        marginLeft: theme.spacing(1),
        background: '#ef5350',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px'

    },
    chip2: {
        marginLeft: theme.spacing(1),
        background: '#4caf50',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px'
    },
    chip3: {
        margin: theme.spacing(1),
        background: 'green',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px'

    },
}));


function Commande(props) {

    const dispatch = useDispatch();
    const commande = useSelector(({ commandeOffreAdminApp }) => commandeOffreAdminApp.commande);
    const [sousSecteurs, setSousSecteurs] = useState([]);
    const [offre, setOffre] = useState(null);
    const [discount, setDiscount] = useState(0);
    
    const [mode, setMode] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const { form, setForm } = useForm(null);

    const classes = useStyles(props);

    useEffect(() => {
        dispatch(Actions.getOffres());
        dispatch(Actions.getSousSecteurs());
        dispatch(Actions.getPaiements());
    }, [dispatch]);

    // Effect redirection and clean state
    useEffect(() => {
        if (commande.success) {

            dispatch(Actions.cleanUp())
            props.history.push('/admin/offres/commande');
        }
    }, [commande.success, dispatch]);


    useEffect(() => {
        function updateCommandeState() {
            const params = props.match.params;
            const { commandeId } = params;
            dispatch(Actions.getCommande(commandeId));

        }

        updateCommandeState();
        return () => {
            dispatch(Actions.cleanUp())
        }
    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (
            (commande.data && !form) ||
            (commande.data && form && commande.data.id !== form.id)
        ) {
            setForm({ ...commande.data });

            if (commande.data.sousSecteurs) {
                setSousSecteurs(commande.data.sousSecteurs.map(item => ({
                    value: item['@id'],
                    label: item.name
                })));
            }
            if (commande.data.offre)
                setOffre(commande.data.offre)
            if (commande.data.mode)
                setMode(commande.data.mode['@id'])
        }
    }, [form, commande.data, setForm]);

    useEffect(() => {
        if (
            (commande.offres && !offre)
        ) {
            setOffre(commande.offres[0]);

        }
    }, [offre, commande.offres, setOffre]);

    useEffect(() => {
        if (
            (commande.paiements && !mode)
        ) {
            setMode(commande.paiements[0]['@id']);

        }
    }, [mode, commande.paiements, setMode]);


    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }


    function handleChangeOffre(item) {
        setOffre(item);
        if (sousSecteurs.length > 0) {
            setSousSecteurs(_.slice(sousSecteurs, 0, item.nbActivite));
        }

    }

    function handleChipChange(value, name) {


        if (value.length > offre.nbActivite) {
            return;
        }
        if (!_.some(value, 'value')) {
            setSousSecteurs('');
        }
        else {

            setSousSecteurs(value);
        }
    }


    function handleSubmit(form) {
        //event.preventDefault();

        const params = props.match.params;
        const { commandeId } = params;

        dispatch(Actions.updateCommande(form, sousSecteurs, offre, mode));

    }



    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                !commande.loading
                    ?

                    form && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/admin/offres/commande" color="inherit">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Retour
                                </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">

                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <div className="text-16 sm:text-20 truncate">
                                                {commande.data.reference ? commande.data.reference + ', Fournisseur : ' + commande.data.fournisseur.societe : ''}
                                            </div>
                                        </FuseAnimate>

                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={sousSecteurs.length === 0}
                                    onClick={() => handleSubmit(form, sousSecteurs)}
                                >
                                    Valider la commande
                                    {commande.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </Button>
                            </FuseAnimate>
                        </div>
                    )
                    :
                    ''
            }
            contentToolbar={
                commande.loading || !form || !commande.offres || !commande.paiements ?

                    (<div className={classes.root}>
                        <LinearProgress color="secondary" />
                    </div>)
                    :
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{ root: "w-full h-64" }}
                    >
                        <Tab className="h-64 normal-case" label="Détail de la commande" />
                        <Tab className="h-64 normal-case" label="Info. Fournisseur" />


                    </Tabs>

            }
            content={
                !commande.loading ?

                    form && commande.offres && commande.paiements && (
                        <div className="p-10  sm:p-24 max-w-2xl">
                            {tabValue === 0 && (
                                <Formsy
                                    className="flex flex-col "
                                >
                                    <Grid container spacing={3} className="">
                                        <Grid item xs={12} sm={6}>
                                            <Typography className="mb-16" variant="h6">1- Offres & Activités</Typography>

                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography className="mb-16" variant="h6">Récapitulatif de votre commande</Typography>

                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <Grid container spacing={3} className="mt-16 mb-16">
                                        <Grid item xs={12} sm={6}>
                                            {

                                                commande.offres.map((item, index) => (
                                                    <Grid container key={index} spacing={3} >
                                                        <Grid item xs={6} sm={6}>
                                                            <strong className="p-1" >
                                                                {item.name}
                                                            </strong> <br />
                                                            <span className="p-1" >
                                                                {item.description}
                                                            </span>
                                                        </Grid>
                                                        <Grid item xs={6} sm={6}>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={offre.id === item.id}
                                                                            onChange={() => handleChangeOffre(item)}
                                                                            value={item['@id']}
                                                                        />
                                                                    }
                                                                    label={
                                                                        form.fournisseur.currency.name === 'DHS' ?
                                                                            parseFloat(item.prixMad).toLocaleString(
                                                                                'fr', // leave undefined to use the browser's locale,
                                                                                // or use a string like 'en-US' to override it.
                                                                                { minimumFractionDigits: 2 }
                                                                            ) + ' DHS HT / mois' :
                                                                            parseFloat(item.prixEur).toLocaleString(
                                                                                'fr', // leave undefined to use the browser's locale,
                                                                                // or use a string like 'en-US' to override it.
                                                                                { minimumFractionDigits: 2 }
                                                                            ) + ' € HT / mois'
                                                                    }
                                                                />
                                                            </FormGroup>
                                                        </Grid>

                                                    </Grid>

                                                ))


                                            }
                                            <SelectReactFormsyS_S
                                                className="mt-16 z-9999"
                                                id="sousSecteurs"
                                                name="sousSecteurs"
                                                value={
                                                    sousSecteurs
                                                }
                                                onChange={(value) => handleChipChange(value, 'sousSecteurs')}
                                                placeholder={"Sélectionner vos activités"}
                                                textFieldProps={{
                                                    label: 'Activités',
                                                    InputLabelProps: {
                                                        shrink: true
                                                    },
                                                    variant: 'outlined'
                                                }}
                                                options={commande.sousSecteurs}
                                                fullWidth
                                                isMulti
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>

                                            <Table className="w-full -striped">
                                                <TableHead className="bg-gray-200">
                                                    <TableRow>
                                                        <TableCell

                                                            className="font-bold  text-black"
                                                        >
                                                            Offre
                                                            </TableCell>
                                                        <TableCell
                                                            className="font-bold text-black text-right"
                                                        >
                                                            Total HT
                                                            </TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            className="truncate text-11"
                                                        >
                                                            <strong>{offre ? offre.name : ''}</strong>
                                                            <br />
                                                            {
                                                                parseFloat(offre.prixMad).toLocaleString(
                                                                    'fr', // leave undefined to use the browser's locale,
                                                                    // or use a string like 'en-US' to override it.
                                                                    { minimumFractionDigits: 2 }
                                                                )
                                                            }
                                                            * 12 mois
                                                    </TableCell>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            className="truncate text-11 text-right"
                                                        >
                                                            {
                                                                parseFloat(offre.prixMad * 12).toLocaleString(
                                                                    'fr', // leave undefined to use the browser's locale,
                                                                    // or use a string like 'en-US' to override it.
                                                                    { minimumFractionDigits: 2 }
                                                                )
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow className="bg-gray-200" >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            className="truncate text-11 text-right"
                                                        >
                                                            Total HT
                                                    </TableCell>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            className="truncate text-11 text-right"
                                                        >
                                                            {
                                                                parseFloat(offre.prixMad * 12).toLocaleString(
                                                                    'fr', // leave undefined to use the browser's locale,
                                                                    // or use a string like 'en-US' to override it.
                                                                    { minimumFractionDigits: 2 }
                                                                )
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow className="" >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            className="truncate text-11 text-right"
                                                        >
                                                            TVA (20%)
                                                    </TableCell>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            className="truncate text-11 text-right"
                                                        >
                                                            {
                                                                parseFloat((offre.prixMad * 12) * 0.2).toLocaleString(
                                                                    'fr', // leave undefined to use the browser's locale,
                                                                    // or use a string like 'en-US' to override it.
                                                                    { minimumFractionDigits: 2 }
                                                                )
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow className="bg-gray-200" >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            className="text-11 text-right"
                                                        >
                                                            Remise
                                                    </TableCell>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            className="truncate text-11 text-right"
                                                        >
                                                            <TextFieldFormsy
                                                                type="number"
                                                                step="any"
                                                                name="discount"
                                                                id="discount"
                                                                onChange={(ev)=> {console.log(ev.target.value);setDiscount(ev.target.value)}}
                                                                value={discount}
                                                                
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow className="bg-green-200" >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            className="font-bold text-11 text-right"
                                                        >
                                                            Montant TTC
                                                    </TableCell>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            className="truncate font-bold text-13 text-right"
                                                        >
                                                            {
                                                                discount > 0 && discount ?
                                                                parseFloat(((offre.prixMad * 12) + ((offre.prixMad * 12) * 0.2))-parseFloat(discount)).toLocaleString(
                                                                    'fr', // leave undefined to use the browser's locale,
                                                                    // or use a string like 'en-US' to override it.
                                                                    { minimumFractionDigits: 2 }
                                                                ):
                                                                parseFloat(((offre.prixMad * 12) + ((offre.prixMad * 12) * 0.2))).toLocaleString(
                                                                    'fr', // leave undefined to use the browser's locale,
                                                                    // or use a string like 'en-US' to override it.
                                                                    { minimumFractionDigits: 2 }
                                                                )
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>

                                            </Table>

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} className="">
                                        <Grid item xs={12} sm={6}>
                                            <Typography className="mb-16" variant="h6">2-  Mode de paiement</Typography>

                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography className="mb-16" variant="h6">3- Durée de votre abonnement</Typography>

                                        </Grid>
                                    </Grid>

                                    <Divider />
                                    <Grid container spacing={3} className="mt-6 mb-16">
                                        <Grid item xs={12} sm={6}>
                                            {

                                                commande.paiements.map((item, index) => (
                                                    <FormControlLabel onChange={() => setMode(item['@id'])} key={index} value={item['@id']} checked={mode === item['@id']} control={<Radio />} label={item.name} />
                                                ))
                                            }


                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Chip
                                                avatar={
                                                    <Avatar>
                                                        12
                                                </Avatar>
                                                }
                                                color="secondary"
                                                label="Mois"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </Grid>

                                </Formsy>
                            )}

                            {tabValue === 1 && (
                                <Formsy

                                    className="flex flex-col">

                                    <Grid container spacing={3} className="mb-5">

                                        <Grid item xs={12} sm={4}>
                                            <div className="flex">
                                                <TextFieldFormsy
                                                    className=""
                                                    type="text"
                                                    name="fullname"
                                                    value={commande.data.fournisseur.civilite + ' ' + commande.data.fournisseur.firstName + ' ' + commande.data.fournisseur.lastName}
                                                    label="Nom complet"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth

                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <div className="flex">
                                                <TextFieldFormsy
                                                    className=""
                                                    name="email"
                                                    value={commande.data.fournisseur.email}
                                                    label="Email"
                                                    fullWidth
                                                    InputProps={{
                                                        readOnly: true,
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>

                                                    }}

                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextFieldFormsy
                                                className=""
                                                type="text"
                                                name="phonep"
                                                id="phonep"
                                                value={commande.data.fournisseur.phone}
                                                label="Téléphone"
                                                InputProps={{
                                                    readOnly: true,
                                                    endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">local_phone</Icon></InputAdornment>
                                                }}
                                                fullWidth
                                            />

                                        </Grid>

                                    </Grid>
                                    <Divider />
                                    <Grid container spacing={3} className="mb-5">

                                        <Grid item xs={12} sm={8}>
                                            <div className="flex">

                                                <TextFieldFormsy
                                                    className="mt-20"
                                                    label="Raison sociale"
                                                    id="societe"
                                                    name="societe"
                                                    value={commande.data.fournisseur.societe}
                                                    fullWidth
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </div>


                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <div className="flex">
                                                <TextFieldFormsy
                                                    className="mt-20"
                                                    name="fix"
                                                    value={commande.data.fournisseur.fix}
                                                    label="Fix"
                                                    InputProps={{
                                                        readOnly: true,
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">local_phone</Icon></InputAdornment>
                                                    }}
                                                    fullWidth
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>


                                            <TextFieldFormsy
                                                id="secteur"
                                                className=""
                                                name="secteur"
                                                label="Secteur"
                                                value={commande.data.fournisseur.sousSecteurs ? _.join(_.map(commande.data.fournisseur.sousSecteurs, 'name'), ', ') : ''}
                                                fullWidth
                                                multiline
                                                rows="3"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />


                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <div className="flex">
                                                <TextFieldFormsy
                                                    id="website"
                                                    className=""
                                                    type="text"
                                                    name="website"
                                                    value={commande.data.fournisseur.website}
                                                    label="Site Web"
                                                    InputProps={{
                                                        readOnly: true,
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">language</Icon></InputAdornment>
                                                    }}
                                                    fullWidth
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <div className="flex">
                                                {
                                                    commande.data.fournisseur.ice ?
                                                        <TextFieldFormsy
                                                            className=""
                                                            type="text"
                                                            name="ice"
                                                            id="ice"
                                                            value={commande.data.fournisseur.ice}
                                                            label="ICE"
                                                            fullWidth
                                                            InputProps={{
                                                                readOnly: true,
                                                            }}
                                                        />
                                                        :
                                                        ''
                                                }

                                            </div>

                                        </Grid>


                                    </Grid>
                                    <Divider />


                                    <Grid container spacing={3} className="mb-5">

                                        <Grid item xs={12} sm={8}>
                                            <div className="flex">

                                                <TextFieldFormsy
                                                    className="mt-20"
                                                    type="text"
                                                    name="adresse1"
                                                    id="adresse1"
                                                    value={commande.data.fournisseur.adresse1}
                                                    label="Adresse 1"
                                                    InputProps={{
                                                        readOnly: true,
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                                                    }}
                                                    fullWidth

                                                />
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextFieldFormsy
                                                className="mt-20"
                                                type="text"
                                                name="pays"
                                                id="pays"
                                                value={commande.data.fournisseur.pays ? commande.data.fournisseur.pays.name : ''}
                                                label="Pays"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                fullWidth
                                            />

                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <div className="flex">
                                                <TextFieldFormsy
                                                    className=""
                                                    type="text"
                                                    name="adresse2"
                                                    value={commande.data.fournisseur.adresse2}
                                                    label="Adresse 2"
                                                    InputProps={{
                                                        readOnly: true,
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                                                    }}
                                                    fullWidth

                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <div className="flex">
                                                <TextFieldFormsy
                                                    className=""
                                                    name="codepostal"
                                                    value={String(commande.data.fournisseur.codepostal)}
                                                    label="Code Postal"
                                                    fullWidth
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}

                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextFieldFormsy
                                                className=""
                                                type="text"
                                                name="ville"
                                                id="ville"
                                                value={commande.data.fournisseur.ville ? commande.data.fournisseur.ville.name : ''}
                                                label="Ville"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                fullWidth
                                            />

                                        </Grid>

                                    </Grid>
                                    <Divider />

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>

                                            <TextFieldFormsy
                                                className="mb-5 mt-20  w-full"
                                                type="text"
                                                name="description"
                                                value={commande.data.fournisseur.description}
                                                label="Présentation"
                                                multiline
                                                rows="2"
                                                InputProps={{
                                                    readOnly: true,
                                                }}

                                            />

                                        </Grid>

                                    </Grid>




                                </Formsy>
                            )}

                        </div>
                    )
                    : ''
            }
            innerScroll
        />
    )
}

export default withReducer('commandeOffreAdminApp', reducer)(Commande);
