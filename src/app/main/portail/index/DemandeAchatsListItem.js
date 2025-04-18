import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Icon,
  Typography,
  ListItem,
  Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import _ from '@lodash';
import moment from 'moment';
import 'moment/locale/fr';

const useStyles = makeStyles({
  todoItem: {
    '&.completed': {
      background: 'rgba(0,0,0,0.03)',
      '& .todo-title, & .todo-notes': {
        textDecoration: 'line-through',
      },
    },
  },
});

function DemandeAchatsListItem({ demande }) {
  const [countryCode, setCountryCode] = useState(null);
  const [error, setError] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if (demande.pays) {
      const countryMapping = {
        "États-Unis": "United States",
        "Allemagne": "Germany",
        "France": "France",
        "Maroc": "Morocco",
        "Espagne": "Spain",
        "Italie": "Italy",
        "Royaume-Uni": "United Kingdom",
      };
      const countryName = countryMapping[demande.pays] || demande.pays;
      fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data[0] && data[0].cca2) {
            setCountryCode(data[0].cca2.toLowerCase());
          } else {
            setError("Drapeau non disponible");
          }
        })
        .catch((error) => {
          console.error("Erreur API Restcountries :", error);
          setError("Erreur de récupération du drapeau");
        });
    }
  }, [demande.pays]);

  return (
    <ListItem
      className={clsx(classes.todoItem, "border-b py-16 px-0 sm:px-8 hover:bg-gray-50 transition")}
      dense
      component="a"
      href={`/demandes-achat/${demande.id}-${demande.slug}`}
      button
    >
      <div className="flex flex-1 flex-col relative overflow-hidden pl-8">
        <Typography variant="subtitle1" className="flex items-center font-semibold text-gray-800">
          {countryCode && (
            <img
              src={`https://flagcdn.com/w40/${countryCode}.png`}
              alt={demande.pays}
              className="w-5 h-5 mr-2 rounded-full"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/40";
                e.target.alt = "Drapeau non disponible";
              }}
            />
          )}
          <span className="text-blue-700 mr-2">RFQ-{demande.reference}</span> — {demande.titre}
        </Typography>

        <Typography color="textSecondary" className="mt-4 text-sm text-gray-600">
          {_.truncate(demande.description.replace(/<(?:.|\n)*?>/gm, ''), { length: 180 })}
        </Typography>

        <div className="flex flex-wrap items-center mt-8 gap-2">
          {error && <p className="text-red-500 text-xs">{error}</p>}

          <Chip
            icon={
              countryCode ? (
                <img
                  src={`https://flagcdn.com/w40/${countryCode}.png`}
                  alt={demande.pays}
                  className="w-5 h-5 mr-1 rounded-full"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/40";
                    e.target.alt = "Drapeau non disponible";
                  }}
                />
              ) : null
            }
            label={`${demande.ville}, ${demande.pays}`}
            className="mr-2"
            color="secondary"
          />

          <Chip
            icon={<Icon className="text-16">access_time</Icon>}
            label={moment(demande.created).fromNow()}
            classes={{ root: "h-24", label: "pl-2 pr-6 py-4 text-11" }}
            className="mr-2"
            color="default"
          />

          <Chip
            icon={<Icon className="text-16">hourglass_empty</Icon>}
            label={`Valable jusqu'au ${moment(demande.dateExpiration).format("DD-MM-YYYY à HH:mm")}`}
            classes={{ root: "h-24", label: "pl-2 pr-6 py-4 text-11" }}
            color="default"
          />
        </div>
      </div>

      <div className="px-8">
        <IconButton>
          <Icon>chevron_right</Icon>
        </IconButton>
      </div>
    </ListItem>
  );
}

export default DemandeAchatsListItem;
