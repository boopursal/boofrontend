import React, { useRef, useEffect, useState } from "react";
import {
  Button,
  Tab,
  Tabs,
  InputAdornment,
  Icon,
  Typography,
  LinearProgress,
  Grid,
  CircularProgress,
  Popper,
  Chip,
  Checkbox,
  IconButton,
  Tooltip,
  RadioGroup,
  SnackbarContent,
  ListItemText,
  Select,
  FormControlLabel,
  FormControl,
  InputLabel,
  FormGroup,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  FuseAnimate,
  FusePageCarded,
  TextFieldFormsy,
  DatePickerFormsy,
  CheckboxFormsy,
  RadioGroupFormsy,
} from "@fuse";
import { URL_SITE } from "@fuse/Constants";
import { useForm } from "@fuse/hooks";
import { Link } from "react-router-dom";
import clsx from "clsx";
import _ from "@lodash";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
import Formsy from "formsy-react";
import moment from "moment";
import green from "@material-ui/core/colors/green";
import ErrorIcon from "@material-ui/icons/Error";
import ReactTable from "react-table";
import Autosuggest from "react-autosuggest";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Highlighter from "react-highlight-words";
import { Helmet } from "react-helmet";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
    },
  },
}))(Button);



const RedButton = withStyles((theme) => ({
  root: {
    color: red[500],
    borderColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
      color: "white",
    },
  },
}))(Button);

const GreenButton = withStyles((theme) => ({
  root: {
    color: green[500],
    borderColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
      color: "white",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  chips: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  demandeImageFeaturedStar: {
    position: "absolute",
    top: 0,
    right: 0,
    color: red[400],
    opacity: 0,
  },
  demandeImageUpload: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  select: {
    zIndex: 999,
  },
  demandeImageItem: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& $demandeImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& $demandeImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover $demandeImageFeaturedStar": {
        opacity: 1,
      },
    },
  },
  suggestion: {
    display: "block",
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
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
    display: "flex",
    alignItems: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
  titre: {
    paddingLeft: "10px",
    borderLeft: "10px solid " + theme.palette.secondary.main,
  },
}));
moment.defaultFormat = "DD/MM/YYYY HH:mm";
function renderSuggestion(suggestion, { query, isHighlighted }) {
  return (
    <MenuItem
      selected={isHighlighted}
      component="div"
      className="z-999"
      dense={true}
    >
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
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;
  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: (node) => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      required
      {...other}
    />
  );
}

