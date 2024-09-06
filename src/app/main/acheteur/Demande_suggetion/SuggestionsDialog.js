import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Toolbar,
  AppBar,
} from "@material-ui/core";
import { useForm } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import * as Actions from "./store/actions";

const defaultFormState = {
  name: "",
  description: "",
  etat: "En cours", // Valeur par défaut pour 'etat'
};

function SuggestionsDialog(props) {
  const dispatch = useDispatch();
  const suggestionsDialog = useSelector(
    ({ SuggestionsApp }) => SuggestionsApp.suggestions.suggestionsDialog
  );
  const user = useSelector(({ auth }) => auth.user);

  const { form, handleChange, setForm } = useForm(defaultFormState);
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  const initDialog = useCallback(() => {
    if (suggestionsDialog.type === "edit" && suggestionsDialog.data) {
      setForm({ ...suggestionsDialog.data });
    }

    if (suggestionsDialog.type === "new") {
      setForm({
        ...defaultFormState, // Utilisation des valeurs par défaut lors de la création d'une nouvelle suggestion
      });
    }
  }, [suggestionsDialog.data, suggestionsDialog.type, setForm]);

  useEffect(() => {
    if (suggestionsDialog.props.open) {
      initDialog();
    }
  }, [suggestionsDialog.props.open, initDialog]);

  function closeComposeDialog() {
    if (suggestionsDialog.type === "edit") {
      dispatch(Actions.closeEditSuggestionsDialog());
    } else {
      dispatch(Actions.closeNewSuggestionsDialog());
    }
  }

  function handleSubmit(event) {
    if (!user || !user.id) {
      // Si l'utilisateur n'est pas authentifié ou l'ID est manquant, ne pas soumettre
      console.error("Utilisateur non authentifié ou ID utilisateur manquant");
      return;
    }

    if (
      form.name === "" ||           // Vérifiez si le champ 'name' est vide
      form.description === "" ||    // Vérifiez si le champ 'description' est vide
      form.etat === ""              // Vérifiez si le champ 'etat' est vide
    ) {
      // Affichez des messages d'erreur ou empêchez la soumission si des champs sont vides
      return;
    }

    const suggestionData = {
      ...form,
      user: user.id // Ajout de l'ID utilisateur
    };

    if (suggestionsDialog.type === "new") {
      dispatch(Actions.addSuggestion(suggestionData)); // Passez les données avec l'ID utilisateur
    } else {
      dispatch(Actions.updateSuggestion(suggestionData)); // Passez les données avec l'ID utilisateur
    }

    closeComposeDialog();
  }

  return (
    <Dialog
      {...suggestionsDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {suggestionsDialog.type === "new"
              ? "Nouvelle Suggestion"
              : form.name || "Éditer la Suggestion"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Formsy
        onValidSubmit={handleSubmit}
        onValid={() => setIsFormValid(true)}
        onInvalid={() => setIsFormValid(false)}
        ref={formRef}
        className="flex flex-col overflow-hidden"
      >
        <DialogContent classes={{ root: "p-24" }}>
          <TextFieldFormsy
            className="mb-24"
            label="Suggestion"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            validationErrors={{
              isDefaultRequiredValue: "Ce champ est requis",
            }}
          />
          <TextFieldFormsy
            className="mb-24"
            label="Description"
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            validationErrors={{
              isDefaultRequiredValue: "Ce champ est requis",
            }}
          />
          
        </DialogContent>
        <DialogActions className="justify-between p-8">
          <div className="px-16">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isFormValid}
            >
              {suggestionsDialog.type === "new" ? "Envoyer" : "Sauvegarder"}
            </Button>
          </div>
        </DialogActions>
      </Formsy>
    </Dialog>
  );
}

export default SuggestionsDialog;
