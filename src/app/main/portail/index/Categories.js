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
    width: "100%",           // prend toute la largeur du Grid item
    maxWidth: 165,           // max largeur fixe pour garder un carré
    aspectRatio: "1 / 1",    // carré (support moderne)
    margin: theme.spacing(2, 1), // vertical 16px, horizontal 8px environ
    textAlign: "center",
    borderRadius: 8,
    boxShadow: `0 4px 12px rgba(0, 0, 0, 0.2)`,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: `0 8px 20px rgba(0, 0, 0, 0.3)`,
    },
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing(1),
  },
  categoryText: {
    fontSize: "16px",
    fontWeight: "600",
    color: theme.palette.text.primary,
    lineHeight: 1.4,
  },
}));

function Categories(props) {
  const { categories } = props;
  const classes = useStyles();

  // Limiter à 7 catégories affichées
  const displayedCategories = categories.slice(0, 6);

  return categories.length ? (
    <Grid container justifyContent="center" className="p-5 sm:p-10">
      {displayedCategories.map((cat, index) => (
        <Grid
          item
          xs={6}    // 2 colonnes sur mobile
          sm={3}    // 4 colonnes sur tablette
          md={2}    // 6 colonnes sur desktop
          key={index}
          component={Link}
          to={`/vente-produits/${cat.slug}`}
          className={classes.categoryCard}
          aria-label={`Voir la catégorie ${cat.name}`}
        >
          <Avatar
            className={classes.avatar}
            alt={cat.name}
            src={URL_SITE + "/images/secteur/" + cat.url}
          />
          <Typography variant="subtitle1" className={classes.categoryText}>
            {cat.name}
          </Typography>
        </Grid>
      ))}

      {/* Case "Tous les catégories" */}
      <Grid
        item
        xs={6}
        sm={3}
        md={2}
        component={Link}
        to={`/annuaire-entreprises`}
        className={classes.categoryCard}
        aria-label="Voir toutes les catégories"
      >
        <Avatar className={classes.avatar}>
          <Icon>arrow_forward_ios</Icon>
        </Avatar>
        <Typography variant="subtitle1" className={classes.categoryText}>
        Tous les secteurs d’activité
        </Typography>
      </Grid>
    </Grid>
  ) : (
    ""
  );
}

export default Categories;
