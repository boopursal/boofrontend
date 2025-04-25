import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Divider,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { FuseAnimate, LOCAL_CURRENCY } from "@fuse";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    //backgroundColor: theme.palette.background.paper,
    //border: "2px solid #f48d35",
    borderRadius: 20,
    marginTop: "-109px",
    [theme.breakpoints.down("sm")]: {
      marginTop: 0, // 👈 Annulé sur mobile
    },
  },
  header1: {
    height: 300,
    background:
      "linear-gradient(to right, " +
      theme.palette.secondary.dark +
      " 0%, " +
      theme.palette.secondary.main +
      " 100%)",
    color: "white",
  },
  tabPanel: {
    padding: theme.spacing(2),
  },
  header: {
    padding: theme.spacing(2),
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "2.0rem",
    letterSpacing: "0.5px",
  },
  featureItem: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  featureLabel: {
    fontWeight: "500",
    color: theme.palette.text.secondary,
  },
  featureValue: {
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  freeHeader: {
    background:
                        "linear-gradient(to top left, #feb2b2 10%, #feb2b2 30%, #e53e3e 60%, #e53e3e 60%)",
                      borderRadius: "20px 20px 0 0",
                      border: "1px solid #f56565",
  },
  classicHeader: {
    background:
                        "linear-gradient(to top left, #9ae6b4 10%, #9ae6b4 30%, #38a169 60%, #38a169 60%)",
                      borderRadius: "20px 20px 0 0",
                      border: "1px solid #38a169",
  },
  businessHeader: {
    background:
                        "linear-gradient(to top left, #90cdf4 10%, #90cdf4 30%, #3182ce 60%, #3182ce 60%)",
                      borderRadius: "20px 20px 0 0",
                      border: "1px solid #3182ce",
  },
  goldHeader: {
    background:
    "linear-gradient(to top left, #faf089 10%, #faf089 30%, #d69e2e 60%, #d69e2e 60%)",
  borderRadius: "20px 20px 0 0",
  border: "1px solid #d69e2e",
  },
  
    pageWrapper: {
      paddingLeft: theme.spacing(32), // 32px
      paddingRight: theme.spacing(32),
     
    },
 
    
  }));
  

const plans = [
    {
      name: "FREE",
      price: "€00.00",
      headerClass: "freeHeader",
      features: [
        { label: "Publication des demandes de devis ( RFQ )", value: "illimité" },
        { label: "Réception des devis", value: "illimité" },
        { label: "Voir les profils des Fournisseurs", value: "✔" },
        { label: "Voir les catalogues des Fournisseurs", value: "✔" },
        { label: "Voir le nombre de Fournisseurs Intéressés *", value: "✔" },
        { label: "Compte anonyme **", value: "✔" },
        { label: "Voir le nombre de diffusions de la ( RFQ )", value: "✗" },
        { label: "Sous-compte Acheteur ***", value: "✗" },
        { label: "Blackliste", value: "✗" },
        { label: "Critère sélection fournisseur", value: "✗" },
        { label: "Critère sélection produit", value: "✗" },
          ],
    },
    {
      name: "ACHETEUR PRO",
      price: "€38.00",
      headerClass: "classicHeader",
      features: [
        { label: "Publication des demandes de devis ( RFQ )", value: "illimité" },
        { label: "Réception des devis", value: "illimité" },
        { label: "Voir les profils des Fournisseurs", value: "✔" },
        { label: "Voir les catalogues des Fournisseurs", value: "✔" },
        { label: "Voir le nombre de Fournisseurs Intéressés *", value: "✔" },
        { label: "Compte anonyme **", value: "✔" },
        { label: "Voir le nombre de diffusions de la ( RFQ )", value: "✔" },
        { label: "Sous-compte Acheteur ***", value: "✔" },
        { label: "Blackliste", value: "✔" },
        { label: "Critère sélection fournisseur", value: "✗" },
        { label: "Critère sélection produit", value: "✗" },
      ],
    },
     {
      name: "ACHETEUR PRO PLUS",
      price: "€50.00",
      headerClass: "goldHeader",
      features: [
        { label: "Publication des demandes de devis ( RFQ )", value: "illimité" },
        { label: "Réception des devis", value: "illimité" },
        { label: "Voir les profils des Fournisseurs", value: "✔" },
        { label: "Voir les catalogues des Fournisseurs", value: "✔" },
        { label: "Voir le nombre de Fournisseurs Intéressés *", value: "✔" },
        { label: "Compte anonyme **", value: "✔" },
        { label: "Voir le nombre de diffusions de la ( RFQ )", value: "✔" },
        { label: "Sous-compte Acheteur ***", value: "✔" },
        { label: "Blackliste", value: "✔" },
        { label: "Critère sélection fournisseur", value: "✔" },
        { label: "Critère sélection produit", value: "✔" },
      ],
    },
  ];
  

