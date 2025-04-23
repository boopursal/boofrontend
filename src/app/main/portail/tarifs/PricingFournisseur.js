import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Divider,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { FuseAnimate, LOCAL_CURRENCY } from "@fuse";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    //backgroundColor: theme.palette.background.paper,
    border: "2px solid #f48d35",
    borderRadius: 8,
    marginTop: "-94px",
    [theme.breakpoints.down("sm")]: {
      marginTop: 0, // 👈 Annulé sur mobile
    },
  },
  tabPanel: {
    padding: theme.spacing(2),
  },
  header: {
    padding: theme.spacing(2),
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "1.1rem",
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
      paddingLeft: theme.spacing(4), // 32px
      paddingRight: theme.spacing(4),
     
    },
 
  
  
}));

const plans = [
  {
    name: "FREE",
    price: "€00.00",
    headerClass: "freeHeader",
    features: [
      { label: "Activités", value: "1 activité" },
      { label: "Présentations de Produits / Services", value: "✔" },
      { label: "Images / Photos", value: "Max 5" },
      { label: "Fiches Techniques", value: "Max 5" },
      { label: "Vidéos", value: "Max 5" },
      { label: "Réception des demandes", value: "illimité" },
      { label: "Mini-site de votre société", value: "✔" },
      { label: "Catalogues produits", value: "✔" },
      { label: "Catalogues PDF téléchargeable", value: "✗" },
      { label: "Réception de devis (RFQ) par mail", value: "illimité" },
      { label: "Gestion commerciale", value: "✗" },
      { label: "Création d’Agences / Services", value: "✗" },
      { label: "Affectation des demandes d’achats", value: "✗" },
      { label: "Suivi des ventes", value: "✗" },
      { label: "Présentation en '1ère Page'", value: "✗" },
      { label: "Bannière publicitaire 720x90px", value: "✗" },
    ],
  },
  {
    name: "CLASSIC",
    price: "€25.00",
    headerClass: "classicHeader",
    features: [
      { label: "Activités", value: "3 activités" },
      { label: "Présentations de Produits / Services", value: "✔" },
      { label: "Images / Photos", value: "5 par produit" },
      { label: "Fiches Techniques", value: "1 par produit" },
      { label: "Vidéos", value: "1 par produit" },
      { label: "Réception des demandes", value: "illimité" },
      { label: "Mini-site de votre société", value: "✔" },
      { label: "Catalogues produits", value: "✔" },
      { label: "Catalogues PDF téléchargeable", value: "✗" },
      { label: "Réception de devis (RFQ) par mail", value: "illimité" },
      { label: "Gestion commerciale", value: "✗" },
      { label: "Création d’Agences / Services", value: "✗" },
      { label: "Affectation des demandes d’achats", value: "✗" },
      { label: "Suivi des ventes", value: "✗" },
      { label: "Présentation en '1ère Page'", value: "1 produit (1 mois)" },
      { label: "Bannière publicitaire 720x90px", value: "✗" },
    ],
  },
  {
    name: "BUSINESS",
    price: "€35.00",
    headerClass: "businessHeader",
    features: [
      { label: "Activités", value: "5 activités" },
      { label: "Présentations de Produits / Services", value: "✔" },
      { label: "Images / Photos", value: "5 par produit" },
      { label: "Fiches Techniques", value: "1 par produit" },
      { label: "Vidéos", value: "1 par produit" },
      { label: "Réception des demandes", value: "illimité" },
      { label: "Mini-site de votre société", value: "✔" },
      { label: "Catalogues produits", value: "✔" },
      { label: "Catalogues PDF téléchargeable", value: "10 pages" },
      { label: "Réception de devis (RFQ) par mail", value: "illimité" },
      { label: "Gestion commerciale", value: "✔" },
      { label: "Création d’Agences / Services", value: "✔" },
      { label: "Affectation des demandes d’achats", value: "✔" },
      { label: "Suivi des ventes", value: "✔" },
      { label: "Présentation en '1ère Page'", value: "1 produit (1 mois)" },
      { label: "Bannière publicitaire 720x90px", value: "✗" },
    ],
  },
  {
    name: "GOLD",
    price: "€45.00",
    headerClass: "goldHeader",
    features: [
      { label: "Activités", value: "10 activités" },
      { label: "Présentations de Produits / Services", value: "✔" },
      { label: "Images / Photos", value: "5 par produit" },
      { label: "Fiches Techniques", value: "1 par produit" },
      { label: "Vidéos", value: "1 par produit" },
      { label: "Réception des demandes", value: "illimité" },
      { label: "Mini-site de votre société", value: "✔" },
      { label: "Catalogues produits", value: "✔" },
      { label: "Catalogues PDF téléchargeable", value: "20 pages" },
      { label: "Réception de devis (RFQ) par mail", value: "illimité" },
      { label: "Gestion commerciale", value: "✔" },
      { label: "Création d’Agences / Services", value: "✔" },
      { label: "Affectation des demandes d’achats", value: "✔" },
      { label: "Suivi des ventes", value: "✔" },
      { label: "Présentation en '1ère Page'", value: "2 produits (1 mois)" },
      { label: "Bannière publicitaire 720x90px", value: "1 bannière (3 mois)" },
    ],
  },
];

const PricingFournisseur = (props) => {
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
      {currency === 0 ? LOCAL_CURRENCY : "€"}
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
      <List disablePadding>
        {plan.features.map((item, index) => (
          <ListItem key={index} className={classes.featureItem}>
            <Grid container>
              <Grid item xs={6}>
                <ListItemText
                  primary={item.label}
                  className={classes.featureLabel}
                />
              </Grid>
              <Grid item xs={6}>
                <ListItemText
                  primary={item.value}
                  className={classes.featureValue}
                />
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (isMobile) {
    return (
      <>
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
      </>
    );
  }

  return (
    <div className={classes.pageWrapper}>
  <Grid container spacing={2}>
    {plans.map((plan, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        {renderPlanDetails(plan)}
      </Grid>
    ))}
  </Grid>
</div>
  );
};

export default PricingFournisseur;
