import React, { useEffect, useState, useRef } from 'react';
import { Button, Tab, Tabs, InputAdornment, Icon, Typography, Divider, Grid, Avatar, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FusePageCarded, FuseUtils, TextFieldFormsy, SelectReactFormsy, SelectFormsy } from '@fuse';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import _ from '@lodash';
import Formsy from 'formsy-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    profileImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },

    profileImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $profileImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $profileImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $profileImageFeaturedStar': {
                opacity: 1
            }
        }
    },
}));
function Profile(props) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const profile = useSelector(({ profileApp }) => profileApp.profile);
    const user = useSelector(({ auth }) => auth.user);
    const Pays = useSelector(({ profileApp }) => profileApp.profile.pays);
    const Villes = useSelector(({ profileApp }) => profileApp.profile.villes);

    const formRef = useRef(null);
    const [showIce, setShowIce] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const [tabValue, setTabValue] = useState(0);
    const { form, handleChange, setForm } = useForm(null);


    //GET INFO SOCIETE
    useEffect(() => {
        function updateProfileState() {
            dispatch(Actions.getProfile(user.id));
        }
        updateProfileState();
    }, [dispatch, user.id]);

    //GET PAYS & SECTEURS

    useEffect(() => {
        dispatch(Actions.getPays());
        dispatch(Actions.getSousSecteurs());
    }, [dispatch, user.id]);

    //GET VILLE IF PAYS EXIST
    useEffect(() => {
        if (profile.data && !form) {
            if (profile.data.pays)
                dispatch(Actions.getVilles(profile.data.pays.id));
        }

    }, [dispatch, profile.data, form]);

    //SET ERRORS IN INPUTS AFTER ERROR API
    useEffect(() => {
        if (profile.error && (profile.error.societe || profile.error.newPassword || profile.error.newConfirmpassword || profile.error.oldPassword || profile.error.phone || profile.error.firstName || profile.error.lastName || profile.error.pays || profile.error.ville || profile.error.adresse1 || profile.error.adresse2 || profile.error.website || profile.error.fix || profile.error.ice || profile.error.description)) {
            {
                formRef.current.updateInputsWithError({
                    ...profile.error
                });

            }
            disableButton();
        }
    }, [profile.error]);

    //SET FORM DATA
    useEffect(() => {
        if (
            (profile.data && !form) ||
            (profile.data && form && profile.data.id !== form.id)
        ) {

            if (profile.data.sousSecteurs) {
                profile.data.sousSecteurs = profile.data.sousSecteurs.map(item => ({
                    value: item['@id'],
                    label: item.name
                }));
            }

            if (profile.data.ville)
                profile.data.ville = {
                    value: profile.data.ville.id,
                    label: profile.data.ville.name
                };
            if (profile.data.pays) {
                if (profile.data.pays.name === 'Maroc') {
                    setShowIce(true);
                }
                profile.data.pays = {
                    value: profile.data.pays.id,
                    label: profile.data.pays.name
                };

            }
            setForm({ ...profile.data });
        }

    }, [form, profile.data, setForm]);


    useEffect(() => {

        if (profile.avatar) {
            setForm(_.set({ ...form }, 'avatar', profile.avatar));
        }

    }, [form, profile.avatar, setForm]);

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }

    function handleChipChange(value, name) {

        if (name === 'sousSecteurs') {
            if (!_.some(value, 'value')) {
                setForm(_.set({ ...form }, name, ''));
            }
            else {
                setForm(_.set({ ...form }, name, value));
            }
        }
       else if (name === 'ville' ) {
            setForm(_.set({ ...form }, name, value));
        }
        else {
            form.ville = '';
            setForm(_.set({ ...form }, name, value));
            if (value.value) {
                dispatch(Actions.getVilles(value.value));
            }

            if (value.label === 'Maroc') {
                setShowIce(true)
            }
            else {
                setShowIce(false)
            }
        }

    }

    function handleUploadChange(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        dispatch(Actions.uploadAvatar(file, form.id));
    }


    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmitInfoSociete(model) {
        dispatch(Actions.updateSocieteInfo(model, form.id));
    }

    function handleSubmitSousSecteurs(model) {
        dispatch(Actions.updateSocieteSousSecteurs(model, form.id));
    }

    function handleSubmitInfoPerso(model) {
        dispatch(Actions.updateUserInfo(model, form.id));
    }
    function handleSubmitPassword(model) {
        dispatch(Actions.updatePassword(model, form.id));
    }

    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                !profile.requestFournisseur ? form && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    {form.avatar ?
                                        (
                                            <Avatar className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" alt="user photo" src={FuseUtils.getUrl() + form.avatar.url} />
                                        )
                                        :
                                        (
                                            <Avatar className="w-32 sm:w-48 mr-8 sm:mr-16 rounded">
                                                {form.firstName[0]}
                                            </Avatar>
                                        )
                                    }
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {form.firstName && form.lastName ? form.firstName + ' ' + form.lastName : 'NOM & Prénom'}

                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">{form.societe ? form.societe : 'Société'} {form.email ? ' | ' + form.email : ''}</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>

                    </div>
                ) :
                    <LinearProgress color="secondary" />
            }
            contentToolbar={
                !profile.requestFournisseur ?
                    form && (
                        <Tabs
                            value={tabValue}
                            onChange={handleChangeTab}
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="scrollable"
                            scrollButtons="auto"
                            classes={{ root: "w-full h-64" }}
                        >
                            <Tab className="h-64 normal-case" label="Info société" />
                            <Tab className="h-64 normal-case" label="Secteurs d'activités" />
                            <Tab className="h-64 normal-case" label="Info utilisateur" />
                            <Tab className="h-64 normal-case" label="Ma photo" />
                            <Tab className="h-64 normal-case" label="Mot de passe" />

                        </Tabs>)
                    :
                    <div className={classes.root}>
                        <LinearProgress color="secondary" />
                    </div>
            }
            content={
                form && (
                    <div className=" sm:p-10 max-w-2xl">
                        {tabValue === 0 &&
                            (
                                <Formsy
                                    onValidSubmit={handleSubmitInfoSociete}
                                    onValid={enableButton}
                                    onInvalid={disableButton}
                                    ref={formRef}
                                    className="flex pt-5 flex-col ">

                                    <Grid container spacing={3} className="mb-5">

                                        <Grid item xs={12} sm={8}>
                                            <div className="flex">

                                                <TextFieldFormsy
                                                    className=""
                                                    label="Raison sociale"
                                                    autoFocus
                                                    id="societe"
                                                    name="societe"
                                                    value={form.societe}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    validations={{
                                                        matchRegexp  :/^[a-z]|([a-z][0-9])|([0-9][a-z])|([a-z][0-9][a-z])+$/i,
                                                        minLength: 4,
                                                        maxLength: 20
                                                        
                                                    }}
                                                    validationErrors={{
                                                        minLength: 'Raison sociale doit dépasser 4 caractères alphanumériques',
                                                        maxLength: 'Raison sociale ne peut dépasser 20 caractères alphanumériques',
                                                        matchRegexp  :'Raison sociale doit contenir des caractères alphanumériques'
                                                    }}
                                                    required
                                                    fullWidth
                                                />
                                            </div>


                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <div className="flex">
                                                <TextFieldFormsy
                                                    className=""
                                                    type="text"
                                                    name="fix"
                                                    value={form.fix}
                                                    onChange={handleChange}
                                                    label="Fix"
                                                    autoComplete="fix"
                                                    validations={{
                                                        minLength: 10,
                                                        maxLength: 13,
                                                    }}
                                                    validationErrors={{
                                                        minLength: 'La longueur minimale de caractère est 10',
                                                        maxLength: 'La longueur maximale de caractère est 13'
                                                    }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">local_phone</Icon></InputAdornment>
                                                    }}
                                                    fullWidth
                                                    variant="outlined"
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <div className="flex">
                                                {
                                                    showIce ?
                                                        <TextFieldFormsy
                                                            className=""
                                                            type="text"
                                                            name="ice"
                                                            value={form.ice}
                                                            onChange={handleChange}
                                                            label="ICE"
                                                            autoComplete="ice"

                                                            validations={{
                                                                minLength: 15,
                                                                maxLength: 15,
                                                                isNumeric: "isNumeric",
                                                                matchRegexp  :/^(?!.*?(\w)\1{5}).*$/,
                                                            }}
                                                            validationErrors={{
                                                                minLength: 'La longueur minimale de caractère est 15',
                                                                maxLength: 'La longueur maximale de caractère est 15',
                                                                isNumeric: 'Cette valeur doit être numérique. ',
                                                                matchRegexp: 'ICE non valid. ',
                                                            }}

                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                        />
                                                        :
                                                        ''
                                                }

                                            </div>


                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <div className="flex">
                                                <TextFieldFormsy
                                                    className=""
                                                    type="text"
                                                    name="website"
                                                    value={form.website}
                                                    onChange={handleChange}
                                                    autoComplete="website"
                                                    label="Site Web"
                                                    validations="isUrl"
                                                    validationErrors={{
                                                        isUrl: 'Exemple : http://www.exemple.com',
                                                    }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">language</Icon></InputAdornment>
                                                    }}
                                                    fullWidth
                                                    variant="outlined"
                                                />
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
                                                    value={form.adresse1}
                                                    onChange={handleChange}
                                                    autoComplete="adresse"
                                                    label="Adresse 1"
                                                    validations={{
                                                        minLength: 10,
                                                    }}
                                                    validationErrors={{
                                                        minLength: 'La longueur minimale de caractère est 10',
                                                    }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                                                    }}
                                                    variant="outlined"
                                                    required
                                                    fullWidth

                                                />
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <SelectReactFormsy
                                                id="pays"
                                                name="pays"
                                                value={
                                                    form.pays
                                                }
                                                placeholder="Selectionner une Pays"
                                                textFieldProps={{
                                                    label: 'Pays',
                                                    InputLabelProps: {
                                                        shrink: true
                                                    },
                                                    variant: 'outlined'
                                                }}

                                                className="mt-20"
                                                options={Pays}
                                                onChange={(value) => handleChipChange(value, 'pays')}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <div className="flex">
                                                <TextFieldFormsy
                                                    className=""
                                                    type="text"
                                                    name="adresse2"
                                                    value={form.adresse2}
                                                    onChange={handleChange}
                                                    autoComplete="adresse"
                                                    label="Adresse 2"
                                                    validations={{
                                                        minLength: 10,
                                                    }}
                                                    validationErrors={{
                                                        minLength: 'La longueur minimale de caractère est 10',
                                                    }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">location_on</Icon></InputAdornment>
                                                    }}
                                                    variant="outlined"
                                                    fullWidth

                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <div className="flex">
                                                <TextFieldFormsy
                                                    className=""
                                                    type="number"
                                                    name="codepostal"
                                                    value={String(form.codepostal)}
                                                    onChange={handleChange}
                                                    validations={{
                                                        minLength: 5,
                                                        maxLength: 5,
                                                    }}
                                                    validationErrors={{
                                                        minLength: 'La longueur minimale de caractère est 5',
                                                        maxLength: 'La longueur maximale de caractère est 5',
                                                    }}
                                                    autoComplete="codepostal"
                                                    label="Code Postal"
                                                    variant="outlined"
                                                    fullWidth

                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>

                                            <SelectReactFormsy
                                                id="ville"
                                                name="ville"
                                                value={
                                                    form.ville
                                                }
                                                placeholder="Selectionner une ville"
                                                textFieldProps={{
                                                    label: 'Ville',
                                                    InputLabelProps: {
                                                        shrink: true
                                                    },
                                                    variant: 'outlined'
                                                }}
                                                className=""
                                                options={Villes}
                                                onChange={(value) => handleChipChange(value, 'ville')}
                                                required
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
                                                value={form.description}
                                                onChange={handleChange}
                                                label="Présentation"
                                                autoComplete="description"
                                                validations={{
                                                    minLength: 10,
                                                }}
                                                validationErrors={{
                                                    minLength: 'La longueur minimale de caractère est 10',
                                                }}

                                                variant="outlined"
                                                multiline
                                                rows="2"

                                            />

                                        </Grid>

                                    </Grid>


                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="w-200 pr-auto mt-16 normal-case"
                                        aria-label="Sauvegarder"
                                        disabled={!isFormValid || profile.loading}
                                        value="legacy"
                                    >
                                        Sauvegarder
                                        {profile.loading && <CircularProgress size={24} className={classes.buttonProgress} />}

                                    </Button>








                                </Formsy>
                            )}
                        {tabValue === 1 && (
                            <Formsy
                                onValidSubmit={handleSubmitSousSecteurs}
                                onValid={enableButton}
                                onInvalid={disableButton}
                                ref={formRef}
                                className="flex pt-5 flex-col ">

                                <SelectReactFormsy

                                    id="sousSecteurs"
                                    name="sousSecteurs"
                                    className="MuiFormControl-fullWidth MuiTextField-root mb-24"
                                    value={

                                        form.sousSecteurs


                                    }
                                    onChange={(value) => handleChipChange(value, 'sousSecteurs')}
                                    placeholder="Selectionner multiple secteurs d'activités"
                                    textFieldProps={{
                                        label: "Secteurs d'activités",
                                        InputLabelProps: {
                                            shrink: true
                                        },
                                        variant: 'outlined'
                                    }}
                                    options={profile.sousSecteurs}
                                    fullWidth
                                    isMulti
                                    required
                                />


                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="w-200 pr-auto mt-16 normal-case"
                                    aria-label="Sauvegarder"
                                    disabled={!isFormValid || profile.loading || !form.sousSecteurs}
                                    value="legacy"
                                >
                                    Sauvegarder
                           {profile.loading && <CircularProgress size={24} className={classes.buttonProgress} />}

                                </Button>

                            </Formsy>
                        )}
                        {tabValue === 2 && (
                            <Formsy
                                onValidSubmit={handleSubmitInfoPerso}
                                onValid={enableButton}
                                onInvalid={disableButton}
                                ref={formRef}
                                className="flex pt-5 flex-col ">

                                <Grid container spacing={3}>


                                    <Grid item xs={12} sm={2}>
                                        <SelectFormsy
                                            className="mb-16"
                                            name="civilite"
                                            label="Civilité"
                                            onChange={handleChange}
                                            value={form.civilite}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        >

                                            <MenuItem value="M.">M.</MenuItem>
                                            <MenuItem value="Mme">Mme</MenuItem>
                                            <MenuItem value="Mlle">Mlle</MenuItem>
                                        </SelectFormsy>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <TextFieldFormsy
                                            className="mb-16"
                                            type="text"
                                            name="lastName"
                                            value={form.lastName}
                                            onChange={handleChange}
                                            label="Nom"
                                            validations={{
                                                minLength: 4
                                            }}
                                            validationErrors={{
                                                minLength: 'La longueur minimale de caractère est 4'
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                                            }}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <TextFieldFormsy
                                            className="mb-16"
                                            value={form.firstName}
                                            onChange={handleChange}
                                            type="text"
                                            name="firstName"
                                            label="Prénom"
                                            validations={{
                                                minLength: 4
                                            }}
                                            validationErrors={{
                                                minLength: 'La longueur minimale de caractère est 4'
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                                            }}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    </Grid>

                                </Grid>
                                <Divider />

                                <Grid container spacing={3} className="mt-5">



                                    <Grid item xs={12} sm={6}>
                                        <TextFieldFormsy
                                            className="mb-16"
                                            type="text"
                                            name="email"
                                            value={form.email}
                                            label="Email"
                                            variant="outlined"
                                            disabled
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextFieldFormsy
                                            className="mb-16"
                                            value={form.phone}
                                            onChange={handleChange}
                                            type="text"
                                            name="phone"
                                            label="Téléphone"
                                            validations={{
                                                minLength: 10,
                                                maxLength: 13,
                                            }}
                                            validationErrors={{
                                                minLength: 'La longueur minimale de caractère est 10',
                                                maxLength: 'La longueur maximale de caractère est 13'
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">local_phone</Icon></InputAdornment>
                                            }}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    </Grid>

                                </Grid>



                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="w-200 pr-auto mt-16 normal-case"
                                    aria-label="Sauvegarder"
                                    disabled={!isFormValid || profile.loading}
                                    value="legacy"
                                >
                                    Sauvegarder
                               {profile.loading && <CircularProgress size={24} className={classes.buttonProgress} />}

                                </Button>

                            </Formsy>
                        )}
                        {tabValue === 3 && (
                            <div>
                                <input
                                    accept="image/jpeg,image/gif,image/png"
                                    className="hidden"
                                    id="button-file"
                                    type="file"
                                    disabled={profile.profileReqInProgress}
                                    onChange={handleUploadChange}
                                />
                                <div className="flex justify-center sm:justify-start flex-wrap">
                                    <label
                                        htmlFor="button-file"

                                        className={
                                            clsx(
                                                classes.profileImageUpload,
                                                "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",

                                            )}
                                    >
                                        {
                                            profile.profileReqInProgress ?
                                                <CircularProgress size={24} className={classes.buttonProgress} />
                                                :
                                                <Icon fontSize="large" color="action">cloud_upload</Icon>

                                        }
                                    </label>

                                    <div
                                        className={
                                            clsx(
                                                classes.profileImageItem,
                                                "flex items-center cursor-pointer justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden  shadow-1 hover:shadow-5")
                                        }
                                        onClick={form.avatar ? () => window.open(FuseUtils.getUrl() + form.avatar.url, "_blank") : console.log('')}
                                    >
                                        {form.avatar ?
                                            <img className="max-w-none w-auto h-full"
                                                src={FuseUtils.getUrl() + form.avatar.url}
                                                alt={form.societe} />
                                            :
                                            <img className="max-w-none w-auto h-full"
                                                src="assets/images/avatars/profile.jpg"
                                                alt={form.societe} />}
                                    </div>


                                </div>

                            </div>
                        )}
                        {tabValue === 4 && (
                            <Formsy
                                onValidSubmit={handleSubmitPassword}
                                onValid={enableButton}
                                onInvalid={disableButton}
                                ref={formRef}
                                className="flex pt-5 flex-col ">

                                <TextFieldFormsy
                                    className="mb-16"
                                    type="password"
                                    name="oldPassword"
                                    label="Mot de passe actuel"
                                    validations={{
                                        minLength: 6
                                    }}
                                    validationErrors={{
                                        minLength: 'Min character length is 6'
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                    }}
                                    variant="outlined"
                                    required
                                />

                                <TextFieldFormsy
                                    className="mb-16"
                                    type="password"
                                    name="newPassword"
                                    label="Nouveau mot de passe"
                                    validations={{
                                        minLength: 6
                                    }}
                                    validationErrors={{
                                        minLength: 'Min character length is 6'
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                    }}
                                    variant="outlined"
                                    required
                                />

                                <TextFieldFormsy
                                    className="mb-16"
                                    type="password"
                                    name="newConfirmpassword"
                                    label="Confirmer le mot de passe"
                                    validations="equalsField:newPassword"
                                    validationErrors={{
                                        equalsField: 'Passwords do not match'
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                    }}
                                    variant="outlined"
                                    required
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="w-200 pr-auto mt-16 normal-case"
                                    aria-label="Sauvegarder"
                                    disabled={!isFormValid || profile.loading}
                                    value="legacy"
                                >
                                    Sauvegarder
                           {profile.loading && <CircularProgress size={24} className={classes.buttonProgress} />}

                                </Button>

                            </Formsy>
                        )}

                    </div>
                )
            }
            innerScroll
        />
    )
}

export default withReducer('profileApp', reducer)(Profile);