function Demande(props) {
  const suggestionsNode = useRef(null);
  const popperNode = useRef(null);
  const searchCategories = useSelector(
    ({ demandesAcheteurApp }) => demandesAcheteurApp.searchCategories
  );
  const [categories, setCategories] = React.useState([]);
  const [suggestions, setSuggestions] = React.useState([]);
  const dispatch = useDispatch();
  const demande = useSelector(
    ({ demandesAcheteurApp }) => demandesAcheteurApp.demande
  );
  const [isFormValid, setIsFormValid] = useState(false);

  // Set Statut to "En attente" if it's "En cours" after any changes of this data (Titre,Description,Produits,Pièce jointe)
  const [updateStatut, setUpdateStatut] = useState(false);

  const [updateExpiration, setUpdateExpiration] = useState(false);
  const [interval, setInterval] = useState(null);

  const formRef = useRef(null);
  
  const { form, handleChange, setForm } = useForm(null);

  const classes = useStyles(props);
  const [tabValue, setTabValue] = useState(0);
  const params = props.match.params;
  const { demandeId } = params;
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [openSendDialog, setOpenSendDialog] = useState(false);

  useEffect(() => {
    function updateDemandeState() {
      if (demandeId === "new") {
        dispatch(Actions.newDemande());
      } else {
        dispatch(Actions.getDemande(demandeId));
        dispatch(Actions.getFournisseurParticipe(demandeId));
      }
    }
    updateDemandeState();
    return () => {
      dispatch(Actions.cleanUpDemande());
    };
  }, [dispatch, demandeId]);

  useEffect(() => {
    if (
      demande.error &&
      (demande.error.titre ||
        demande.error.description ||
        demande.error.dateExpiration ||
        demande.error.isPublic ||
        demande.error.isAnonyme ||
        demande.error.sousSecteurs)
    ) {
      formRef.current.updateInputsWithError({
        ...demande.error,
      });
      disableButton();
      demande.error = null;
    }
  }, [demande.error]);

  useEffect(() => {
    if (demande.attachement) {
      setForm(
        _.set({ ...form }, "attachements", [
          demande.attachement,
          ...form.attachements,
        ])
      );
      demande.attachement = null;
    }
  }, [form, setForm, demande.attachement]);

  useEffect(() => {
    if (demande.attachement_deleted) {
      setForm(
        _.set(
          { ...form },
          "attachements",
          _.pullAllBy(
            form.attachements,
            [{ id: demande.attachement_deleted }],
            "id"
          )
        )
      );
      demande.attachement_deleted = null;
    }
  }, [demande.attachement_deleted]);

  useEffect(() => {
    if (demande.new) {
      setForm({ ...demande.data });
      setCategories([]);
      demande.new = false;
    }
  }, [demande, setForm]);

  useEffect(() => {
    if (
      (demande.data && !form) ||
      (demande.data && form && demande.data.id !== form.id)
    ) {
      setForm({ ...demande.data });
      if (demande.data.categories) {
        setCategories(demande.data.categories.map((item) => item));
      }
      if (demande.data.autreCategories) {
        setSuggestions(_.split(demande.data.autreCategories, ","));
      }
    }
  }, [form, demande.data, setForm]);

  useEffect(() => {
    if (
      demandeId !== "new" &&
      demande.data &&
      form &&
      demande.data.statut === 1
    ) {
      if (
        demande.data.titre !== form.titre ||
        demande.data.description !== form.description ||
        !_.isEqual(demande.data.attachements, form.attachements) ||
        !_.isEqual(categories, demande.data.categories)
      ) {
        setUpdateStatut(true);
      } else {
        setUpdateStatut(false);
      }
    }
  }, [form, demande.data, demandeId, categories]);

  useEffect(() => {
    if (
      demandeId !== "new" &&
      demande.data &&
      form &&
      demande.data.statut === 1
    ) {
      if (moment(demande.data.dateExpiration).isSame(form.dateExpiration)) {
        setInterval(null);
        setUpdateExpiration(false);
      } else {
        let duration = moment.duration(
          moment(form.dateExpiration).diff(demande.data.dateExpiration)
        );
        let hours = duration.hours();
        let days = duration.days();
        let months = duration.months();
        let years = duration.years();
        let result =
          (years !== 0 && `${years} an(s)`) ||
          (months !== 0 && `${months} mois`) ||
          (days !== 0 && `${days} jour(s)`) ||
          (hours !== 0 && `${hours} heure(s)`);
        result =
          (years < 0 || months < 0 || days < 0 || hours < 0
            ? "écourtée de "
            : "prolongée de ") + result;
        setInterval(result);
        setUpdateExpiration(true);
      }
    }
  }, [form, demande.data, demandeId]);

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
    setForm(_.set({ ...form }, name, moment(value).format("YYYY-MM-DDTHH:mm")));
  }

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleChangeSearch(event) {
    dispatch(Actions.setGlobalSearchText(event));
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
    if (reason === "input-changed") {
      value &&
        value.trim().length > 1 &&
        dispatch(Actions.loadSuggestions(value.trim()));
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
    renderSuggestion,
  };

  function handleDelete(id) {
    setCategories(
      _.reject(categories, function (o) {
        return o.id === id;
      })
    );
  }

  function handleDeleteSuggestion(item) {
    setSuggestions(
      _.reject(suggestions, function (i) {
        return i === item;
      })
    );
  }
  function handleRadioChange(e) {
    setForm(_.set({ ...form }, "localisation", parseInt(e.target.value)));
  }

  function handleAddSuggestion() {
    if (suggestions.indexOf(searchCategories.searchText) === -1)
      setSuggestions([searchCategories.searchText, ...suggestions]);

    hideSearch();
    dispatch(Actions.cleanUp());
  }

 /*  const handleButtonClick = (buttonType) => {
    if (buttonType === 'save') {
      alert('Sauvegarder avant diffuser');
    } else if (buttonType === 'send') {
      alert('Envoyer');
    }
    // Appelez la fonction handleSubmit ici
    handleSubmit(false);
  }; */

  const handleSave = () => {
    handleSubmit(false);
    setOpenSaveDialog(false);
  };

  const handleSend = () => {
    handleSubmit(false);
    setOpenSendDialog(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  function handleSubmit(vider = false) {
    const params = props.match.params;
    const { demandeId } = params;

    if (demandeId === "new") {
      dispatch(
        Actions.saveDemande(form, props.history, categories, suggestions, vider)
      );
    } else {
      dispatch(
        Actions.putDemande(
          form,
          form.id,
          props.history,
          categories,
          suggestions,
          updateStatut,
          updateExpiration,
          vider
        )
      );
    }
  }
// Define the calculateRemainingTime function above your component
const [countdownData, setCountdownData] = useState([]); // Liste des données des demandes
const [isTimerActive, setIsTimerActive] = useState(true); // Pour vérifier l'activation du timer
const [intervalId, setIntervalId] = useState(null); // Stocker l'ID de l'intervalle

// 📌 Fonction pour calculer le temps restant
const calculateRemainingTime = (dateExpiration) => {
  if (!dateExpiration) return { timeLeft: 'Date invalide', className: 'error-class' };

  const endDate = moment(dateExpiration);
  const remainingTime = endDate.diff(moment(), 'seconds'); // Calcul dynamique du temps restant en secondes

  console.log("Temps restant pour:", dateExpiration, "=>", remainingTime);

  if (remainingTime <= 0) {
    return { timeLeft: 'Expiré', className: 'expired-class' };
  }

  const days = Math.floor(remainingTime / (3600 * 24));
  const hours = Math.floor((remainingTime % (3600 * 24)) / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  return {
    timeLeft: `${days}j ${hours}h ${minutes}m ${seconds}s`,
    className: 'countdown-class',
  };
};

// ⚡ Initialisation des données
useEffect(() => {
  console.log("Données de demande initialisées:", demande);

  if (demande && demande.data) {
    const newData = Array.isArray(demande.data) ? demande.data : [demande.data];
    setCountdownData(newData.map((item) => ({
      ...item,
      ...calculateRemainingTime(item.dateExpiration),
    })));
  } else {
    console.log("Aucune donnée de demande disponible");
  }
}, [demande]); // ⚡ L'effet se déclenche uniquement lorsque `demande` change


const [selectedCountries, setSelectedCountries] = useState([]);
const [openDialog, setOpenDialog] = useState(false);
const [selectedRadio, setSelectedRadio] = useState("1");
const [searchTerm, setSearchTerm] = useState("");
const [formData, setFormData] = useState({ statut: 0, localisation: null, countries: [] });



// Liste des pays (exemple)
const countries = [
  {
    continent: "Afrique",
    community: null,
    countries: [
      "Algérie", "Angola", "Bénin", "Botswana", "Burkina Faso", "Burundi",
      "Cameroun", "Cap-Vert", "République Centrafricaine", "Tchad", "Comores",
      "République Démocratique du Congo", "Djibouti", "Égypte", "Érythrée",
      "Eswatini", "Éthiopie", "Gabon", "Gambie", "Ghana", "Guinée", "Guinée-Bissau",
      "Côte d'Ivoire", "Kenya", "Lesotho", "Liberia", "Libye", "Madagascar",
      "Malawi", "Mali", "Mauritanie", "Maurice", "Maroc", "Mozambique", "Namibie",
      "Niger", "Nigéria", "Rwanda", "Sao Tomé-et-Principe", "Sénégal",
      "Seychelles", "Sierra Leone", "Somalie", "Afrique du Sud", "Soudan",
      "Tanzanie", "Togo", "Tunisie", "Ouganda", "Zambie", "Zimbabwe"
    ],
  },
  {
    continent: "Amérique",
    community: "Amérique du Nord",
    countries: ["Canada", "États-Unis", "Mexique"],
  },
  {
    continent: "Amérique",
    community: "Amérique Centrale",
    countries: [
      "Belize", "Costa Rica", "El Salvador", "Guatemala", "Honduras",
      "Nicaragua", "Panama"
    ],
  },
  {
    continent: "Amérique",
    community: "Amérique du Sud",
    countries: [
      "Argentine", "Bolivie", "Brésil", "Chili", "Colombie", "Équateur",
      "Guyana", "Paraguay", "Pérou", "Suriname", "Uruguay", "Venezuela"
    ],
  },
  {
    continent: "Asie",
    community: "Asie de l'Est",
    countries: [
      "Chine", "Japon", "Mongolie", "Corée du Nord", "Corée du Sud", "Taïwan"
    ],
  },
  {
    continent: "Asie",
    community: "Asie du Sud",
    countries: [
      "Afghanistan", "Bangladesh", "Bhoutan", "Inde", "Iran", "Maldives",
      "Népal", "Pakistan", "Sri Lanka"
    ],
  },
  {
    continent: "Asie",
    community: "Asie du Sud-Est",
    countries: [
      "Brunei", "Cambodge", "Indonésie", "Laos", "Malaisie", "Birmanie",
      "Philippines", "Singapour", "Thaïlande", "Timor oriental", "Vietnam"
    ],
  },
  {
    continent: "Asie",
    community: "Asie Centrale",
    countries: [
      "Kazakhstan", "Kirghizistan", "Tadjikistan", "Turkménistan", "Ouzbékistan"
    ],
  },
  {
    continent: "Europe",
    community: "Union Européenne",
    countries: [
      "Allemagne", "Autriche", "Belgique", "Bulgarie", "Chypre", "Croatie",
      "Danemark", "Espagne", "Estonie", "Finlande", "France", "Grèce",
      "Hongrie", "Irlande", "Italie", "Lettonie", "Lituanie", "Luxembourg",
      "Malte", "Pays-Bas", "Pologne", "Portugal", "République tchèque",
      "Roumanie", "Slovaquie", "Slovénie", "Suède"
    ],
  },
  {
    continent: "Europe",
    community: "Europe non-UE",
    countries: [
      "Albanie", "Andorre", "Biélorussie", "Bosnie-Herzégovine", "Islande",
      "Liechtenstein", "Macédoine du Nord", "Moldavie", "Monaco", "Monténégro",
      "Norvège", "Royaume-Uni", "Russie", "Saint-Marin", "Serbie", "Suisse",
      "Ukraine", "Vatican"
    ],
  },
  {
    continent: "Océanie",
    community: null,
    countries: [
      "Australie", "Fidji", "Kiribati", "Îles Marshall", "Micronésie", "Nauru",
      "Nouvelle-Zélande", "Palaos", "Papouasie-Nouvelle-Guinée", "Samoa",
      "Îles Salomon", "Tonga", "Tuvalu", "Vanuatu"
    ],
  },
];


// Ouvrir/Fermer la popup
const handleOpenDialog = () => setOpenDialog(true);
const handleCloseDialog = () => {
  setOpenDialog(false);
  setFormData((prevData) => ({
    ...prevData,
    countries: selectedCountries, // Sauvegarde les pays sélectionnés
  }));
};
// Gestion du changement de radio
const handleLocalisationChange = (event) => {
  const value = parseInt(event.target.value, 10); // Convertir en nombre
  setFormData((prevFormData) => ({
    ...prevFormData,
    localisation: value,
    countries: value === 3 ? selectedCountries : [], // Sauvegarde les pays si "Internationale"
  }));

  if (value === 3) setOpenDialog(true); // Ouvre le popup pour sélectionner les pays
};





// Sélectionner/Désélectionner un pays
const handleCountryCheck = (event) => {
  const { value, checked } = event.target;

  // Mise à jour de la liste des pays sélectionnés
  setSelectedCountries((prevCountries) => {
    const updatedCountries = checked
      ? [...prevCountries, value]
      : prevCountries.filter((country) => country !== value);

    // Mise à jour de formData avec la liste des pays
    setFormData((prevFormData) => ({
      ...prevFormData,
      countries: updatedCountries,
    }));

    return updatedCountries;
  });
};


// Filtrer les pays en fonction de la recherche
const filteredCountries = countries.flatMap((continent) =>
  continent.countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  )
);

// Valider la sélection et fermer la popup
const handleValidateSelection = () => {
  handleCloseDialog();
};

// Then the component code
const Demande = () => {
  // Your component logic here...
};

  return (
    <>
      <Helmet>
        <title>
          {demandeId === "new" ? "Nouvelle demande" : "Edit demande"} | Les
          Achats Industriels
        </title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex" />
      </Helmet>
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        }}
        header={
          !demande.loading
            ? form && (
                <div className="flex flex-1 w-full items-center justify-between">
                  <div className="flex flex-col items-start max-w-full">
                    <FuseAnimate
                      animation="transition.slideRightIn"
                      delay={300}
                    >
                      <Typography
                        className="normal-case flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/demandes"
                        color="inherit"
                      >
                        <Icon className="mr-4 text-20">arrow_back</Icon>
                        Retour
                      </Typography>
                      
                    </FuseAnimate>

                    <div className="flex items-center max-w-full">
                      <div className="flex flex-col min-w-0">
                        <FuseAnimate
                          animation="transition.slideLeftIn"
                          delay={300}
                        >
                          <Typography className="text-16 sm:text-20 truncate">
                            {form.titre ? form.titre : "Nouvelle Demande"}
                          </Typography>
                        </FuseAnimate>
                        <FuseAnimate
                          animation="transition.slideLeftIn"
                          delay={300}
                        >
                          <Typography variant="caption">
                            Détails de la demande
                          </Typography>
                        </FuseAnimate>
                      </div>
                    </div>
                  </div>
                  <div>
                   {/*  {moment(demande.data.dateExpiration) >= moment() &&
                      demande.data.statut && (
                        <GreenButton
                          className="mr-4"
                          variant="outlined"
                          disabled={
                            !isFormValid ||
                            demande.loading ||
                            !categories.length ||
                            demande.data.statut === 3
                          }
                          onClick={(ev) => {
                            ev.stopPropagation();
                            dispatch(
                              Actions.openDialog({
                                children: (
                                  <React.Fragment>
                                    <DialogTitle id="alert-dialog-title">
                                      Atteinte de Quotas
                                    </DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-description">
                                        Voulez vous vraiment arrêter cette
                                        demande ?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button
                                        variant="outlined"
                                        onClick={() =>
                                          dispatch(Actions.closeDialog())
                                        }
                                        color="primary"
                                      >
                                        Non
                                      </Button>
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={(ev) => {
                                          handleSubmit(true);
                                          dispatch(Actions.closeDialog());
                                        }}
                                        autoFocus
                                      >
                                        Oui
                                      </Button>
                                    </DialogActions>
                                  </React.Fragment>
                                ),
                              })
                            );
                          }}
                        >
                          <span className="hidden sm:flex">
                            atteinte de quotas
                          </span>
                          <span className="flex sm:hidden">
                            <Icon>assignment_turned_in</Icon>
                          </span>
                          {demande.loading && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </GreenButton>
                      )}

                    {moment(demande.data.dateExpiration) >= moment() &&
                      demande.data.statut && (
                        <RedButton
                          className="mr-4"
                          variant="outlined"
                          disabled={
                            !isFormValid ||
                            demande.loading ||
                            !categories.length ||
                            demande.data.statut === 3
                          }
                          onClick={(ev) => {
                            ev.stopPropagation();
                            dispatch(
                              Actions.openDialog({
                                children: (
                                  <React.Fragment>
                                    <DialogTitle id="alert-dialog-title">
                                      Annulation
                                    </DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-description">
                                        Voulez vous vraiment annuler cette
                                        demande ?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button
                                        variant="outlined"
                                        onClick={() =>
                                          dispatch(Actions.closeDialog())
                                        }
                                        color="primary"
                                      >
                                        Non
                                      </Button>
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={(ev) => {
                                          handleSubmit(true);
                                          dispatch(Actions.closeDialog());
                                        }}
                                        autoFocus
                                      >
                                        Oui
                                      </Button>
                                    </DialogActions>
                                  </React.Fragment>
                                ),
                              })
                            );
                          }}
                        >
                          <span className="hidden sm:flex">
                            annuler la demande
                          </span>
                          <span className="flex sm:hidden">
                            <Icon>close</Icon>
                          </span>
                          {demande.loading && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </RedButton>
                      )} */}
                     
                    <Button
                      className="whitespace-no-wrap"
                      variant="contained"
                      color="secondary"
                      disabled={
                        !isFormValid ||
                        demande.loading ||
                        (!categories.length && !suggestions.length) ||
                        demande.data.statut === 3
                      }
                      onClick={() => handleSubmit(false)}
                    >
                      <span className="hidden sm:flex">Sauvegarder</span>
                      
                      <span className="flex sm:hidden">
                        <Icon>save</Icon>
                      </span>
                      {demande.loading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </Button>
                    
                    {demandeId === "new" && (
                      <Button
                        className="ml-8"
                        color="secondary"
                        variant="contained"
                        disabled={
                          !isFormValid ||
                          demande.loading ||
                          (!categories.length && !suggestions.length)
                        }
                        onClick={() => handleSubmit(true)}
                      >
                        <span className="hidden sm:flex">
                          Sauvegarder et ajouter nouvelle demande
                        </span>
                        <span className="flex sm:hidden">
                          <Icon>repeat</Icon>
                        </span>

                        {demande.loading && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              )
            : ""
        }
        contentToolbar={
          demande.loading ? (
            <div className={classes.root}>
              <LinearProgress color="secondary" />
            </div>
          ) : (
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
              <Tab
                className="h-64 normal-case"
                label={
                  form && form.attachements.length > 0
                    ? "Pièce(s) jointe(s) (" + form.attachements.length + ")"
                    : "Pièce(s) jointe(s)"
                }
              />
             
              {demande &&
              demande.fournisseurs.length > 0 &&
              !demande.data.isAnonyme ? (
                <Tab
                  className={clsx(
                    "h-64 normal-case text-orange",
                    demande.data.statut === 3 ? "text-green" : "text-orange"
                  )}
                  label={
                    demande.data && demande.data && demande.data.statut === 3
                      ? "Adjugée"
                      : demande.fournisseurs.length +
                        " fournisseur(s) participant(s)"
                  }
                />
              ) : (
                ""
              )}
            </Tabs>
          )
        }
        content={
          !demande.loading
            ? form && (
                <div className="p-10  sm:p-24 max-w-2xl">
                  {tabValue === 0 && (
                    <Formsy
                      onValidSubmit={handleSubmit}
                      onValid={enableButton}
                      onInvalid={disableButton}
                      ref={formRef}
                      className="flex flex-col "
                    >
                      {form.statut && form.statut === 2 ? (
                        <SnackbarContent
                          className={clsx(classes.margin, classes.error)}
                          aria-describedby="client-snackbar"
                          message={
                            <span
                              id="client-snackbar"
                              className={classes.message}
                            >
                              <ErrorIcon
                                className={clsx(
                                  classes.icon,
                                  classes.iconVariant
                                )}
                              />
                              Motif du rejet:{" "}
                              {form.motifRejet ? form.motifRejet.name : ""}
                            </span>
                          }
                        />
                      ) : (
                        ""
                      )}
                      <Grid container spacing={3} className="mb-8">
                        {/* <Grid item xs={12} sm={8}>
                          <Typography variant="caption">
                            - Soumettez votre demande c'est gratuit et sans
                            engagement.
                            <br />
                            - Détaillez la demande, vous recevrez de meilleures
                            offres.
                            <br />
                            - Attention seules les demandes sérieuses (pas de
                            projets étudiants) seront validées.
                            <br />
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          className="justify-end text-right"
                        >
                          <Typography
                            variant="caption"
                            className="font-extrabold"
                          >
                            <span className="text-red font-600">*</span> Champs
                            obligatoires.
                          </Typography>
                        </Grid> */}
                        {form.statut === 1 && (
                          <Grid item xs={12}>
                            <Typography
  variant="caption"
  className="uppercase font-bold mb-16 flex items-center justify-center"
  style={{
    color: '#FFFFFF', // Blanc pour le texte
    fontSize: '14px',
    fontWeight: 'bold',
    backgroundColor: '#4CAF50', // Vert vif pour attirer l'attention
    padding: '8px 12px', // Plus de padding pour plus d'espace
    borderRadius: '20px', // Coins arrondis pour un effet moderne
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Légère ombre pour donner du relief
    display: 'inline-flex', // Empêche de prendre toute la largeur
    alignItems: 'center',
    justifyContent: 'center', // Centrage horizontal
    textAlign: 'center', // Centrage du texte
    maxWidth: '200px', // Définit une largeur maximale
    width: 'auto', // Laisse l'élément s'ajuster à son contenu
  }}
>
  <Icon style={{ marginRight: '8px' }}>timer</Icon>&ensp;{calculateRemainingTime(form.dateExpiration).timeLeft}
</Typography>
                            <Typography
                              variant="caption"
                              className="font-bold flex items-center"
                              color="secondary"
                            >
                              <Icon className="mr-2">info</Icon>Toutes
                              modifications sur les champs ( Désignation,
                              Description, Produits, Pièce(s) jointe(s) ), la
                              demande sera remis à l'état initial "En attente"
                              pour la validation de l'administrateur.
                            </Typography>
                            




                          </Grid>
                        )}
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={7}>
                          <TextFieldFormsy
                            className="mb-24"
                            label="Designation"
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
                              minLength: "Min character length is 4",
                              maxLength: "Max character length is 255",
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
                            value={
                              form.reference ? form.reference : "En attente"
                            }
                            variant="outlined"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  RFQ-
                                </InputAdornment>
                              ),
                            }}
                            disabled
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      

                      <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
  <DatePickerFormsy
    label="Date d'expiration"
    id="dateExpiration"
    name="dateExpiration"
    value={form.dateExpiration}
    onChange={(value) =>
      handleDateChange(value, "dateExpiration")
    }
    variant="outlined"
    required
    fullWidth
  />
  
  {updateExpiration && interval && (
    <Typography
      variant="caption"
      className="uppercase font-bold mb-16 flex items-center"
      color="secondary"
    >
      <Icon>info</Icon>&ensp;{interval}
    </Typography>
  )}

  {form.dateExpiration && (
    <Typography
      variant="caption"
      className="uppercase font-bold mb-16 flex items-center"
      color="secondary"
    >
       
    </Typography>
  )}
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
                              isNumeric: "Numeric value required",
                            }}
                            step="any"
                            required
                            fullWidth
                          />
                        </Grid>
                      </Grid>

                      <div ref={popperNode}>
                        <Autosuggest
                          {...autosuggestProps}
                          getSuggestionValue={(suggestion) =>
                            searchCategories.searchText
                          }
                          onSuggestionSelected={(
                            event,
                            { suggestion, method }
                          ) => {
                            if (method === "enter") {
                              event.preventDefault();
                            }
                            !_.find(categories, ["name", suggestion.name]) &&
                              setCategories([suggestion, ...categories]);
                            //setForm(_.set({ ...form }, 'categories', suggestion['@id']))
                            //hideSearch();
                            popperNode.current.focus();
                          }}
                          required
                          inputProps={{
                            classes,
                            label: "Produits Services à Recherchez ",
                            placeholder: "Produit (ex: Projecteur)",
                            value: searchCategories.searchText,
                            variant: "outlined",
                            name: "categories",
                            onChange: handleChangeSearch,
                            onFocus: showSearch,
                            InputLabelProps: {
                              shrink: true,
                            },
                          }}
                          theme={{
                            container: classes.container,
                            suggestionsContainerOpen:
                              classes.suggestionsContainerOpen,
                            suggestionsList: classes.suggestionsList,
                            suggestion: classes.suggestion,
                          }}
                          renderSuggestionsContainer={(options) => (
                            <Popper
                              anchorEl={popperNode.current}
                              open={
                                Boolean(options.children) ||
                                searchCategories.noSuggestions ||
                                searchCategories.loading
                              }
                              popperOptions={{ positionFixed: true }}
                              className="z-9999 mb-8"
                            >
                              <div ref={suggestionsNode}>
                                <Paper
                                  elevation={1}
                                  square
                                  {...options.containerProps}
                                  style={{
                                    width: popperNode.current
                                      ? popperNode.current.clientWidth
                                      : null,
                                  }}
                                >
                                  {options.children}
                                  {searchCategories.noSuggestions && (
                                    <MenuItem
                                      component="div"
                                      className="z-999"
                                      onClick={handleAddSuggestion}
                                      dense={true}
                                    >
                                      <ListItemText
                                        className="pl-0 "
                                        primary={searchCategories.searchText}
                                      />
                                    </MenuItem>
                                  )}
                                  {searchCategories.loading && (
                                    <div className="px-16 py-12 text-center">
                                      <CircularProgress color="secondary" />{" "}
                                      <br /> Chargement ...
                                    </div>
                                  )}
                                </Paper>
                              </div>
                            </Popper>
                          )}
                        />
                      </div>
                      <Typography
                        variant="caption"
                        className="font-bold flex items-center"
                        color="secondary"
                      >
                        IMPORTANT : Pour que votre demande soit diffusée aux
                        fournisseurs désignés, veuillez sélectionner le bon
                        produit.
                      </Typography>
                      <div className={clsx(classes.chips)}>
                        {categories &&
                          categories.length > 0 &&
                          categories.map((item, index) => (
                            <Chip
                              key={index}
                              label={item.name}
                              onDelete={() => handleDelete(item.id)}
                              className="mt-8 mr-8"
                            />
                          ))}
                        {suggestions &&
                          suggestions.length > 0 &&
                          suggestions.map((item, index) => (
                            <Chip
                              key={index}
                              label={item}
                              onDelete={() => handleDeleteSuggestion(item)}
                              className="mt-8 mr-8"
                            />
                          ))}
                      </div>
                      <Grid container spacing={3}>
                      <Grid item xs={12} sm={12}>
                                  <TextFieldFormsy
                                    className="mb-16 mt-16  w-full"
                                    type="text"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    //onKeyDown={handleKeyDown}
                                    label="Description"
                                    autoFocus
                                    validations={{
                                      minLength: 10,
                                    }}
                                    validationErrors={{
                                      minLength: "La longueur minimale de caractère est 10",
                                    }}
                                    required
                                    variant="outlined"
                                    multiline
                                    rows="4"
                                  />
                    </Grid>
                    </Grid>
                     
                      <Grid container spacing={3} className="flex items-center">
                        
                      <Grid item xs={12} sm={4}>
                      <RadioGroupFormsy
                            className="inline"
                            name="statut"
                            label="Diffuser à l'échelle"
                            onChange={handleRadioChange}
                          >              
                      <FormControlLabel
                              value="2"
                              disabled={form.statut === 1}
                              checked={form.localisation === 2}
                              control={<Radio />}
                              label="Locale"
                            />
                            <FormControlLabel
                              value="3"
                              disabled={form.statut === 1}
                              checked={form.localisation === 3}
                              control={<Radio />}
                              onChange={handleLocalisationChange}
                              label={
                                <span>
      Internationale {formData.countries.length > 0 ? `(${formData.countries.join(", ")})` : ""}
    </span>
                              } 
                            />
                            <FormControlLabel
                              value="1"
                              disabled={form.statut === 1}
                              checked={form.localisation === 1}
                              control={<Radio />}
                              label="Les deux"
                            />
                            </RadioGroupFormsy>
  {/* Sélection de l'échelle */}

  {/* <RadioGroup name="statut" value={selectedRadio} onChange={handleLocalisationChange}>
   
    <FormControlLabel 
      value="3" 
      disabled={form.statut === 1} 
      checked={form.localisation === 3}
      control={<Radio />} 
      label={
        <span>
          Internationale {selectedCountries.length > 0 && `(${selectedCountries.join(", ")})`}
        </span>
      } 
    />
  
  </RadioGroup> */}

  {/* Popup pour sélectionner les pays */}
  <Dialog open={openDialog} onClose={handleCloseDialog}>
  <DialogTitle>Choisissez les pays</DialogTitle>
  <DialogContent>
    {/* Barre de recherche */}
    <TextField
      fullWidth
      label="Rechercher un pays..."
      variant="outlined"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    
    <FormGroup>
      {countries
        .flatMap((continent) => continent.countries)
        .filter((country) => country.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((country) => (
          <FormControlLabel
            key={country}
            control={
              <Checkbox
                checked={selectedCountries.includes(country)}
                onChange={handleCountryCheck}
                value={country}
              />
            }
            label={country}
          />
        ))}
    </FormGroup>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog} color="secondary">Annuler</Button>
    <Button onClick={handleCloseDialog} color="primary">Valider</Button>
  </DialogActions>
</Dialog>
</Grid>

                        <Grid item xs={12} sm={4} className="flex items-center">
                          <CheckboxFormsy
                            name="isPublic"
                            disabled={form.statut === 1}
                            onChange={(e) =>
                              handleCheckBoxChange(e, "isPublic")
                            }
                            value={form.isPublic}
                            label="Mettre en ligne après validation"
                          />
                          <Tooltip
                            placement="top"
                            title="Si vous mettez la demande en ligne après validation, elle sera visibile par les founrisseurs et les visiteurs du site web."
                            aria-label="anonyme"
                          >
                            <Icon className="ml-4 text-20">help_outline</Icon>
                          </Tooltip>
                        </Grid>

                        <Grid item xs={12} sm={4} className="flex items-center">
                          <CheckboxFormsy
                            onChange={(e) =>
                              handleCheckBoxChange(e, "isAnonyme")
                            }
                            name="isAnonyme"
                            disabled={form.statut === 1}
                            value={form.isAnonyme}
                            label="Mettre la demande anonyme"
                          />
                          <Tooltip
                            placement="top"
                            title="Si vous mettez la demande anonyme, les achats industriels prend en charge la reception des devis d'auprès les fournisseurs et elle vous choisi la meiileure offre."
                            aria-label="anonyme"
                          >
                            <Icon className="ml-4 text-20">help_outline</Icon>
                          </Tooltip>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3} className="mb-8">
                        <Grid item xs={12} sm={8}>
                          <Typography variant="caption">
                            - Soumettez votre demande c'est gratuit et sans
                            engagement.
                            <br />
                            - Détaillez la demande, vous recevrez de meilleures
                            offres.
                            <br />
                            - Attention seules les demandes sérieuses (pas de
                            projets étudiants) seront validées.
                            <br />
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          className="justify-end text-right"
                        >
                          <Typography
                            variant="caption"
                            className="font-extrabold"
                          >
                            <span className="text-red font-600">*</span> Champs
                            obligatoires.
                          </Typography>
                        </Grid> 
                        </Grid>
                      <Grid container spacing={3} className="mt-4">
                        <Grid item xs={12} sm={10}>
                        <Button
        className="whitespace-no-wrap"
        variant="contained"
        color="secondary"
        disabled={
          !isFormValid ||
          demande.loading ||
          (!categories.length && !suggestions.length) ||
          demande.data.statut === 3
        }
        onClick={() => setOpenSaveDialog(true)}
      >
        <span className="hidden sm:flex">Sauvegarder avant diffuser</span>
        <span className="flex sm:hidden">
          <Icon>save</Icon>
        </span>
        {demande.loading && (
          <CircularProgress
            size={24}
            className={classes.buttonProgress}
          />
        )}
      </Button>
      <Button
        style={{ backgroundColor: 'orangered', marginLeft: '20px' }}
        className="whitespace-no-wrap"
        variant="contained"
        color="secondary"
        disabled={
          !isFormValid ||
          demande.loading ||
          (!categories.length && !suggestions.length) ||
          demande.data.statut === 3
        }
        onClick={() => setOpenSendDialog(true)}
      >
        <span className="hidden sm:flex">Envoyer</span>
        <span className="flex sm:hidden">
          <Icon>send</Icon>
        </span>
        {demande.loading && (
          <CircularProgress
            size={24}
            className={classes.buttonProgress}
          />
        )}
      </Button>

      {/* Dialog for Save */}
      <Dialog
        open={openSaveDialog}
        onClose={() => setOpenSaveDialog(false)}
        aria-labelledby="save-dialog-title"
        aria-describedby="save-dialog-description"
      >
        <DialogTitle id="save-dialog-title">Sauvegarder</DialogTitle>
        <DialogContent>
          <DialogContentText id="save-dialog-description">
            Voulez-vous vraiment sauvegarder cet enregistrement avant de diffuser ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSaveDialog(false)} color="primary">
            Non
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Send */}
      <Dialog
        open={openSendDialog}
        onClose={() => setOpenSendDialog(false)}
        aria-labelledby="send-dialog-title"
        aria-describedby="send-dialog-description"
      >
        <DialogTitle id="send-dialog-title">Envoyer</DialogTitle>
        <DialogContent>
          <DialogContentText id="send-dialog-description">
            Voulez-vous vraiment envoyer cet enregistrement ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSendDialog(false)} color="primary">
            Non
          </Button>
          <Button onClick={handleSend} color="primary" autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
                          {demandeId === "new" && (
                            <Button
                              className="ml-8"
                              variant="contained"
                              color="secondary"
                              disabled={
                                !isFormValid ||
                                demande.loading ||
                                (!categories.length && !suggestions.length)
                              }
                              onClick={() => handleSubmit(true)}
                            >
                              <span className="hidden sm:flex">
                                Sauvegarder et ajouter nouvelle demande
                              </span>
                              <span className="flex sm:hidden">
                                <Icon>save</Icon> et <Icon>repeat</Icon>
                              </span>

                              {demande.loading && (
                                <CircularProgress
                                  size={24}
                                  className={classes.buttonProgress}
                                />
                              )}
                            </Button>
                          )}
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
                          className={clsx(
                            classes.demandeImageUpload,
                            "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",
                            form.attachements.length === 5 && "hidden"
                          )}
                        >
                          {demande.attachementReqInProgress ? (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          ) : (
                            <Icon fontSize="large" color="action">
                              arrow_upward
                            </Icon>
                          )}
                        </label>

                        {form.attachements.map((media) => (
                          <div
                            className={clsx(
                              classes.demandeImageItem,
                              "flex items-center cursor-pointer justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden  shadow-1 hover:shadow-5"
                            )}
                            key={media.id}
                            onClick={() =>
                              window.open(URL_SITE + media.url, "_blank")
                            }
                          >
                            <Tooltip title="Supprimer">
                              <IconButton
                                className={classes.demandeImageFeaturedStar}
                                onClick={(ev) => {
                                  ev.stopPropagation();
                                  dispatch(Actions.deleteMedia(media));
                                }}
                              >
                                <Icon>delete</Icon>
                              </IconButton>
                            </Tooltip>
                            {_.split(media.type, "/", 1)[0] === "image" ? (
                              <img
                                className="max-w-none w-auto h-full"
                                src={URL_SITE + media.url}
                                alt="demande"
                              />
                            ) : (
                              <Icon color="secondary" style={{ fontSize: 80 }}>
                                insert_drive_file
                              </Icon>
                            )}
                          </div>
                        ))}
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="caption">
                              - Taille maximale par fichier : 2 Mo <br />
                              - 5 fichiers à télécharger <br />- Extensions de
                              fichier autorisées: .jpg, .jpeg, .png, .xls, .xlsx
                              , .bmp , .doc , .docx , .pdf , .txt
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  )}
                    {/* {tabValue === 2 && (
  <Typography variant="h6" className="p-16">
    Temps restant : {calculateRemainingTime()}
  </Typography>
)} */}
                  {tabValue === 3 && (
                    <div className="w-full flex flex-col">
                      {demande.data &&
                      demande.data.statut === 3 &&
                      !demande.data.isAnonyme ? (
                        <div className="flex flex-1 items-center justify-center h-full">
                          <Typography
                            variant="h6"
                            className="flex items-center"
                          >
                            <Icon className="mr-2 text-40" color="secondary">
                              gavel
                            </Icon>{" "}
                            Cette demande a été adjugée par :{" "}
                            <strong className="uppercase ml-2">
                              {" "}
                              {demande.data.fournisseurGagne
                                ? demande.data.fournisseurGagne.societe
                                : "Fournisseur hors site"}
                            </strong>
                          </Typography>
                        </div>
                      ) : (
                        <div>
                          <Typography
                            variant="h6"
                            className={clsx("mb-8 ml-2", classes.titre)}
                          >
                            Détail de la demande
                          </Typography>
                          <div className="table-responsive mb-16">
                            <table className="simple">
                              <thead>
                                <tr>
                                  <th className="font-bold">Référence</th>
                                  <th className="font-bold">Désignation</th>
                                  <th className="font-bold">Description</th>
                                  <th className="font-bold">Produits</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="flex items-center">
                                      <Typography className="truncate">
                                        {"RFQ-" + demande.data.reference}
                                      </Typography>
                                      
                                    </div>
                                  </td>
                                  <td>
                                    <Typography className="truncate">
                                      {demande.data.titre}
                                    </Typography>
                                  </td>
                                  <td>
                                    <Typography className="truncate">
                                      {demande.data.description}
                                    </Typography>
                                  </td>
                                  <td>
                                    <span className="truncate">
                                      {_.join(
                                        _.map(demande.data.categories, "name"),
                                        ", "
                                      )}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="flex flex-1 items-center justify-between mb-10">
                            <Typography
                              variant="h6"
                              className={clsx("mb-8 ml-2", classes.titre)}
                            >
                              Fournisseurs participants ({" "}
                              {demande.fournisseurs.length} )
                            </Typography>
                            <ColorButton
                              color="secondary"
                              size="small"
                              variant="outlined"
                              disabled={demande.requestSaveFrs}
                              onClick={(ev) => {
                                ev.stopPropagation();
                                dispatch(
                                  Actions.openDialog({
                                    children: (
                                      <React.Fragment>
                                        <DialogTitle id="alert-dialog-title">
                                          Attribution
                                        </DialogTitle>
                                        <DialogContent>
                                          <DialogContentText id="alert-dialog-description">
                                            Voulez vous vraiment attribuer cette
                                            demande à un fournisseur hors site ?
                                          </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                          <Button
                                            variant="outlined"
                                            onClick={() =>
                                              dispatch(Actions.closeDialog())
                                            }
                                            color="primary"
                                          >
                                            Non
                                          </Button>
                                          <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={(ev) => {
                                              dispatch(
                                                Actions.saveFournisseurGange(
                                                  null,
                                                  form.id
                                                )
                                              );
                                              dispatch(Actions.closeDialog());
                                            }}
                                            autoFocus
                                          >
                                            Oui
                                          </Button>
                                        </DialogActions>
                                      </React.Fragment>
                                    ),
                                  })
                                );
                              }}
                            >
                              attribuée à un fournisseur hors site
                              {demande.requestSaveFrs && (
                                <CircularProgress
                                  size={24}
                                  className={classes.buttonProgress}
                                />
                              )}
                            </ColorButton>
                          </div>
                          <ReactTable
                            className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                            data={demande.fournisseurs}
                            columns={[
                              {
                                Header: "Nombre de fournisseur",
                                accessor: "id",
                                Cell: (row) => (
                                  <div style={{ textAlign: "center" }}>
                                    {row.index + 1}
                                  </div>
                                ),
                              },
                              {
                                Header: "Fournisseur",
                                className: "font-bold",
                                id: "fournisseur",
                                accessor: (f) =>
                                  f.fournisseur.societe +
                                  " " +
                                  f.fournisseur.firstName +
                                  " " +
                                  f.fournisseur.lastName +
                                  " " +
                                  f.fournisseur.phone,
                              },
                              {
                                Header: "",
                                Cell: (row) => (
                                  <div className="flex items-center">
                                    <ColorButton
                                      color="secondary"
                                      size="small"
                                      variant="outlined"
                                      disabled={demande.requestSaveFrs}
                                      onClick={(ev) => {
                                        ev.stopPropagation();
                                        dispatch(
                                          Actions.openDialog({
                                            children: (
                                              <React.Fragment>
                                                <DialogTitle id="alert-dialog-title">
                                                  Attribution
                                                </DialogTitle>
                                                <DialogContent>
                                                  <DialogContentText id="alert-dialog-description">
                                                    Voulez vous vraiment
                                                    attribuer cette demande à{" "}
                                                    <strong>
                                                      {
                                                        row.original.fournisseur
                                                          .societe
                                                      }
                                                    </strong>{" "}
                                                    ?
                                                  </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                  <Button
                                                    variant="outlined"
                                                    onClick={() =>
                                                      dispatch(
                                                        Actions.closeDialog()
                                                      )
                                                    }
                                                    color="primary"
                                                  >
                                                    Non
                                                  </Button>
                                                  <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={(ev) => {
                                                      dispatch(
                                                        Actions.saveFournisseurGange(
                                                          row.original
                                                            .fournisseur.id,
                                                          form.id
                                                        )
                                                      );
                                                      dispatch(
                                                        Actions.closeDialog()
                                                      );
                                                    }}
                                                    autoFocus
                                                  >
                                                    Oui
                                                  </Button>
                                                </DialogActions>
                                              </React.Fragment>
                                            ),
                                          })
                                        );
                                      }}
                                    >
                                      Adjugée
                                      {demande.requestSaveFrs && (
                                        <CircularProgress
                                          size={24}
                                          className={classes.buttonProgress}
                                        />
                                      )}
                                    </ColorButton>
                                  </div>
                                ),
                              },
                            ]}
                            defaultPageSize={
                              demande.fournisseurs.length < 10
                                ? demande.fournisseurs.length
                                : 10
                            }
                            ofText="sur"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            : ""
        }
        innerScroll
      />
    </>
  );
}

export default withReducer("demandesAcheteurApp", reducer)(Demande);
