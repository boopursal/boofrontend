import React, { useEffect, useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { FuseAnimate, FuseAnimateGroup } from "@fuse";
import PricingFournisseur from "./PricingFournisseur";
import PricingAcheteur from "./PricingAcheteur";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  header: {
    height: 450,
    background:
      "linear-gradient(to right, " +
      theme.palette.primary.dark +
      " 0%, " +
      theme.palette.primary.main +
      " 100%)",
    color: "white",
  },
}));

const euroCountries = [
  "FR", "BE", "DE", "IT", "ES", "PT", "NL", "FI", "AT", "IE", "GR", "LU", "MT", "CY", "SI", "SK", "LV", "LT", "EE"
];

function TarifDetail(props) {
  const classes = useStyles();
  const [currency, setCurrency] = useState(0); // 0: MAD, 1: EUR, 2: USD
  const [localCurrency, setLocalCurrency] = useState("");

  const plans = [
    {
      name: "FREE",
      price: { MAD: 0, EUR: 0, USD: 0 },
    },
    {
      name: "CLASSIC",
      price: { MAD: 25, EUR: 25, USD: 25 },
    },
    {
      name: "BUSINESS",
      price: { MAD: 35, EUR: 35, USD: 35 },
    },
    {
      name: "GOLD",
      price: { MAD: 45, EUR: 45, USD: 45 },
    },
  ];

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const country = data.country_code;
  
        if (country === "MA") {
          setLocalCurrency("MAD");
          setCurrency(0); // 0 = MAD
        } else if (euroCountries.includes(country)) {
          setLocalCurrency("€");
          setCurrency(1); // 1 = €
        } else {
          setLocalCurrency("$");
          setCurrency(2); // 2 = $
        }
      })
      .catch(() => {
        setLocalCurrency("$"); // Erreur => Par défaut $
        setCurrency(2); // 2 = $
      });
  }, []);

  function handleChangeCurrency(value) {
    setCurrency(value);
  }

  const getPriceInCurrency = (price) => {
    switch (currency) {
      case 0:
        return price.MAD + " MAD"; // Moroccan Dirham
      case 1:
        return price.EUR + " €"; // Euro
      case 2:
        return price.USD + " $"; // USD
      default:
        return price.EUR + " €"; // Default to Euro
    }
  };

  return (
    <div>
      <div className={clsx(classes.header, "flex")}>
        <div className="p-24 w-full max-w-2xl mx-auto">
          <div className="text-center my-40 mx-24">
            <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
              <Typography
                variant="h1"
                color="inherit"
                className="font-bold uppercase text-24 sm:text-32 md:text-44"
              >
                Tarif Fournisseur
              </Typography>
            </FuseAnimate>

            <FuseAnimate duration={400} delay={600}>
              <Typography
                variant="subtitle1"
                color="inherit"
                className="opacity-75 mt-16 text-13 sm:text-18 mx-auto max-w-512"
              >
                {" "}
                <span className=" italic font-bold uppercase">Boopursal</span> la place de marché professionnelles, 
                la plus adaptée à vos besoins avec une tarification 
                transparente et abordable. N'hésitez pas à nous tester avec la formule gratuite !
              </Typography>
            </FuseAnimate>

            <FuseAnimateGroup
              enter={{ animation: "transition.expandIn" }}
              duration={400}
              delay={600}
              className="mt-16"
            >
              <Button
                variant={currency === 0 ? "contained" : "outlined"}
                color="secondary"
                className="mr-16"
                onClick={() => handleChangeCurrency(0)}
              >
                MAD
              </Button>
              <Button
                color="secondary"
                className="mr-16"
                onClick={() => handleChangeCurrency(1)}
                variant={currency === 1 ? "contained" : "outlined"}
              >
                €
              </Button>
              <Button
                color="secondary"
                onClick={() => handleChangeCurrency(2)}
                variant={currency === 2 ? "contained" : "outlined"}
              >
                $
              </Button>
            </FuseAnimateGroup>
          </div>
        </div>
      </div>

      <PricingFournisseur currency={currency} />
      <PricingAcheteur currency={currency} />
    </div>
  );
}

export default React.memo(TarifDetail);
