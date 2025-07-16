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
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    minHeight: 72,
    padding: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // ratio 16:9
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: 16,
    lineHeight: 1.2,
    fontWeight: "bold",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  contentWrapper: {
    flexGrow: 1,
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
    marginTop: "auto",
  },
  btn: {
    padding: "8px 16px",
    textTransform: "none",
    borderRadius: 4,
    fontWeight: "bold",
    boxShadow: "none",
  },
  icon: {
    marginLeft: 8,
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const { secteur } = props;

  return (
    <Card className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.title} variant="h6">
          {secteur.name}
        </Typography>
      </div>

      <div className={classes.contentWrapper}>
        <CardMedia
          className={classes.media}
          image={
            secteur.url
              ? URL_SITE + "/images/secteur/" + secteur.url
              : "https://source.unsplash.com/collection/9456871/1600x900"
          }
          title={secteur.name}
        />
      </div>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="secondary"
          component={Link}
          to={`/annuaire-entreprises/${secteur.id}-${secteur.slug}`}
          className={classes.btn}
          variant="outlined"
        >
          VOIR TOUT LE SECTEUR
          <Icon className={classes.icon}>keyboard_arrow_right</Icon>
        </Button>
      </CardActions>
    </Card>
  );
}
