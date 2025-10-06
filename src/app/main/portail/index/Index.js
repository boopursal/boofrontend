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
  Container,
  Box,
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
        right: "-15px",
        position: "absolute",
        top: "50%",
        zIndex: 1,
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
        zIndex: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        border: "1px solid #bfbfbf",
        color: "#4a4a4a",
        left: "-15px",
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
    width: '100%',
    overflowX: 'hidden',
  },
  container: {
    listStyleType: "none",
  },
  header: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    position: "relative",
    backgroundImage: "url(assets/images/backgrounds/dark-material-bg.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 3),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 4),
    },
  },
  middle: {
    background: "linear-gradient(to right, " +
      theme.palette.primary.dark +
      " 0%, " +
      theme.palette.primary.main +
      " 100%)",
    position: "relative",
    marginBottom: theme.spacing(4),
    width: '100%',
  },
  searchResults: {
    width: '100%',
    maxWidth: '1200px',
    margin: '20px auto',
    zIndex: 2
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
  mainHeader: {
    backgroundColor: "rgba(0,0,0,.7)",
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    borderRadius: 8,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
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
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1, 1, 1, 0),
    },
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
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
      marginBottom: theme.spacing(3),
    },
  },
  bioAchteur: {
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
    },
  },
  bannerLeadeboard: {
    width: "100%",
    maxWidth: "1200px",
    height: "auto",
    margin: "0 auto",
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  bannerMeduim: {
    width: '100%',
    height: 'auto',
    margin: '0 auto',
  },
  categoriesWithTopMargin: {
    marginTop: '21%',
  },
  section: {
    backgroundColor: '#f4f6f8',
    padding: theme.spacing(2),
    borderRadius: 12,
    boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
    },
  },
  sectionHeaderIcon: {
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
  mainContainer: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
    },
  },
  contentGrid: {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  bannerColumn: {
    [theme.breakpoints.down('md')]: {
      order: 3,
      marginTop: theme.spacing(3),
    },
  },
  centerColumn: {
    [theme.breakpoints.down('md')]: {
      order: 1,
      marginBottom: theme.spacing(3),
    },
  },
  sliderContainer: {
    width: '100%',
    padding: theme.spacing(0, 4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 1),
    },
  },
  videoSection: {
    width: '100%',
    padding: theme.spacing(4, 0),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 0),
    },
  },
  subscriptionSection: {
    width: '100%',
    padding: theme.spacing(4, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 2),
    },
  },
  newsGrid: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  bannerImage: {
    width: '100%',
    height: 'auto',
    borderRadius: 8,
    display: 'block',
  },
  responsiveSpacing: {
    padding: theme.spacing(4, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 3),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 4),
    },
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
  const classes = useStyles(props);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const title = "Boopursal | Place de marché B2B";
  const description =
    "Boopursal Site marchand et la place de marché b2b spécialisé dans le E-sourcing, E business, E marketing, Recherche de Fournisseur Acheteur ,Recever meilleure offre de prix,Site de vente en ligne, Boutique e commerce, Nouveaux clients, E marchands, Vente à distance, Logistique e commerce,E merchandising, Vente sur internet, Salon e commerce, Stratégie marketing, Solution e commerce";
  const portail = useSelector(({ IndexApp }) => IndexApp.poratilIndex);
  
  const settings = {
    speed: 500,
    slidesToScroll: 4,
    slidesToShow: 4,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        }
      },
    ],
  };

  const opts = {
    width: "100%",
    height: "200px",
    playerVars: {
      showinfo: 0,
      fs: 0,
      modestbranding: 1,
      rel: 0,
    },
  };
  
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
    <div className={clsx(classes.root, props.innerScroll && classes.innerScroll, "min-h-md")}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      {/** HEADER **/}
      <div className={classes.header}>
        <div className={classes.mainHeader}>
          <FuseAnimate duration={400} delay={600}>
            <Typography
              variant="h1"
              component="h1"
              className="text-16 sm:text-18 md:text-20 uppercase leading-normal font-bold mb-8 sm:mb-12 md:mb-16 text-white mx-auto text-center"
            >
              Boopursal, c'est la communauté de +1000 sociétés,
              Acheteurs et Fournisseurs
            </Typography>
          </FuseAnimate>
          <div className="w-full max-w-2xl m-auto bg-white rounded-8">
            <Search 
              className="w-full" 
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

      {/** CATEGORIES **/}
      <div style={{ marginTop: searchResultsVisible ? '21%' : undefined }} className={classes.mainContainer}>
        <Categories categories={portail.categories} />
      </div>

      {/** DEMANDES DE DEVIS & BANNERS **/}
      <Container maxWidth="xl" className={classes.mainContainer}>
        <Grid container spacing={3} className={classes.contentGrid}>
          {/* Colonne gauche (banners) */}
          <Grid item xs={12} md={3} className={classes.bannerColumn}>
            <div className="flex flex-col space-y-4 sm:space-y-6">
              <a href="https://www.3findustrie.com/" rel="noopener noreferrer" target="_blank" className="block">
                <img
                  src="assets/images/banners/Web-Banner-Material-handling-450-x-90.gif"
                  alt="3fi banner 1"
                  className={classes.bannerImage}
                />
              </a>
              <a href="https://www.3findustrie.com/" rel="noopener noreferrer" target="_blank" className="block">
                <img
                  src="assets/images/banners/Steel-Australia-900X300-PX.gif"
                  alt="3fi banner 2"
                  className={classes.bannerImage}
                />
              </a>
            </div>
          </Grid>

          {/* Centre - Dernières demandes */}
          <Grid item xs={12} md={6} className={classes.centerColumn}>
            <div className={classes.section}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.sectionHeaderIcon}>
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
                    {portail.data && portail.data.map((item, index) => {
                      const countryMapping = {
                        "États-Unis": "us",
                        Allemagne: "de",
                        France: "fr",
                        Maroc: "ma",
                        Espagne: "es",
                        Italie: "it",
                        "Royaume-Uni": "gb",
                      };
                      const code = countryMapping[item.pays] || null;

                      return (
                        <Link
                          key={index}
                          to={`/demandes-achat/${item.id}-${item.slug}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Box
                            sx={{
                              backgroundColor: '#f9f9f9',
                              borderRadius: 12,
                              padding: 2,
                              marginBottom: 2.5,
                              boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
                            }}
                          >
                            <Typography variant="subtitle2" style={{ fontWeight: 700, color: '#1976d2' }}>
                              [ RFQ-{item.reference} ] {item.titre}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 0.75 }}>
                              <Icon fontSize="small" style={{ color: '#616161' }}>
                                description
                              </Icon>
                              <Typography variant="body2" color="textSecondary">
                                {item.description.length > 100
                                  ? item.description.slice(0, 100) + '…'
                                  : item.description}
                              </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 0.75 }}>
                              <Icon fontSize="small" style={{ color: '#616161' }}>
                                access_time
                              </Icon>
                              <Typography variant="body2" color="textSecondary">
                                Créée {moment(item.created).fromNow()}
                              </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 0.75 }}>
                              <Icon fontSize="small" style={{ color: '#616161' }}>
                                hourglass_empty
                              </Icon>
                              <Typography variant="body2" color="textSecondary">
                                Expire le {moment(item.dateExpiration).format('DD/MM/YYYY à HH:mm')}
                              </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 0.75 }}>
                              <Icon fontSize="small" style={{ color: '#616161' }}>
                                public
                              </Icon>
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
                            </Box>

                            <Box sx={{ textAlign: 'right', marginTop: 2 }}>
                              <Button
                                size="small"
                                color="primary"
                                endIcon={<Icon fontSize="small">arrow_forward</Icon>}
                                style={{ fontWeight: 600, textTransform: 'none' }}
                              >
                                Voir plus
                              </Button>
                            </Box>
                          </Box>
                        </Link>
                      );
                    })}
                  </FuseAnimateGroup>
                )}
              </List>

              {portail.data && (
                <Box sx={{ textAlign: 'right', marginTop: 2 }}>
                  <Link className={classes.link} to="/demandes-achats">
                    Toutes les demandes de devis &rarr;
                  </Link>
                </Box>
              )}
            </div>
          </Grid>

          {/* Colonne droite (banners) */}
          <Grid item xs={12} md={3} className={classes.bannerColumn}>
            <div className="flex flex-col space-y-4 sm:space-y-6">
              <a href="https://www.3findustrie.com/" rel="noopener noreferrer" target="_blank" className="block">
                <img
                  src="assets/images/banners/banner2.jpeg"
                  alt="3fi banner 2"
                  className={classes.bannerImage}
                />
              </a>
              <a href="https://www.mecalux.fr/" rel="noopener noreferrer" target="_blank" className="block">
                <img
                  src="assets/images/banners/Mecalux2025.png"
                  alt="Mecalux banner"
                  className={classes.bannerImage}
                />
              </a>
            </div>
          </Grid>
        </Grid>
      </Container>

      {/** FOCUS PRODUITS **/}
      <Container maxWidth="xl" className={classes.mainContainer}>
        <Box sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.mainAvatar}>
                <Icon>collections_bookmark</Icon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h4" component="h2" className="font-bold">
                  FOCUS PRODUITS
                </Typography>
              }
              secondary="Un aperçu des catalogues produits B2B des fabricants et distributeurs présents sur Boopursal."
            />
            <ListItemSecondaryAction className={classes.buttonSm}>
              <Button
                component={Link}
                to="/vente-produits"
                className="whitespace-no-wrap"
                color="secondary"
                variant="outlined"
              >
                Plus de produits
                <Icon className="ml-4">keyboard_arrow_right</Icon>
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          
          {portail.loadingProduits ? (
            <ContentLoader
              viewBox="0 0 1360 400"
              height={400}
              width="100%"
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
            </ContentLoader>
          ) : (
            <div className={classes.sliderContainer}>
              <Slider {...settings}>
                {portail.produits && portail.produits.map((item, index) => (
                  <Produit produit={item.produit} key={index} />
                ))}
              </Slider>
            </div>
          )}
        </Box>
      </Container>

      {/** BANNER LEADERBOARD **/}
      <div className={classes.bannerLeadeboard}>
        <a href="https://www.3findustrie.com/" rel="noopener noreferrer" target="_blank">
          <img
            className="w-full h-auto rounded-lg"
            src="assets/images/banners/banniere_preventica.jpg"
            alt="preventica banner"
          />
        </a>
      </div>
 
      {/** SECTION VIDEO **/}
     {/*  <div className={clsx(classes.middle, classes.videoSection)}>
        <Container maxWidth="xl" className={classes.mainContainer}>
          <Grid container spacing={4} alignItems="center" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
            <Grid item xs={12} md={7}>
              <Typography variant="h4" className="text-white uppercase mb-4 font-bold">
                Découvrez le service{" "}
                <span className="font-extrabold">Les Achats Industriels</span>
              </Typography>
              <Typography className="text-white opacity-75 text-lg">
                La place de marché N°1 au Maroc, qui permet aux Acheteurs et aux
                Fournisseurs de se rencontrer dans une même plate-forme
                (électronique).
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <YouTube videoId="rv2v5pNCQb4" opts={opts} />
            </Grid>
          </Grid>
        </Container>
      </div>
} */}
      {/** INSCRIPTION FOURNISSEUR/ACHETEUR **/}
      <Container maxWidth="xl" className={classes.subscriptionSection}>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6}>
            <BioFournisseur />
          </Grid>
          <Grid item xs={12} md={6}>
            <BioAcheteur />
          </Grid>
        </Grid>
      </Container>

      {/** ACTUALITÉS **/}
      <Container maxWidth="xl" className={classes.mainContainer}>
        <Box sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.mainAvatar}>
                <Icon>local_library</Icon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h4" component="h2" className="font-bold uppercase">
                  LES DERNIERS ARTICLES DE L'ACTUALITÉ
                </Typography>
              }
            />
            <ListItemSecondaryAction className={classes.buttonXs}>
              <Button
                component={Link}
                to="/actualites"
                className="whitespace-no-wrap"
                color="secondary"
                variant="outlined"
              >
                Toute l'actualité
                <Icon className="ml-4">keyboard_arrow_right</Icon>
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          
          <Grid container spacing={3} className={classes.newsGrid}>
            {portail.loadingNews
              ? generate(
                  <Grid item xs={12} sm={6} md={3}>
                    <ContentLoader
                      speed={2}
                      width={119}
                      height={100}
                      viewBox="0 0 119 100"
                    >
                      <rect x="4" y="7" rx="0" ry="0" width="125" height="77" />
                      <rect x="7" y="95" rx="3" ry="3" width="85" height="7" />
                    </ContentLoader>
                  </Grid>
                )
              : portail.news && portail.news.map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <News news={item} />
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Container>

      {/** NEWSLETTER **/}
      <div className={clsx(classes.middle, "py-8 sm:py-12 md:py-16")}>
        <Container maxWidth="xl" className={classes.mainContainer}>
          <Grid container spacing={4} alignItems="center" sx={{ py: { xs: 4, sm: 6 } }}>
            <Grid item xs={12} md={7}>
              <Typography variant="h4" className="text-white uppercase mb-2 font-bold">
                Newsletters{" "}
                <span className="font-extrabold">Boopursal</span>
              </Typography>
              <Typography className="text-white opacity-75 text-lg">
                Inscrivez-vous pour recevoir les newsletters dans votre boîte mail.
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                <Newsletter />
              </FuseAnimate>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default withReducer("IndexApp", reducer)(Index);