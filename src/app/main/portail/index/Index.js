import React, { useEffect, useState } from "react";
import {
  Icon,
  Typography,
  List,
  Grid,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar,
  Button,
  Chip,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FuseAnimate, FuseAnimateGroup } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import clsx from "clsx";
import { Link } from "react-router-dom";
import DemandeAchatsListItem from "./DemandeAchatsListItem";
import Newsletter from "./Newsletter";
import BioAcheteur from "./BioAcheteur";
import BioFournisseur from "./BioFournisseur";
import News from "./News";
import Produit from "./Produit";
import Slider from "react-slick";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import YouTube from "react-youtube";
import ContentLoader from "react-content-loader";
import Search from "../Search/Search";
import { Helmet } from "react-helmet";
import Navigation from "../categories/Navigation";
import Link2 from "@material-ui/core/Link";
import Categories from "./Categories";
import moment from 'moment';
import 'moment/locale/fr';
function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <IconButton
      aria-label="Next"
      style={{
        ...style,
        display: "block",
        backgroundColor: "rgba(255,255,255,0.7)",
        border: "1px solid #bfbfbf",
        color: "#4a4a4a",
        right: "-25px",
        position: "absolute",
        top: "50%",
      }}
      onClick={onClick}
    >
      <Icon fontSize="small">arrow_forward_ios</Icon>
    </IconButton>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <IconButton
      aria-label="Previous"
      style={{
        ...style,
        display: "block",
        zIndex: "999",
        backgroundColor: "rgba(255,255,255,0.7)",
        border: "1px solid #bfbfbf",
        color: "#4a4a4a",
        left: "-25px",
        position: "absolute",
        top: "50%",
      }}
      onClick={onClick}
    >
      <Icon fontSize="small">arrow_back_ios</Icon>
    </IconButton>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    flex: "1 0 auto",
    height: "auto",
    backgroundColor: theme.palette.background.default,
  },
  container: {
    listStyleType: "none",
  },
  header: {
    background: theme.palette.primary.main,
    position: 'relative',
    backgroundImage: "url(assets/images/backgrounds/dark-material-bg.jpg)",
    //backgroundImage: "url(https://source.unsplash.com/collection/9456871/1600x900)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    zIndex: 1,
    height: 'auto',
    minHeight: '288px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    paddingBottom: props => props.searchResultsVisible ? '100px' : '20px'
  },
  mainHeader: {
    backgroundColor: "rgba(0,0,0,.7)",
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    borderRadius: 8,
    padding: '20px',
    zIndex: 2
  },
  searchContainer: {
    position: 'relative',
    zIndex: 3
  },
  searchResults: {
    width: '100%',
    maxWidth: '1200px',
    margin: '20px auto',
    zIndex: 2
  },
  middle: {
    background: "linear-gradient(to right, " +
      theme.palette.primary.dark +
      " 0%, " +
      theme.palette.primary.main +
      " 100%)",
    position: "relative",
    marginBottom: theme.spacing(4),
  },
  headerIcon: {
    position: "absolute",
    top: -64,
    left: 0,
    opacity: 0.04,
    fontSize: 512,
    width: 512,
    height: 512,
    pointerEvents: "none",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ccc",
    borderRadius: 10,
  },
  icon: {
    color: theme.palette.secondary.dark,
    padding: theme.spacing(0.5, 0, 0, 0),
    fontSize: 34,
  },
  title: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  mainAvatar: {
    margin: theme.spacing(1.25, 1.25, 1.25, 0),
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
  card: {
    margin: 5,
  },
  media: {
    height: 140,
  },
  buttonXs: {
    [theme.breakpoints.down("xs")]: {
      margin: "11px 0",
      position: "static",
      textAlign: "end",
    },
  },
  buttonSm: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 11,
      position: "static",
      textAlign: "end",
    },
  },
  bioFournisseur: {
    paddingRight: 16,
    [theme.breakpoints.down("xs")]: {
      paddingRight: 0,
    },
  },
  bioAchteur: {
    paddingLeft: 16,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
    },
  },
  bannerLeadeboard: {
    width: "80%",
    height: "100%",
    margin: "auto",
  },
  bannerMeduim: {
    height: 250,
    width: 300,
    margin: "auto",
  },
  categoriesWithTopMargin: {
    marginTop: '21%',
  },
  section: {
    backgroundColor: '#f4f6f8',
    padding: theme.spacing(2),
    borderRadius: 12,
    boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
  },
  headerIcon: {
    backgroundColor: '#1976d2',
    color: '#fff',
  },
  listItem: {
    borderBottom: '1px solid #e0e0e0',
    padding: '12px 0',
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.9rem',
    color: '#555',
    marginTop: 4,
  },
  chip: {
    marginLeft: 8,
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    fontWeight: 500,
    fontSize: '0.8rem',
  },
  link: {
    textDecoration: 'none',
    color: '#1976d2',
    fontWeight: 500,
  },
  listItem: {
    padding: '16px 0',
    borderBottom: '1px solid #eee',
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 4,
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

function Index(props) {
  const dispatch = useDispatch();
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const title = "Boopursal | Place de marché B2B";
  const description =
    "Boopursal Site marchand et la place de marché b2b spécialisé dans le E-sourcing, E business, E marketing, Recherche de Fournisseur Acheteur ,Recever meilleure offre de prix,Site de vente en ligne, Boutique e commerce, Nouveaux clients, E marchands, Vente à distance, Logistique e commerce,E merchandising, Vente sur internet, Salon e commerce, Stratégie marketing, Solution e commerce";
  const portail = useSelector(({ IndexApp }) => IndexApp.poratilIndex);
  const settings = {
    speed: 500,
    slidesToScroll:
      portail.produits && portail.produits.length < 4
        ? portail.produits.length
        : 4,
    slidesToShow:
      portail.produits && portail.produits.length < 4
        ? portail.produits.length
        : 4,
    dots: false,
    infinite: portail.produits && portail.produits.length > 3,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          className: "slick-slider-m mb-16",
          arrows: false,
        },
      },
    ],
  };
  const opts = {
    width: "100%",
    height: "200px",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      showinfo: 0,
      fs: 0,
      modestbranding: 1,
      rel: 0,
    },
  };
  const classes = useStyles({ searchResultsVisible });

  useEffect(() => {
    dispatch(Actions.getCategories());
    return () => {
      dispatch(Actions.cleanUpCategories());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Actions.getFocusProduct());
    return () => {
      dispatch(Actions.cleanUpProduct());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Actions.getdemandeDevis());
    return () => {
      dispatch(Actions.cleanUpDevis());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Actions.getNews());
    return () => {
      dispatch(Actions.cleanUpNew());
    };
  }, [dispatch]);

  useEffect(() => {
    console.log('Search results visible:', searchResultsVisible);
  }, [searchResultsVisible]);

  return (
    <div
      className={clsx(
        classes.root,
        props.innerScroll && classes.innerScroll,
        "min-h-md"
      )}
    >
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {/** 
             ===================HEADER=================
            **/}
      <div
        className={clsx(
          classes.header,
          "relative flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24",
          {
            'h-288': !searchResultsVisible,
            'h-auto': searchResultsVisible
          }
        )}
        style={{ 
          paddingBottom: searchResultsVisible ? '300px' : '16px',
          marginBottom: searchResultsVisible ? '5px' : '0'
        }}
      >
        <div className={classes.mainHeader}>
          <FuseAnimate duration={400} delay={600}>
            <Typography
              variant="h1"
              component="h1"
              className="sm:text-18 uppercase leading-normal text-13 font-bold mb-16 text-white mx-auto max-w-xl"
            >
              Boopursal, c'est la communauté de +1000 sociétés,
              Acheteurs et Fournisseurs
            </Typography>
          </FuseAnimate>
          <div className="md:w-md xs:w-auto m-auto bg-white rounded-8">
            <Search 
              className="" 
              variant="basic" 
              onResultsVisibilityChange={setSearchResultsVisible}
            />
          </div>
        </div>

        {searchResultsVisible && (
          <div className={classes.searchResults}>
            <div style={{ marginBottom: '50px' }}>
              Résultats de recherche...
            </div>
          </div>
        )}
      </div>

      {/**===================CATEGORIES & RFQs=================**/}
      <div style={searchResultsVisible ? { marginTop: '2%' } : {}}>
        <Categories categories={portail.categories} />
      </div>
      

      <Grid container style={{ maxWidth: '1690px', margin: '0 auto', width: '100%' }}className=" max-w-2xl mx-auto px-8 sm:px-16 py-24">
      <Grid item sm={3} xs={12} className="flex flex-col justify-between  ">
    
          <div
            className={clsx(
              classes.bannerMeduim,
              "flex flex-wrap content-center"
            )}
          >
            <div className="text-center font-bold">
            <a
                href="http://www.combilift.ma/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  className=""
                  src="assets/images/banners/Web-Banner-Material-handling-450-x-90.gif"
                  alt="3fi banner 2"
                />
              </a>
             
              <a
                href="http://www.combilift.ma/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  className=""
                  src="assets/images/banners/Steel-Australia-900X300-PX.gif"
                  alt="3fi banner 2"
                />
              </a>
            </div>
          </div>
        </Grid>
      <Grid item sm={6} xs={12}>
  <div className={classes.section}>
    <ListItem>
      <ListItemAvatar>
        <Avatar className={classes.headerIcon}>
          <Icon>featured_play_list</Icon>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="h5" style={{ fontWeight: 700 }}>
            DERNIÈRES DEMANDES DE DEVIS
          </Typography>
        }
      />
    </ListItem>

    <List>
      {portail.loading ? (
        <ContentLoader speed={2} width={400} height={60} viewBox="0 0 400 100">
          <rect x="1" y="2" rx="3" ry="3" width="54" height="6" />
          <rect x="1" y="20" rx="3" ry="3" width="200" height="6" />
          <rect x="1" y="35" rx="9" ry="9" width="79" height="15" />
          <rect x="88" y="35" rx="9" ry="9" width="79" height="15" />
          <circle cx="373" cy="21" r="11" />
          <rect x="1" y="57" rx="0" ry="0" width="390" height="2" />
        </ContentLoader>
      ) : (
        <FuseAnimateGroup enter={{ animation: 'transition.slideUpBigIn' }}>
          {portail.data &&
            portail.data.map((item, index) => {
              const countryMapping = {
                "États-Unis": "us",
                "Allemagne": "de",
                "France": "fr",
                "Maroc": "ma",
                "Espagne": "es",
                "Italie": "it",
                "Royaume-Uni": "gb",
              };
              const code = countryMapping[item.pays] || null;

              return (
                <Link
                  key={index}
                  to={`/demandes-achat/${item.id}-${item.slug}`}  // URL dynamique avec la référence de la demande
                  style={{ textDecoration: 'none' }}  // Enlever la décoration du lien
                >
                  <div
                    style={{
                      backgroundColor: '#f9f9f9',
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 20,
                      boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
                    }}
                  >
                    <Typography variant="subtitle2" style={{ fontWeight: 700, color: '#1976d2' }}>
                      [ RFQ-{item.reference} ] {item.titre}
                    </Typography>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                      <Icon fontSize="small" style={{ color: '#616161' }}>description</Icon>
                      <Typography variant="body2" color="textSecondary">
                        {item.description.length > 100 ? item.description.slice(0, 100) + '…' : item.description}
                      </Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                      <Icon fontSize="small" style={{ color: '#616161' }}>access_time</Icon>
                      <Typography variant="body2" color="textSecondary">
                        Créée {moment(item.created).fromNow()}
                      </Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                      <Icon fontSize="small" style={{ color: '#616161' }}>hourglass_empty</Icon>
                      <Typography variant="body2" color="textSecondary">
                        Expire le {moment(item.dateExpiration).format('DD/MM/YYYY à HH:mm')}
                      </Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                      <Icon fontSize="small" style={{ color: '#616161' }}>public</Icon>
                      <Typography variant="body2" color="textSecondary">
                        {item.ville}, {item.pays}
                      </Typography>
                      {code && (
                        <Avatar
                          src={`https://flagcdn.com/w40/${code}.png`}
                          alt={item.pays}
                          style={{ width: 20, height: 20, borderRadius: '50%' }}
                        />
                      )}
                    </div>
                    {/* Bouton "Voir plus" */}
<div style={{ textAlign: 'right', marginTop: 16 }}>
  <Button
    size="small"
    color="primary"
    endIcon={<Icon fontSize="small">arrow_forward</Icon>}
    style={{ fontWeight: 600, textTransform: 'none' }}
  >
    Voir plus
  </Button>
</div>

                  </div>
                </Link>
                
              );
            })}
        </FuseAnimateGroup>
      )}
    </List>

    {portail.data && (
      <div style={{ textAlign: 'right', marginTop: 16 }}>
        <Link className={classes.link} to="/demandes-achats">
          Toutes les demandes de devis &rarr;
        </Link>
      </div>
    )}
  </div>
