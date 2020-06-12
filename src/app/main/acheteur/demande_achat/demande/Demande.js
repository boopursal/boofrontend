import React, { useRef, useEffect, useState } from 'react';
import { Button, Tab, Tabs, InputAdornment, Icon, Typography, LinearProgress, Grid, CircularProgress, Popper, Chip, IconButton, Tooltip, SnackbarContent, ListItemText, FormControlLabel, Radio } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/styles';
import { FuseAnimate, FusePageCarded, FuseUtils, TextFieldFormsy, DatePickerFormsy, CheckboxFormsy, RadioGroupFormsy } from '@fuse';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import Formsy from 'formsy-react';
import moment from 'moment';
import green from '@material-ui/core/colors/green';
import ErrorIcon from '@material-ui/icons/Error';
import ReactTable from "react-table";
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Highlighter from "react-highlight-words";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    chips: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    demandeImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: red[400],
        opacity: 0
    },
    demandeImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    select: {
        zIndex: 999,
    },
    demandeImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $demandeImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $demandeImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $demandeImageFeaturedStar': {
                opacity: 1
            }
        }
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing(2),
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
    }
}));
moment.defaultFormat = "DD/MM/YYYY HH:mm";
function renderSuggestion(suggestion, { query, isHighlighted }) {
    return (

        <MenuItem selected={isHighlighted} component="div" className="z-999" dense={true}>
            <ListItemText
                className="pl-0 "
                primary={
                    <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[query]}
                        autoEscape={true}
                        textToHighlight={suggestion.name}
                    />
                }
            />
        </MenuItem>

    );

}
function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;
    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

