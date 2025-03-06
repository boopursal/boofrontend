import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitImportFournisseurs } from './store/actions'; // Chemin mis à jour
//import * as Actions from './store/actions';
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
  const [csvFile, setCsvFile] = useState(null);
       const dispatch = useDispatch();

       const handleFileChange = (event) => {
           setCsvFile(event.target.files[0]);
       };

       const handleSubmit = (event) => {
           event.preventDefault();
           if (csvFile) {
               dispatch(submitImportFournisseurs(csvFile));
           }
       };

       return (
           <form onSubmit={handleSubmit}>
               <input type="file" accept=".csv" onChange={handleFileChange} required />
               <button type="submit">Importer Fournisseurs</button>
           </form>
       );
};

export default Import;
