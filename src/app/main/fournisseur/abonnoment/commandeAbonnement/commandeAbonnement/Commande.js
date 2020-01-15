import React, { useEffect, useState } from 'react';
import { Button, Icon, Typography, LinearProgress, Grid, FormControlLabel, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Divider, Chip, Avatar, Radio, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/styles';
import { FuseAnimate, FusePageCarded, SelectReactFormsyS_S, RadioGroupFormsy } from '@fuse';
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
import ContentLoader from 'react-content-loader'

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
    const commande = useSelector(({ commandeOffreApp }) => commandeOffreApp.commande);

    const user = useSelector(({ auth }) => auth.user);

    const [sousSecteurs, setSousSecteurs] = useState([]);
    const [sousSecteur, setSousSecteur] = useState('');
    const [secteur, setSecteur] = useState('');
    const [sousSecteursFrounisseur, setSousSecteursFrounisseur] = useState(null);
    const [offre, setOffre] = useState(null);
    const [mode, setMode] = useState(null);
    const [duree, setDuree] = useState(null);
    const [open, setOpen] = useState(false);
    const [formActive, setFormActive] = useState(1);
    const { form, setForm } = useForm(null);
    const [prixht, setPrixht] = useState(0);
    const [tva, setTva] = useState(0);
    const [remise, setRemise] = useState(0);
    const [prixhtNet, setPrixhtNet] = useState(0);
    const [prixTTC, setPrixTTC] = useState(0);
    const classes = useStyles(props);

    useEffect(() => {
        dispatch(Actions.getOffres());
        dispatch(Actions.getFournisseurSousSecteurs(user.id));
        dispatch(Actions.getSousSecteurs());
        dispatch(Actions.getPaiements());
        dispatch(Actions.getDurees());
    }, [dispatch, user.id]);

    // Effect redirection and clean state
    useEffect(() => {
        if (commande.success) {

            dispatch(Actions.cleanUp())
            props.history.push('/offres/commande');
        }
    }, [commande.success, dispatch]);

    // Effect redirection and clean state
    useEffect(() => {
        if (commande.successActivite) {
            setOpen(false);
        }
    }, [commande.successActivite, setOpen]);

    useEffect(() => {
        function updateCommandeState() {
            const params = props.match.params;
            const { commandeId } = params;

            if (commandeId === 'new') {
                dispatch(Actions.newCommande());
            }
            else {
                dispatch(Actions.getCommande(commandeId));

            }
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
            if (commande.data.duree) {

                setDuree(commande.data.duree);

                if (commande.data.offre) {
                    if (commande.data.fournisseur.currency.name === 'DHS') {
                        let ht = commande.data.offre.prixMad * commande.data.duree.name;
                        setPrixht(ht)

                        if (commande.data.duree.remise) {
                            let remis = ht * commande.data.duree.remise / 100;
                            let netHt = ht - remis;
                            let tva = netHt * 0.2;
                            setRemise(remis)
                            setPrixhtNet(netHt)
                            setTva(tva)
                            setPrixTTC(netHt + tva)

                        } else {
                            let tva = ht * 0.2;
                            setTva(ht * 0.2)
                            setPrixTTC(ht + tva)
                        }

                    }
                    else {
                        let ht = commande.data.offre.prixEur * commande.data.duree.name;
                        setPrixht(ht)

                        if (commande.data.duree.remise) {
                            let remis = ht * commande.data.duree.remise / 100;
                            let netHt = ht - remis;
                            let tva = netHt * 0.2;

                            setRemise(remis)
                            setPrixhtNet(netHt)
                            setTva(tva)
                            setPrixTTC(netHt + tva)

                        } else {
                            let tva = ht * 0.2;
                            setTva(ht * 0.2)
                            setPrixTTC(ht + tva)
                        }

                    }

                }
            }
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

    useEffect(() => {
        if (
            (commande.durees && !duree)
        ) {
            setDuree(commande.durees[0]);
            if (offre) {
                if (user.data.currency === 'DHS') {
                    let ht = offre.prixMad * commande.durees[0].name;
                    setPrixht(ht)

                    if (commande.durees[0].remise) {
                        let remis = ht * commande.durees[0].remise / 100;
                        let netHt = ht - remis;
                        let tva = netHt * 0.2;
                        setRemise(remis)
                        setPrixhtNet(netHt)
                        setTva(tva)
                        setPrixTTC(netHt + tva)

                    } else {
                        let tva = ht * 0.2;
                        setTva(ht * 0.2)
                        setPrixTTC(ht + tva)
                    }

                }
                else {
                    let ht = offre.prixEur * commande.durees[0].name;
                    setPrixht(ht)

                    if (commande.durees[0].remise) {
                        let remis = ht * commande.durees[0].remise / 100;
                        let netHt = ht - remis;
                        let tva = netHt * 0.2;

                        setRemise(remis)
                        setPrixhtNet(netHt)
                        setTva(tva)
                        setPrixTTC(netHt + tva)

                    } else {
                        let tva = ht * 0.2;
                        setTva(ht * 0.2)
                        setPrixTTC(ht + tva)
                    }

                }

            }

        }
    }, [duree, commande.durees, setDuree]);

    useEffect(() => {
        if (
            (commande.fournisseur && !sousSecteursFrounisseur)
        ) {
            setSousSecteursFrounisseur(commande.fournisseur.sousSecteurs.map(item => ({
                value: item['@id'],
                label: item.name
            })));

        }
    }, [sousSecteursFrounisseur, commande.fournisseur, setSousSecteursFrounisseur]);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleChangeForm(form) {
        setFormActive(form);
    }

    function handleChangeDuree(item) {
        setDuree(item);
        if (user.data.currency === 'DHS') {
            let ht = offre.prixMad * item.name;
            setPrixht(ht)

            if (item.remise) {
                let remis = ht * item.remise / 100;
                let netHt = ht - remis;
                let tva = netHt * 0.2;
                setRemise(remis)
                setPrixhtNet(netHt)
                setTva(tva)
                setPrixTTC(netHt + tva)

            } else {
                let netHt = ht;
                let tva = netHt * 0.2;
                setTva(tva)
                setPrixhtNet(netHt)
                setPrixTTC(netHt + tva)
            }

        }
        else {
            let ht = offre.prixEur * item.name;
            setPrixht(ht)

            if (item.remise) {
                let remis = ht * item.remise / 100;
                let netHt = ht - remis;
                let tva = netHt * 0.2;

                setRemise(remis)
                setPrixhtNet(netHt)
                setTva(tva)
                setPrixTTC(netHt + tva)

            } else {
                let netHt = ht;
                let tva = netHt * 0.2;
                setTva(tva)
                setPrixhtNet(netHt)
                setPrixTTC(netHt + tva)
            }

        }
    }

    function handleChangeOffre(item) {
        setOffre(item);
        if (sousSecteurs.length > 0) {
            setSousSecteurs(_.slice(sousSecteurs, 0, item.nbActivite));
        }

        if (user.data.currency === 'DHS') {
            let ht = item.prixMad * duree.name;
            setPrixht(ht)

            if (duree.remise) {
                let remis = ht * duree.remise / 100;
                let netHt = ht - remis;
                let tva = netHt * 0.2;
                setRemise(remis)
                setPrixhtNet(netHt)
                setTva(tva)
                setPrixTTC(netHt + tva)

            } else {
                let netHt = ht;
                let tva = netHt * 0.2;
                setTva(tva)
                setPrixhtNet(netHt)
                setPrixTTC(netHt + tva)
            }

        }
        else {
            let ht = item.prixEur * duree.name;
            setPrixht(ht)

            if (duree.remise) {
                let remis = ht * duree.remise / 100;
                let netHt = ht - remis;
                let tva = netHt * 0.2;

                setRemise(remis)
                setPrixhtNet(netHt)
                setTva(tva)
                setPrixTTC(netHt + tva)

            } else {
                let netHt = ht;
                let tva = netHt * 0.2;
                setTva(tva)
                setPrixhtNet(netHt)
                setPrixTTC(netHt + tva)
            }

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

    function handleChipChange2(value) {


        if (!_.some(value, 'value')) {
            setSousSecteursFrounisseur([]);
        }
        else {
            setSousSecteursFrounisseur(value);
        }
    }

    function handleSubmit(form) {
        //event.preventDefault();

        const params = props.match.params;
        const { commandeId } = params;

        if (commandeId === 'new') {
            dispatch(Actions.saveCommande(form, sousSecteurs, offre, mode, duree));
        }
        else {
            dispatch(Actions.updateCommande(form, sousSecteurs, offre, mode, duree));
        }
    }

    function handleSubmitActivites() {
        //event.preventDefault();
        if (formActive === 1) {
            dispatch(Actions.updateSocieteSousSecteurs(sousSecteursFrounisseur, user.id));
        }
        else {
            dispatch(Actions.AddSuggestionSecteur(secteur, sousSecteur, user.id));
            //dispatch(Actions.putDemande(model, form.id));
        }
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/offres/commande" color="inherit">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Retour
                                </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">

                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <div className="text-16 sm:text-20 truncate">
                                                {commande.data.reference ? commande.data.reference : 'Nouvelle Commande'}
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
                                    Passer la commande
                                    {commande.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </Button>
                            </FuseAnimate>
                        </div>
                    )
                    :
                    ''
            }
            contentToolbar={
                commande.loading || !form ?

                    (<div className={classes.root}>
                        <LinearProgress color="secondary" />
                    </div>)
                    :
                    ''

            }
            content={
                !commande.loading ?

                    form && (
                        <div className="p-10  sm:p-24 max-w-2xl">

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
                                            commande.offres && offre && commande.fournisseur ?
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
                                                                        commande.fournisseur.currency.name === 'DHS' ?
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

                                                :
                                                <ContentLoader
                                                    height={160}
                                                    width={400}
                                                    speed={2}
                                                    primaryColor="#f3f3f3"
                                                    secondaryColor="#ecebeb"
                                                >
                                                    <circle cx="10" cy="20" r="8" />
                                                    <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
                                                    <circle cx="10" cy="50" r="8" />
                                                    <rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
                                                    <circle cx="10" cy="80" r="8" />
                                                    <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
                                                </ContentLoader>
                                        }
                                        <Divider className="mt-8" />
                                        {
                                            commande.fournisseur ?
                                                <>
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
                                                        options={commande.fournisseur.sousSecteurs}
                                                        fullWidth
                                                        isMulti
                                                        required
                                                    />
                                                    <Typography className="mt-4" variant="caption">{"Les activités qui s'affichent dans la liste déroulante sont les activités qui vous avez ajoutés durant l'inscription, Si vous n'avez pas trouvé ici l'un de vous activités, veuillez cliquer sur le lien ci-dessous pour l'ajouter."}</Typography>
                                                    <div className="mt-4">

                                                        <Link2
                                                            component="button"
                                                            variant="body2"
                                                            color="secondary"
                                                            onClick={handleClickOpen}
                                                        >
                                                            Ajouter autres activités
                                                                </Link2>
                                                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                                            <DialogTitle id="form-dialog-title">Vos activités</DialogTitle>
                                                            <DialogContent>
                                                                {formActive === 1 ?
                                                                    (
                                                                        commande.sousSecteurs && (
                                                                            <>
                                                                                <DialogContentText>
                                                                                    Si vos activités n´existent pas, veuillez nous les envoyer en cliquant
                                                                        &ensp;<Link2
                                                                                        component="button"
                                                                                        variant="body2"
                                                                                        color="secondary"
                                                                                        onClick={() => handleChangeForm(2)}
                                                                                    >
                                                                                        ici
                                                                            </Link2>
                                                                                </DialogContentText>

                                                                                <SelectReactFormsyS_S
                                                                                    id="sousSecteursF"
                                                                                    name="sousSecteursF"
                                                                                    value={
                                                                                        sousSecteursFrounisseur
                                                                                    }
                                                                                    onChange={(value) => handleChipChange2(value)}
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
                                                                            </>
                                                                        )
                                                                    )
                                                                    :
                                                                    <Grid container spacing={3} >
                                                                        <Grid item xs={12} sm={12}>
                                                                            <DialogContentText>
                                                                                Pour retourner a la liste de vos activité cliquer
                                                                        &ensp;<Link2
                                                                                    component="button"
                                                                                    color="secondary"
                                                                                    onClick={() => handleChangeForm(1)}
                                                                                >
                                                                                    ici
                                                                            </Link2>
                                                                            </DialogContentText>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6}>
                                                                            <TextField
                                                                                className="mt-8 mb-16"
                                                                                error={secteur.length <= 2}
                                                                                required
                                                                                label="Secteur"
                                                                                autoFocus
                                                                                value={secteur}
                                                                                id="secteur"
                                                                                name="secteur"
                                                                                onChange={(event) => setSecteur(event.target.value)}
                                                                                variant="outlined"
                                                                                fullWidth
                                                                                helperText={secteur.length <= 2 ? 'Ce champ doit contenir au moins 3 caractères' : ''}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6}>
                                                                            <TextField
                                                                                className="mt-8 mb-16"
                                                                                id="sousSecteur"
                                                                                name="sousSecteur"
                                                                                error={sousSecteur.length <= 2}
                                                                                onChange={(event) => setSousSecteur(event.target.value)}
                                                                                label="Activité"
                                                                                type="text"
                                                                                required
                                                                                value={sousSecteur}
                                                                                variant="outlined"
                                                                                fullWidth
                                                                                helperText={sousSecteur.length <= 2 ? 'Ce champ doit contenir au moins 3 caractères ' : ''}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>}
                                                            </DialogContent>
                                                            <Divider />
                                                            <DialogActions>
                                                                <Button onClick={handleClose} variant="outlined" color="primary">
                                                                    Annnuler
                                                    </Button>
                                                                <Button onClick={handleSubmitActivites} variant="contained" color="secondary"
                                                                    disabled={commande.loadingSuggestion || (formActive === 2 && (sousSecteur.length < 2 || secteur.length <= 2)) || (formActive === 1 && (sousSecteursFrounisseur && !sousSecteursFrounisseur.length))}
                                                                >
                                                                    Sauvegarder
                                                      {commande.loadingSuggestion && <CircularProgress size={24} className={classes.buttonProgress} />}
                                                                </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </div>
                                                </>
                                                :
                                                <ContentLoader
                                                    height={70}
                                                    width={400}
                                                    speed={2}
                                                    primaryColor="#f3f3f3"
                                                    secondaryColor="#ecebeb"
                                                >
                                                    <rect x="1" y="13" rx="5" ry="5" width="220" height="24" />
                                                </ContentLoader>
                                        }

                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {
                                            commande.offres && offre && duree ?
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
                                                                * {duree.name + ' mois'}
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                                className="truncate text-11 text-right"
                                                            >
                                                                {
                                                                    parseFloat(prixht).toLocaleString(
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
                                                                    parseFloat(prixht).toLocaleString(
                                                                        'fr', // leave undefined to use the browser's locale,
                                                                        // or use a string like 'en-US' to override it.
                                                                        { minimumFractionDigits: 2 }
                                                                    )
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                        {
                                                            duree.remise ?
                                                                <TableRow className="" >
                                                                    <TableCell
                                                                        component="th"
                                                                        scope="row"
                                                                        className="truncate text-11 text-right"
                                                                    >
                                                                        Remise ({duree.remise}%)
                                                            </TableCell>
                                                                    <TableCell
                                                                        component="th"
                                                                        scope="row"
                                                                        className="truncate text-11 text-right"
                                                                    >
                                                                        {
                                                                            parseFloat(remise).toLocaleString(
                                                                                'fr', // leave undefined to use the browser's locale,
                                                                                // or use a string like 'en-US' to override it.
                                                                                { minimumFractionDigits: 2 }
                                                                            )
                                                                        }
                                                                    </TableCell>
                                                                </TableRow>
                                                                :
                                                                null

                                                        }
                                                        {
                                                            prixhtNet > 0 && prixhtNet !== prixht ?
                                                                <TableRow className="bg-gray-200" >
                                                                    <TableCell
                                                                        component="th"
                                                                        scope="row"
                                                                        className="truncate text-11 text-right"
                                                                    >
                                                                        Montant NET HT
                                                                    </TableCell>
                                                                    <TableCell
                                                                        component="th"
                                                                        scope="row"
                                                                        className="truncate text-11 text-right"
                                                                    >
                                                                        {
                                                                            parseFloat(prixhtNet).toLocaleString(
                                                                                'fr', // leave undefined to use the browser's locale,
                                                                                // or use a string like 'en-US' to override it.
                                                                                { minimumFractionDigits: 2 }
                                                                            )
                                                                        }

                                                                    </TableCell>
                                                                </TableRow>
                                                                :
                                                                null

                                                        }
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
                                                                    parseFloat(tva).toLocaleString(
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
                                                                className="truncate font-bold text-11 text-right"
                                                            >
                                                                Montant TTC
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                                className="truncate font-bold text-13 text-right"
                                                            >
                                                                {
                                                                    parseFloat(prixTTC).toLocaleString(
                                                                        'fr', // leave undefined to use the browser's locale,
                                                                        // or use a string like 'en-US' to override it.
                                                                        { minimumFractionDigits: 2 }
                                                                    )

                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>

                                                </Table>
                                                :
                                                <ContentLoader
                                                    height={160}
                                                    width={400}
                                                    speed={2}
                                                    primaryColor="#f3f3f3"
                                                    secondaryColor="#ecebeb"
                                                >
                                                    <circle cx="10" cy="20" r="8" />
                                                    <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
                                                    <circle cx="10" cy="50" r="8" />
                                                    <rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
                                                    <circle cx="10" cy="80" r="8" />
                                                    <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
                                                </ContentLoader>
                                        }


                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} className="">
                                    <Grid item xs={12} sm={6}>
                                        <Typography className="mb-16" variant="h6">2- Mode de paiement </Typography>

                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className="mb-16" variant="h6">3- Durée de votre abonnement</Typography>

                                    </Grid>
                                </Grid>

                                <Divider />
                                <Grid container spacing={3} className="mt-6 mb-16">
                                    <Grid item xs={12} sm={6}>
                                        {
                                            commande.paiements ?
                                                commande.paiements.map((item, index) => (
                                                    <FormControlLabel onChange={() => setMode(item['@id'])} key={index} value={item['@id']} checked={mode === item['@id']} control={<Radio />} label={item.name} />
                                                ))
                                                :
                                                <ContentLoader
                                                    height={70}
                                                    width={400}
                                                    speed={2}
                                                    primaryColor="#f3f3f3"
                                                    secondaryColor="#ecebeb"
                                                >
                                                    <circle cx="15" cy="17" r="6" />
                                                    <rect x="25" y="11" rx="5" ry="5" width="100" height="12" />
                                                    <circle cx="145" cy="17" r="6" />
                                                    <rect x="155" y="11" rx="5" ry="5" width="100" height="12" />
                                                </ContentLoader>
                                        }


                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {
                                            commande.durees && duree ?
                                                commande.durees.map((item, index) => (
                                                    <>
                                                        <FormControlLabel onChange={() => handleChangeDuree(item)} key={index} value={item['@id']} checked={duree.id === item.id} control={<Radio />} label={item.name + ' mois'} />

                                                        {
                                                            item.remise ?
                                                                <span className="text-12 text-red">(Soit {item.remise}% de remise )</span>
                                                                : ''
                                                        }

                                                    </>
                                                ))
                                                :
                                                <ContentLoader
                                                    height={70}
                                                    width={400}
                                                    speed={2}
                                                    primaryColor="#f3f3f3"
                                                    secondaryColor="#ecebeb"
                                                >
                                                    <circle cx="15" cy="17" r="6" />
                                                    <rect x="25" y="11" rx="5" ry="5" width="100" height="12" />
                                                    <circle cx="145" cy="17" r="6" />
                                                    <rect x="155" y="11" rx="5" ry="5" width="100" height="12" />
                                                </ContentLoader>
                                        }
                                    </Grid>
                                </Grid>

                            </Formsy>



                        </div>
                    )
                    : ''
            }
            innerScroll
        />
    )
}

export default withReducer('commandeOffreApp', reducer)(Commande);