function Demande(props) {
    const suggestionsNode = useRef(null);
    const popperNode = useRef(null);
    const searchCategories = useSelector(({ demandesAcheteurApp }) => demandesAcheteurApp.searchCategories);
    const [categories, setCategories] = React.useState([]);
    const dispatch = useDispatch();
    const demande = useSelector(({ demandesAcheteurApp }) => demandesAcheteurApp.demande);
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);
    const { form, handleChange, setForm } = useForm(null);

    const classes = useStyles(props);
    const [tabValue, setTabValue] = useState(0);
    const params = props.match.params;
    const { demandeId } = params;

    useEffect(() => {
        function updateDemandeState() {
            if (demandeId === 'new') {
                dispatch(Actions.newDemande());
            }
            else {
                dispatch(Actions.getDemande(demandeId));
            }
        }
        updateDemandeState();
        return () => {
            dispatch(Actions.cleanUpDemande())
        }
    }, [dispatch, demandeId]);


    useEffect(() => {
        if (demande.error && (demande.error.titre || demande.error.description || demande.error.dateExpiration || demande.error.isPublic || demande.error.isAnonyme || demande.error.sousSecteurs)) {
            formRef.current.updateInputsWithError({
                ...demande.error
            });
            disableButton();
            demande.error = null;
        }
    }, [demande.error]);


    useEffect(() => {

        if (demande.attachement) {
            setForm(_.set({ ...form }, 'attachements', [
                demande.attachement,
                ...form.attachements
            ]));
            demande.attachement = null;
        }

    }, [form, setForm, demande.attachement]);


    useEffect(() => {
        if (demande.attachement_deleted) {
            setForm(_.set({ ...form }, 'attachements', _.pullAllBy(form.attachements, [{ 'id': demande.attachement_deleted }], 'id')));
            demande.attachement_deleted = null;
        }
    }, [demande.attachement_deleted]);

    console.log(categories)

    useEffect(() => {
        if (
            (demande.data && !form) ||
            (demande.data && form && demande.data.id !== form.id)
        ) {
            setForm({ ...demande.data });
            if (demande.data.categories) {
                //let sousSecteurs = demande.data.sousSecteurs.map(item => ({
                //  value: item['@id'],
                // label: item.name
                // }));
                // setForm(_.set({ ...demande.data }, 'sousSecteurs', sousSecteurs));
                setCategories(demande.data.categories.map(item => item));
            }
        }
    }, [form, demande.data, setForm]);

    function handleCheckBoxChange(e, name) {

        setForm(_.set({ ...form }, name, e.target.checked));
    }

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }

    function handleUploadChange(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        dispatch(Actions.uploadAttachement(file));
    }

    function handleDateChange(value, name) {
        //setForm(_.set({...form}, name, value.map(item => item.value)));
        setForm(_.set({ ...form }, name, moment(value).format('YYYY-MM-DDTHH:mm:ssZ')));
    }

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleChangeSearch(event) {
        dispatch(Actions.setGlobalSearchText(event))
    }
    function showSearch() {
        dispatch(Actions.showSearch());
        document.addEventListener("keydown", escFunction, false);
    }

    function escFunction(event) {
        if (event.keyCode === 27) {
            hideSearch();
            dispatch(Actions.cleanUp());
        }

    }

    function hideSearch() {
        dispatch(Actions.hideSearch());
        document.removeEventListener("keydown", escFunction, false);

    }


    function handleSuggestionsFetchRequested({ value, reason }) {
        console.log(reason)
        if (reason === 'input-changed') {
            value && value.trim().length > 1 && dispatch(Actions.loadSuggestions(value.trim()));
            // Fake an AJAX call
        }

    }
    function handleSuggestionsClearRequested() {
        //dispatch(Actions.hideSearch());

    }
    const autosuggestProps = {
        renderInputComponent,
        //alwaysRenderSuggestions: true,
        suggestions: searchCategories.suggestions,
        focusInputOnSuggestionClick: false,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        renderSuggestion
    };

    function handleDelete(id) {
        setCategories(_.reject(categories, function (o) { return o.id == id; }))
    }
    function handleRadioChange(e) {

        setForm(_.set({ ...form }, 'localisation', parseInt(e.target.value)));
    }
    function handleSubmit() {
        //event.preventDefault();

        const params = props.match.params;
        const { demandeId } = params;

        if (demandeId === 'new') {
            dispatch(Actions.saveDemande(form, props.history, categories));
        }
        else {
            dispatch(Actions.putDemande(form, form.id, props.history, categories));
        }
    }

    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                !demande.loading
                    ?

                    form && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/demandes" color="inherit">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Retour
                                </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">

                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.titre ? form.titre : 'Nouvelle Demande'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Détails de la demande</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>

                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!isFormValid || demande.loading || !categories.length}
                                    onClick={() => handleSubmit(form)}
                                >
                                    Sauvegarder
                                    {demande.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </Button>
                            </FuseAnimate>
                        </div>
                    )
                    :
                    ''
            }
            contentToolbar={
                demande.loading ?
                    <div className={classes.root}>
                        <LinearProgress color="secondary" />
                    </div>
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
                        <Tab className="h-64 normal-case" label="Infos générales" />
                        <Tab className="h-64 normal-case"
                            label={
                                form && form.attachements.length > 0
                                    ? "Pièce(s) jointe(s) (" + form.attachements.length + ")"
                                    : "Pièce(s) jointe(s)"}

                        />
                        
                        {/*form && form.diffusionsdemandes.length > 0 ?
                            <Tab className="h-64 normal-case" label={"Diffuser (" + form.diffusionsdemandes.length + " fois)"} />
                        : ''*/}

                    </Tabs>

            }
            content={
                !demande.loading ?

                    form && (
                        <div className="p-10  sm:p-24 max-w-2xl">
                            {tabValue === 0 &&
                                (
                                    <Formsy
                                        onValidSubmit={handleSubmit}
                                        onValid={enableButton}
                                        onInvalid={disableButton}
                                        ref={formRef}
                                        className="flex flex-col ">

                                        {
                                            form.statut && (form.statut === 2)
                                                ?
                                                <SnackbarContent
                                                    className={clsx(classes.margin, classes.error)}
                                                    aria-describedby="client-snackbar"
                                                    message={
                                                        <span id="client-snackbar" className={classes.message}>
                                                            <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
                                                            Motif du rejet: {form.motifRejet ? form.motifRejet.name : ''}
                                                        </span>
                                                    }

                                                /> : ''
                                        }
                                        <Grid container spacing={3} className="mb-8">

                                            <Grid item xs={12} sm={12}>
                                                <Typography variant="caption"  >
                                                    - Soumettez votre demande c'est gratuit et sans engagement.<br />
                                                    - Détaillez la demande, vous recevrez de meilleures offres.<br />
                                                    - Attention seules les demandes sérieuses (pas de projets étudiants) seront validées.
                                                 </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3} >
                                            <Grid item xs={12} sm={8}>
                                                <TextFieldFormsy
                                                    className="mb-24"
                                                    label="Titre"
                                                    autoFocus
                                                    id="titre"
                                                    name="titre"
                                                    value={form.titre}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    validations={{
                                                        minLength: 4,
                                                        maxLength: 255,
                                                    }}
                                                    validationErrors={{
                                                        minLength: 'Min character length is 4',
                                                        maxLength: 'Max character length is 255'
                                                    }}
                                                    required
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextFieldFormsy
                                                    className="mb-24"
                                                    label="Référence"
                                                    id="reference"
                                                    name="reference"
                                                    value={form.reference ? form.reference : 'En attente'}
                                                    variant="outlined"
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">RFQ-</InputAdornment>,
                                                    }}
                                                    disabled
                                                    fullWidth
                                                />
                                            </Grid>


                                        </Grid>

                                        <Grid container spacing={3} >

                                            <Grid item xs={12} sm={6}>

                                                <DatePickerFormsy
                                                    className="mb-24"
                                                    label="Date d'éxpiration"
                                                    id="dateExpiration"
                                                    name="dateExpiration"
                                                    value={form.dateExpiration}
                                                    onChange={(value) => handleDateChange(value, 'dateExpiration')}
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <TextFieldFormsy
                                                    className="mb-24"
                                                    label="Budget"
                                                    id="budget"
                                                    type="number"
                                                    name="budget"
                                                    value={_.toString(form.budget)}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    validations={{

                                                        isNumeric: true,
                                                    }}
                                                    validationErrors={{
                                                        isNumeric: 'Numeric value required',

                                                    }}
                                                    step='any'
                                                    required
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>

                                        <div ref={popperNode} >
                                            <Autosuggest
                                                {...autosuggestProps}
                                                getSuggestionValue={suggestion => searchCategories.searchText}
                                                onSuggestionSelected={(event, { suggestion, method }) => {
                                                    if (method === "enter") {
                                                        event.preventDefault();
                                                    }
                                                    !_.find(categories, ['name', suggestion.name]) &&
                                                        setCategories([suggestion, ...categories]);
                                                    //setForm(_.set({ ...form }, 'categories', suggestion['@id']))
                                                    //hideSearch();
                                                    popperNode.current.focus();
                                                }}
                                                required
                                                inputProps={{
                                                    classes,
                                                    label: 'Activités',
                                                    placeholder: "Activité (ex: Rayonnage lourd)",
                                                    value: searchCategories.searchText,
                                                    variant: "outlined",
                                                    name: "categories",
                                                    onChange: handleChangeSearch,
                                                    onFocus: showSearch,
                                                    InputLabelProps: {
                                                        shrink: true,
                                                    }

                                                }}
                                                theme={{
                                                    container: classes.container,
                                                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                                    suggestionsList: classes.suggestionsList,
                                                    suggestion: classes.suggestion,
                                                }}
                                                renderSuggestionsContainer={options => (
                                                    <Popper
                                                        anchorEl={popperNode.current}
                                                        open={Boolean(options.children) || searchCategories.noSuggestions || searchCategories.loading}
                                                        popperOptions={{ positionFixed: true }}
                                                        className="z-9999 mb-8"
                                                    >
                                                        <div ref={suggestionsNode}>
                                                            <Paper
                                                                elevation={1}
                                                                square
                                                                {...options.containerProps}
                                                                style={{ width: popperNode.current ? popperNode.current.clientWidth : null }}
                                                            >
                                                                {options.children}
                                                                {searchCategories.noSuggestions && (
                                                                    <Typography className="px-16 py-12">
                                                                        Aucun résultat..
                                                                    </Typography>
                                                                )}
                                                                {searchCategories.loading && (
                                                                    <div className="px-16 py-12 text-center">
                                                                        <CircularProgress color="secondary" /> <br /> Chargement ...
                                                                    </div>
                                                                )}
                                                            </Paper>
                                                        </div>
                                                    </Popper>
                                                )}
                                            />
                                        </div>
                                        <div className={clsx(classes.chips)}>
                                            {
                                                categories && categories.length > 0 &&
                                                categories.map((item, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={item.name}
                                                        onDelete={() => handleDelete(item.id)}
                                                        className="mt-8 mr-8"
                                                    />
                                                ))


                                            }
                                        </div>

                                        <TextFieldFormsy
                                            className="mb-16 mt-16  w-full"
                                            type="text"
                                            name="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            label="Description"
                                            autoComplete="description"
                                            validations={{
                                                minLength: 10,
                                            }}
                                            validationErrors={{
                                                minLength: 'La longueur minimale de caractère est 10',
                                            }}
                                            required
                                            variant="outlined"
                                            multiline
                                            rows="4"

                                        />


                                        <Grid container spacing={3} className="flex items-center">
                                            <Grid item xs={12} sm={4} >
                                                <RadioGroupFormsy
                                                    className="inline"
                                                    name="statut"
                                                    label="Diffuser à l'échelle"
                                                    onChange={handleRadioChange}
                                                >
                                                
                                                    <FormControlLabel  value="2" checked={form.localisation === 2} control={<Radio />} label="Locale" />
                                                    <FormControlLabel  value="3" checked={form.localisation === 3} control={<Radio />} label="Internationale" />
                                                    <FormControlLabel value="1" checked={form.localisation === 1} control={<Radio />} label="Les deux" />

                                                </RadioGroupFormsy>
                                            </Grid>
                                            <Grid item xs={12} sm={4} className="flex items-center"> 
                                                <CheckboxFormsy
                                                    name="isPublic"
                                                    onChange={(e) => handleCheckBoxChange(e, 'isPublic')}
                                                    value={form.isPublic}
                                                    label="Mettre en ligne après validation"
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={4} className="flex items-center">
                                                <CheckboxFormsy
                                                    onChange={(e) => handleCheckBoxChange(e, 'isAnonyme')}
                                                    name="isAnonyme"
                                                    value={form.isAnonyme}
                                                    label="Mettre la demande anonyme"
                                                />
                                                <Tooltip placement="top" title="Si vous mettez la demande anonyme, les achats industriels prend en charge la reception des devis d'auprès les fournisseurs et elle vous choisi la meiileure offre." aria-label="anonyme">
                                                    <Icon className="ml-4 text-20">help_outline</Icon>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>



                                    </Formsy>
                                )}
                            {tabValue === 1 && (
                                <div>
                                    <input
                                        accept="text/plain,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/pdf,image/jpeg,image/gif,image/png,application/pdf,"
                                        className="hidden"
                                        id="button-file"
                                        type="file"
                                        disabled={demande.attachementReqInProgress}
                                        onChange={handleUploadChange}
                                    />
                                    <div className="flex justify-center sm:justify-start flex-wrap">
                                        <label
                                            htmlFor="button-file"

                                            className={
                                                clsx(
                                                    classes.demandeImageUpload,
                                                    "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",
                                                    (form.attachements.length === 5) && 'hidden'
                                                )}
                                        >
                                            {
                                                demande.attachementReqInProgress ?
                                                    <CircularProgress size={24} className={classes.buttonProgress} />
                                                    :
                                                    <Icon fontSize="large" color="action">arrow_upward</Icon>

                                            }
                                        </label>

                                        {form.attachements.map(media => (
                                            <div
                                                className={
                                                    clsx(
                                                        classes.demandeImageItem,
                                                        "flex items-center cursor-pointer justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden  shadow-1 hover:shadow-5")
                                                }
                                                key={media.id}
                                                onClick={() => window.open(FuseUtils.getUrl() + media.url, "_blank")}
                                            >
                                                <Tooltip title="Supprimer" >
                                                    <IconButton className={classes.demandeImageFeaturedStar}
                                                        onClick={(ev) => {
                                                            ev.stopPropagation();
                                                            dispatch(Actions.deleteMedia(media));
                                                        }}
                                                    >
                                                        <Icon>delete</Icon>
                                                    </IconButton>
                                                </Tooltip>
                                                {_.split(media.type, '/', 1)[0] === 'image' ?
                                                    <img className="max-w-none w-auto h-full"
                                                        src={FuseUtils.getUrl() + media.url}
                                                        alt="demande" />
                                                    :
                                                    <Icon color="secondary" style={{ fontSize: 80 }}>insert_drive_file</Icon>
                                                }

                                            </div>
                                        ))}
                                        <Grid container spacing={3} >

                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="caption">
                                                    - Taille maximale par fichier : 2 Mo <br />
                                                    - 5 fichiers à télécharger <br />
                                                    - Extensions de fichier autorisées: .jpg, .jpeg, .png, .xls, .xlsx , .bmp , .doc , .docx , .pdf , .txt
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>

                                </div>
                            )}
                            {/*tabValue === 2 && (
                                <div className="w-full flex flex-col">


                                    <FuseAnimate animation="transition.slideUpIn" delay={300}>

                                        <ReactTable

                                            className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                                            data={form.diffusionsdemandes}
                                            columns={[

                                                {
                                                    Header: "#",
                                                    accessor: "id",
                                                    Cell: row => row.index + 1


                                                },
                                                {
                                                    Header: "Fournisseurs",
                                                    className: "font-bold",
                                                    id: "fournisseur",
                                                    accessor: f => f.fournisseur.societe + ' ' + f.fournisseur.firstName + ' ' + f.fournisseur.lastName + ' ' + f.fournisseur.phone,
                                                },
                                                {
                                                    Header: "Date de diffusion",
                                                    id: "dateDiffusion",
                                                    accessor: d => moment(d.dateDiffusion).format('DD/MM/YYYY HH:mm'),
                                                },



                                            ]}
                                            defaultPageSize={10}
                                            ofText='sur'
                                        />
                                    </FuseAnimate>




                                </div>
                            )*/}


                        </div>
                    )
                    : ''
            }
            innerScroll
        />
    )
}

export default withReducer('demandesAcheteurApp', reducer)(Demande);
