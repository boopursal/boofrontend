import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { Icon, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { URL_SITE } from "@fuse/Constants";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    display: 'flex',
    flexDirection: 'column', // S'assurer que les éléments sont bien disposés en colonne
  },
  media: {
    height: 0,
    paddingTop: "36.25%", // 16:9
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: 16,
  },
  btn: {
    padding: '10px 20px', // Ajouter un peu de padding pour rendre le bouton plus large
    textTransform: 'none', // Ne pas forcer la majuscule du texte
    borderRadius: '4px',   // Adoucir les bords du bouton
    boxShadow: 'none',     // Désactiver l'ombre
    fontWeight: 'bold',    // Mettre le texte en gras pour plus de visibilité
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',  // Centrer horizontalement
    alignItems: 'center',      // Centrer verticalement si nécessaire
    width: '100%',
    padding: theme.spacing(1),  // Ajouter un peu de padding pour l'espacement
  },
  icon: {
    marginLeft: '8px', // Espace entre le texte et l'icône
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const { secteur } = props;

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography className={clsx(classes.title)} variant="h6">
            {secteur.name}
          </Typography>
        }
      />
      <CardMedia
        className={classes.media}
        image={
          secteur.url
            ? URL_SITE + "/images/secteur/" + secteur.url
            : "https://source.unsplash.com/collection/9456871/1600x900"
        }
        title={secteur.name}
      />
      <CardActions className={classes.cardActions} disableSpacing>
        <Button
          size="small"
          color="secondary"
          component={Link}
          to={`/annuaire-entreprises/${secteur.id}-${secteur.slug}`}
          className={clsx(classes.btn)}
          variant="outlined"
        >
          VOIR TOUT LE SECTEUR
          <Icon className={clsx(classes.icon)}>keyboard_arrow_right</Icon>
        </Button>
      </CardActions>
    </Card>
  );
}
