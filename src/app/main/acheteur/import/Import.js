import React, { useState } from 'react';
import agent from 'agent';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Snackbar,
  Paper,
  Button,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import UploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
    width: '100%',
    overflowX: 'auto',
  },
  tableCell: {
    padding: theme.spacing(2),
  },
  validateButton: {
    marginTop: theme.spacing(2),
    display: 'block',
    width: '100%',
  },
}));

const Import = () => {
  const classes = useStyles();
  const [fournisseurs, setFournisseurs] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [yourFile, setYourFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setAlertMessage('Veuillez sélectionner un fichier.');
      setAlertOpen(true);
      return;
    }

    if (!file.name.endsWith('.csv')) {
      setAlertMessage('Format de fichier non valide. Veuillez télécharger un fichier .csv.');
      setAlertOpen(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n').slice(1); // Ignorer l'en-tête
      const newFournisseurs = [];

      rows.forEach(row => {
        const [nom, adresse, telephone] = row.split(';');
        if (nom && adresse && telephone) {
          newFournisseurs.push({ nom, adresse, telephone });
        }
      });

      if (newFournisseurs.length === 0) {
        setAlertMessage('Aucun fournisseur valide trouvé dans le fichier.');
      } else {
        setFournisseurs(newFournisseurs);
      }
      setAlertOpen(true);
    };

    reader.readAsText(file);
    setYourFile(file); // Mettez à jour le fichier après lecture
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleValidate = async () => {
    if (!yourFile) {
      setAlertMessage('Veuillez sélectionner un fichier avant d\'envoyer.');
      setAlertOpen(true);
      return;
    }
    const token = localStorage.getItem('jwt_access_token');
    if (!token) {
      setAlertMessage('Token JWT manquant. Veuillez vous connecter à nouveau.');
      setAlertOpen(true);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', yourFile);

    try {
      const response = await agent.post('/api/send-emails', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        setAlertMessage('Emails envoyés avec succès !');
        setFournisseurs([]);
        setYourFile(null);
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : 'Erreur de connexion.';
      setAlertMessage(`Erreur lors de l'envoi des emails : ${errorMessage}`);
    } finally {
      setLoading(false);
      setAlertOpen(true);
    }
  };

  const handleExport = () => {
    if (fournisseurs.length === 0) {
      setAlertMessage('Aucun fournisseur à exporter.');
      setAlertOpen(true);
      return;
    }

    const csvContent = "data:text/csv;charset=utf-8," 
      + "Nom,Adresse,Téléphone\n" 
      + fournisseurs.map(f => `${f.nom},${f.adresse},${f.telephone}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fournisseurs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Importer des Fournisseurs
      </Typography>
      <div className={classes.uploadContainer}>
        <input
          accept=".csv"
          style={{ display: 'none' }}
          id="file-upload"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<UploadIcon />}
          >
            Sélectionner un fichier
          </Button>
        </label>
      </div>

      <Paper elevation={3}>
        <Typography variant="h6" className={classes.title}>
          Liste des Fournisseurs
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}><strong>Nom</strong></TableCell>
              <TableCell className={classes.tableCell}><strong>Adresse</strong></TableCell>
              <TableCell className={classes.tableCell}><strong>Téléphone</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fournisseurs.map((fournisseur, index) => (
              <TableRow key={index}>
                <TableCell className={classes.tableCell}>{fournisseur.nom}</TableCell>
                <TableCell className={classes.tableCell}>{fournisseur.adresse}</TableCell>
                <TableCell className={classes.tableCell}>{fournisseur.telephone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Button
        variant="contained"
        color="secondary"
        className={classes.validateButton}
        onClick={handleValidate}
        disabled={loading}
      >
        {loading ? 'Envoi en cours...' : 'Valider et Envoyer'}
      </Button>

      <Button
        variant="contained"
        color="default"
        className={classes.validateButton}
        onClick={handleExport}
      >
        Exporter
      </Button>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message={alertMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseAlert}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default Import;
