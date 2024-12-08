// front-end/src/app/main/portail/index/Categories.js
import React from "react";
import { Avatar, Grid, Typography, Icon } from "@material-ui/core";
import { URL_SITE } from "@fuse";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  categoryCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 120, // Largeur fixe pour un design carré
    height: 120, // Hauteur fixe pour un design carré
    margin: theme.spacing(2), // Espacement entre les catégories
    textAlign: "center", // Centrer le texte
    borderRadius: 8, // Coins arrondis
    boxShadow: `0 4px 12px rgba(0, 0, 0, 0.2)`, // Ombre pour un effet de profondeur
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Transition pour l'effet de survol
    "&:hover": {
      transform: "translateY(-5px)", // Légère élévation au survol
      boxShadow: `0 8px 20px rgba(0, 0, 0, 0.3)`, // Ombre plus prononcée au survol
    },
  },
  avatar: {
    width: 80, // Taille de l'avatar augmentée
    height: 80, // Taille de l'avatar augmentée
    marginBottom: theme.spacing(1), // Espacement en bas de l'avatar
  },
  categoryText: {
    fontSize: "16px", // Taille de texte augmentée pour une meilleure lisibilité
    fontWeight: "600", // Poids de police pour un aspect plus professionnel
    color: theme.palette.text.primary, // Couleur de texte dynamique
    lineHeight: 1.4, // Amélioration de la lisibilité
  },
}));

function Categories(props) {
  const { categories } = props;
  const classes = useStyles();

  return categories.length ? (
    <Grid container className="justify-center p-20">
      {categories.map((cat, index) => (
        <Grid
          item
          xs={6}
          sm={2} // Augmenté pour plus d'espace
          key={index}
          component={Link}
          to={`/vente-produits/${cat.slug}`}
          className={classes.categoryCard} // Utilisation de la nouvelle classe
          aria-label={`Voir la catégorie ${cat.name}`} // Amélioration de l'accessibilité
        >
          <Avatar
            className={classes.avatar}
            alt={cat.name}
            src={URL_SITE + "/images/secteur/" + cat.url}
          />
          <Typography
            variant="subtitle1"
            className={classes.categoryText} // Utilisation de la nouvelle classe
          >
            {cat.name}
          </Typography>
        </Grid>
      ))}
      <Grid
        item
        xs={6}
        sm={2} // Augmenté pour plus d'espace
        component={Link}
        to={`/annuaire-entreprises`}
        className={classes.categoryCard} // Utilisation de la nouvelle classe
        aria-label="Voir toutes les catégories" // Amélioration de l'accessibilité
      >
        <Avatar className={classes.avatar}>
          <Icon>arrow_forward_ios</Icon>
        </Avatar>
        <Typography
          variant="subtitle1"
          className={classes.categoryText} // Utilisation de la nouvelle classe
        >
          Tous les catégories
        </Typography>
      </Grid>
    </Grid>
  ) : (
    ""
  );
}

export default Categories;