</Grid>


        <Grid item sm={3} xs={12} className="flex flex-col justify-between  ">
          <div
            className={clsx(
              classes.bannerMeduim,
              "flex flex-wrap content-center"
            )}
          >
            <div className="text-center font-bold ">
              <a
                href="https://www.3findustrie.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  className=""
                  src="assets/images/banners/banner2.jpeg"
                  alt="3fi banner 2"
                />
              </a>
            </div>
            <div className="text-center font-bold">
              <a
                href="https://www.mecalux.fr/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  className=""
                  src="assets/images/banners/Mecalux2025.png"
                  alt="Mecalux"
                />
              </a>
            </div>
          </div>
          
        </Grid>
      </Grid>
      {/** 
             ===================FOCUS PORDUCTS=================
            **/}
      <Grid container className="max-w-2xl mx-auto mb-16 px-8 sm:px-16 py-24">
        <Grid item sm={12}>
          <div>
            <ListItem
              classes={{
                container: classes.container,
              }}
            >
              <ListItemAvatar>
                <Avatar className={classes.mainAvatar}>
                  <Icon>collections_bookmark</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="h2"
                    component="h2"
                    className="text-20 font-bold xs:text-11 mb-1"
                  >
                    FOCUS PRODUITS
                  </Typography>
                }
                secondary="Un aperçu des catalogues produits B2B des fabricants et distributeurs présents sur Boopursal."
              />
              <ListItemSecondaryAction
                classes={{
                  root: classes.buttonSm,
                }}
              >
                <Button
                  component={Link}
                  to="/vente-produits"
                  className="whitespace-no-wrap"
                  color="secondary"
                  variant="outlined"
                >
                  Plus de produits
                  <Icon className="ml-4 arrow-icon">keyboard_arrow_right</Icon>
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            {portail.loadingProduits ? (
              <ContentLoader
                viewBox="0 0 1360 400"
                height={400}
                width={1360}
                speed={2}
              >
                <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
                <rect x="30" y="250" rx="0" ry="0" width="200" height="18" />
                <rect x="30" y="275" rx="0" ry="0" width="120" height="20" />
                <rect x="250" y="20" rx="8" ry="8" width="200" height="200" />
                <rect x="250" y="250" rx="0" ry="0" width="200" height="18" />
                <rect x="250" y="275" rx="0" ry="0" width="120" height="20" />
                <rect x="470" y="20" rx="8" ry="8" width="200" height="200" />
                <rect x="470" y="250" rx="0" ry="0" width="200" height="18" />
                <rect x="470" y="275" rx="0" ry="0" width="120" height="20" />
                <rect x="690" y="20" rx="8" ry="8" width="200" height="200" />
                <rect x="690" y="250" rx="0" ry="0" width="200" height="18" />
                <rect x="690" y="275" rx="0" ry="0" width="120" height="20" />
                <rect x="910" y="20" rx="8" ry="8" width="200" height="200" />
                <rect x="910" y="250" rx="0" ry="0" width="200" height="18" />
                <rect x="910" y="275" rx="0" ry="0" width="120" height="20" />
                <rect x="1130" y="20" rx="8" ry="8" width="200" height="200" />
                <rect x="1130" y="250" rx="0" ry="0" width="200" height="18" />
                <rect x="1130" y="275" rx="0" ry="0" width="120" height="20" />
              </ContentLoader>
            ) : (
              <Slider {...settings}>
                {portail.produits &&
                  portail.produits.map((item, index) => (
                    <Produit produit={item.produit} key={index} />
                  ))}
              </Slider>
            )}
          </div>
        </Grid>
      </Grid>

      <div
        className={clsx(
          classes.bannerLeadeboard,
          "flex flex-wrap content-center"
        )}
      >
        <a
          href="https://www.3findustrie.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            className=""
            src="assets/images/banners/banniere_preventica.jpg"
            alt="preventica banner"
          />
        </a>
      </div>
      {/*===================DECOUVREZ LES SHA=================**/}
      <div
        className={clsx(
          classes.middle,
          "relative hidden overflow-hidden flex flex-col flex-shrink-0  p-16 sm:p-24 h-512 sm:h-288 "
        )}
      >
        <div className={classes.overlay} />
        <Grid
          container
          className="max-w-2xl mx-auto px-8 sm:px-16 items-center py-24 z-9999"
        >
          <Grid item sm={7} xs={12}>
            <Typography
              variant="h2"
              component="h2"
              className="text-white text-24 uppercase mb-16"
            >
              Découvrez le service{" "}
              <span className="font-extrabold">Boopursal</span>
            </Typography>
            <Typography className="text-white opacity-75">
              La place de marché N°1 au Maroc, qui permet aux Acheteurs et aux
              Fournisseurs de se rencontrer dans une même plate-forme
              (électronique).
            </Typography>
          </Grid>
          <Grid item sm={5} xs={12}>
            <YouTube videoId="rv2v5pNCQb4" opts={opts} />
          </Grid>
        </Grid>

        <Icon className={classes.headerIcon}>school</Icon>
      </div>

      {/** 
             ===================INSCRIPTION FOURNISSEUR=================
            **/}
      <Grid container className="max-w-2xl mx-auto px-8 sm:px-16 py-24">
        <Grid item sm={6} xs={12} className={classes.bioFournisseur}>
          <BioFournisseur />
        </Grid>
        <Grid item sm={6} xs={12} className={classes.bioAchteur}>
          <BioAcheteur />
        </Grid>
      </Grid>

      {/** 
             ===================NEWS=================
            **/}
      <Grid container className="max-w-2xl mx-auto px-8 mb-16 sm:px-16 py-24">
        <Grid item sm={12}>
          <div>
            <ListItem
              classes={{
                container: classes.container,
              }}
            >
              <ListItemAvatar>
                <Avatar className={classes.mainAvatar}>
                  <Icon>local_library</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="h2"
                    component="h2"
                    className="text-20 font-bold uppercase xs:text-11 mb-1"
                  >
                    LES DERNIERS ARTICLES DE L'ACTUALITÉ
                  </Typography>
                }
              />
              <ListItemSecondaryAction
                classes={{
                  root: classes.buttonXs,
                }}
              >
                <Button
                  component={Link}
                  to="/actualites"
                  className="whitespace-no-wrap"
                  color="secondary"
                  variant="outlined"
                >
                  Toute l'actualité
                  <Icon className="ml-4 arrow-icon">keyboard_arrow_right</Icon>
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Grid container spacing={2} className="justify-center">
              {portail.loadingNews
                ? generate(
                    <Grid item sm={3}>
                      <ContentLoader
                        speed={2}
                        width={119}
                        height={100}
                        viewBox="0 0 119 100"
                      >
                        <rect
                          x="4"
                          y="7"
                          rx="0"
                          ry="0"
                          width="125"
                          height="77"
                        />
                        <rect
                          x="7"
                          y="95"
                          rx="3"
                          ry="3"
                          width="85"
                          height="7"
                        />
                      </ContentLoader>
                    </Grid>
                  )
                : portail.news &&
                  portail.news.map((item, index) => (
                    <Grid item sm={3} key={index}>
                      <News news={item} />
                    </Grid>
                  ))}
            </Grid>
          </div>
        </Grid>
      </Grid>

      {/** 
             ===================NEWSLETTER=================
            **/}
      <div
        className={clsx(
          classes.middle,
          "mb-0 relative overflow-hidden flex flex-col flex-shrink-0  p-16 sm:p-24 h-300 sm:h-96 "
        )}
      >
        <div className={classes.overlay} />
        <Grid
          container
          className="max-w-2xl mx-auto px-8  sm:px-16 items-center z-9999"
        >
          <Grid item sm={7} xs={12}>
            <Typography
              variant="h2"
              component="h2"
              className="text-white text-24 uppercase mb-2"
            >
              Newsletters{" "}
              <span className="font-extrabold"> Boopursal</span>
            </Typography>
            <Typography className="text-white opacity-75">
              Inscrivez-vous pour recevoir les newsletters dans votre boîte
              mail.
            </Typography>
          </Grid>
          <Grid item sm={5} xs={12}>
            <FuseAnimate
              animation="transition.slideUpIn"
              duration={400}
              delay={100}
            >
              <Newsletter />
            </FuseAnimate>
          </Grid>
        </Grid>

       
      </div>
    </div>
  );
}
export default withReducer("IndexApp", reducer)(Index);
