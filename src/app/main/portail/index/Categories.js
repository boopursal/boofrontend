// front-end/src/app/main/portail/index/Categories.js
import React from "react";
import { Avatar, Grid, Typography, Icon } from "@material-ui/core";
import { URL_SITE } from "@fuse";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 80, // Taille augmentée pour une meilleure visibilité
    height: 80,
    padding: 10,
    boxSizing: "content-box",
    borderRadius: "50%",
    boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3)`, // Ombre pour un effet de profondeur
    transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease", // Transition pour l'effet de survol
    "&:hover": {
      transform: "scale(1.1)", // Agrandissement au survol
      boxShadow: `0 8px 20px rgba(0, 0, 0, 0.4)`, // Ombre plus prononcée au survol
      backgroundColor: theme.palette.primary.light, // Changement de couleur au survol
    },
  },
  tousCat: {
    width: 80,
    height: 80,
    padding: 10,
    boxSizing: "content-box",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "50%",
    boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3)`, // Ombre pour un effet de profondeur
    transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease", // Transition pour l'effet de survol
    "&:hover": {
      transform: "scale(1.1)", // Agrandissement au survol
      boxShadow: `0 8px 20px rgba(0, 0, 0, 0.4)`, // Ombre plus prononcée au survol
      backgroundColor: theme.palette.secondary.dark, // Changement de couleur au survol
    },
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(2), // Espacement entre les catégories
    textAlign: "center", // Centrer le texte
    transition: "transform 0.3s ease", // Transition pour l'effet de survol
    "&:hover": {
      transform: "translateY(-5px)", // Légère élévation au survol
    },
  },
  categoryText: {
    fontSize: "16px", // Taille de texte augmentée pour une meilleure lisibilité
    fontWeight: "bold",
    color: theme.palette.text.primary, // Couleur de texte dynamique
    marginTop: theme.spacing(1), // Espacement au-dessus du texte
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
          className={classes.categoryContainer} // Utilisation de la nouvelle classe
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
        className={classes.categoryContainer} // Utilisation de la nouvelle classe
        aria-label="Voir toutes les catégories" // Amélioration de l'accessibilité
      >
        <Avatar className={classes.tousCat}>
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