const PricingAcheteur = (props) => {
    const classes = useStyles();
    const { currency } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [selectedTab, setSelectedTab] = React.useState(0);
  
    const handleTabChange = (event, newValue) => {
      setSelectedTab(newValue);
    };
  
    const renderPlanDetails = (plan) => (
 
        
      <div className={classes.root}>
       

       <div className={`${classes.header} ${classes[plan.headerClass]}`}>
    <div className="text-black uppercase font-extrabold pt-16 text-[24px]">
      {plan.name}
    </div>
    

    
  

    
    <div className="flex justify-center mt-12 text-black">
      <span className="uppercase text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px]">
      {currency === 0 ? LOCAL_CURRENCY : currency === 1 ? "€" : "$"}
      </span>
      <span className="uppercase font-extrabold text-[32px] ml-1">
        {currency === 0
          ? Math.round(parseFloat(plan.price.replace("€", "")) * 10)
          : plan.price.replace("€", "").split(".")[0]}
        <span className="text-[10px]">
          ,{currency === 0 ? "00" : plan.price.split(".")[1] || "00"} / mois
          {currency === 0 && " HT"}
        </span>
      </span>
    </div>
  
  
  </div>
  <Grid container spacing={0} style={{ border: '1px solid #ccc' }}>
  {plan.features.map((item, index) => (
    <React.Fragment key={index}>
      <Grid
        item
        xs={6}
        style={{
          borderBottom: '1px solid #ccc',
          borderRight: '1px solid #ccc',
          padding: '8px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {item.label}
      </Grid>
      <Grid
        item
        xs={6}
        style={{
          borderBottom: '1px solid #ccc',
          padding: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color:
            item.value === '✔'
              ? 'green'
              : item.value === '✗'
              ? 'red'
              : 'inherit',
        }}
      >
        {item.value === '✔' ? '✅' : item.value === '✗' ? '❌' : item.value}
      </Grid>
    </React.Fragment>
  ))}
</Grid>

      </div>
    );
  
    if (isMobile) {
        
      return (
        <>
        <div className={clsx(classes.header1, "flex")}>
        <div className="p-24 w-full max-w-2xl mx-auto">
          <div className="text-center my-40 mx-24">
            <FuseAnimate
              animation="transition.slideUpIn"
              duration={400}
              delay={100}
            >
              <Typography
                variant="h1"
                color="inherit"
                className="font-bold uppercase text-24 sm:text-32 md:text-44 "
              >
                Tarif Acheteur
              </Typography>
            </FuseAnimate>
          </div>
        </div>
      </div>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
          >
            {plans.map((plan, index) => (
              <Tab label={plan.name} key={index} />
            ))}
          </Tabs>
          <Divider />
          <div className={classes.tabPanel}>{renderPlanDetails(plans[selectedTab])}</div>
          <div className="flex flex-col mt-8">
            <Typography variant="caption">
              * Les Fournisseurs qui ont acheté votre Profil pour vous
              contacter.
            </Typography>
            <Typography variant="caption">
              ** Le compte anonyme vous libère de gérer vos achats et les
              fournisseurs ne sauront pas votre identité. Un pourcentage payant
              sera défini en commun accord pour chaque RFQ.
            </Typography>
            <Typography variant="caption">
              *** Sous Compte acheteur vous permet d'ajouter vos collègues ou
              collaborateurs pour plus d'efficacité.
            </Typography>
          </div>
        </>
      );
    }
  
    return (
        
      <div>
         <div className={clsx(classes.header1, "flex")}>
        <div className="p-24 w-full max-w-2xl mx-auto">
          <div className="text-center my-40 mx-24">
            <FuseAnimate
              animation="transition.slideUpIn"
              duration={400}
              delay={100}
            >
              <Typography
                variant="h1"
                color="inherit"
                className="font-bold uppercase text-24 sm:text-32 md:text-44 "
              >
                Tarif Acheteur
              </Typography>
            </FuseAnimate>
          </div>
        </div>
      </div>
       <div className={classes.pageWrapper}>
    <Grid container spacing={2}>
      {plans.map((plan, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          {renderPlanDetails(plan)}
        </Grid>
      ))}
    </Grid>
    <div className="flex flex-col mt-8">
            <Typography variant="caption">
              * Les Fournisseurs qui ont acheté votre Profil pour vous
              contacter.
            </Typography>
            <Typography variant="caption">
              ** Le compte anonyme vous libère de gérer vos achats et les
              fournisseurs ne sauront pas votre identité. Un pourcentage payant
              sera défini en commun accord pour chaque RFQ.
            </Typography>
            <Typography variant="caption">
              *** Sous Compte acheteur vous permet d'ajouter vos collègues ou
              collaborateurs pour plus d'efficacité.
            </Typography>
          </div>
  </div>
  </div>
    );
    
  };
  

export default PricingAcheteur;
