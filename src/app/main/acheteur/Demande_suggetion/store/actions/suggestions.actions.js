import agent from "agent"; // Assurez-vous que ce module est correctement configuré
import FuseUtils from '@fuse/FuseUtils';
import { showMessage } from 'app/store/actions/fuse';
import _ from 'lodash';

export const GET_SUGGESTIONS = '[SUGGESTIONS APP] GET SUGGESTIONS'; 
export const SET_SEARCH_TEXT = '[SUGGESTIONS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_SUGGESTIONS = '[SUGGESTIONS APP] TOGGLE IN SELECTED SUGGESTIONS';
export const SELECT_ALL_SUGGESTIONS = '[SUGGESTIONS APP] SELECT ALL SUGGESTIONS';
export const DESELECT_ALL_SUGGESTIONS = '[SUGGESTIONS APP] DESELECT ALL SUGGESTIONS';
export const OPEN_NEW_SUGGESTIONS_DIALOG = '[SUGGESTIONS APP] OPEN NEW SUGGESTIONS DIALOG';
export const CLOSE_NEW_SUGGESTIONS_DIALOG = '[SUGGESTIONS APP] CLOSE NEW SUGGESTIONS DIALOG';
export const OPEN_EDIT_SUGGESTIONS_DIALOG = '[SUGGESTIONS APP] OPEN EDIT SUGGESTIONS DIALOG';
export const CLOSE_EDIT_SUGGESTIONS_DIALOG = '[SUGGESTIONS APP] CLOSE EDIT SUGGESTIONS DIALOG';
export const ADD_SUGGESTION = '[SUGGESTIONS APP] ADD SUGGESTION';
export const SAVE_ERROR = '[SUGGESTIONS APP] SAVE ERROR';
export const UPDATE_SUGGESTION = '[SUGGESTIONS APP] UPDATE SUGGESTION';
export const REMOVE_SUGGESTION = '[SUGGESTIONS APP] REMOVE SUGGESTION';
export const UPLOAD_IMAGE = '[SUGGESTIONS APP] UPLOAD IMAGE';
export const UPLOAD_REQUEST = '[SUGGESTIONS APP] UPLOAD REQUEST';
export const UPLOAD_ERROR = '[SUGGESTIONS APP] UPLOAD ERROR';
export const REQUEST_SAVE = '[SUGGESTIONS APP] REQUEST_SAVE';
export const SAVE_DATA = '[SUGGESTIONS APP] SAVE_DATA';

// Action to fetch suggestions
export function getSuggestions(id) {
    return (dispatch) => {
        return agent.get(`/api/acheteurs/${id}/suggestions`)
            .then(response => {
                dispatch({
                    type: GET_SUGGESTIONS,
                    payload: response.data['hydra:member'] || [] // Utilisez un tableau vide par défaut si la clé n'existe pas
                });
            });
    };
}

// Action to set search text
export function setSearchText(text) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: text
    };
}

// Action to toggle a suggestion in the selected list
export function toggleInSelectedSuggestions(suggestionId) {
    return {
        type: TOGGLE_IN_SELECTED_SUGGESTIONS,
        suggestionId
    };
}

// Actions to open and close the new suggestion dialog
export function openNewSuggestionsDialog() {
    return { type: OPEN_NEW_SUGGESTIONS_DIALOG };
}

export function closeNewSuggestionsDialog() {
    return { type: CLOSE_NEW_SUGGESTIONS_DIALOG };
}

// Actions to open and close the edit suggestion dialog
export function openEditSuggestionsDialog(data) {
    return {
        type: OPEN_EDIT_SUGGESTIONS_DIALOG,
        data
    };
}

export function closeEditSuggestionsDialog() {
    return { type: CLOSE_EDIT_SUGGESTIONS_DIALOG };
}

// Action to add a suggestion
export function addSuggestion(newSuggestion, userId) {


    const data = {
        ...newSuggestion
       
    };
    return (dispatch) => {
      const request = agent.post('/api/suggestions',data);
      
      return request.then((response) => {
        dispatch({
          type: ADD_SUGGESTION,
          payload: response.data
        });
  
        dispatch(showMessage({
          message: 'Suggestion bien ajoutée!',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          },
          variant: 'success'
        }));
  
        dispatch(closeNewSuggestionsDialog());
        dispatch(getSuggestions(userId)); // Recharger les suggestions après l'ajout
  
        return response;
      }).catch((error) => {
        dispatch({
          type: SAVE_ERROR
        });
  
        dispatch(showMessage({
          message: _.map(FuseUtils.parseApiErrors(error), (value, key) => `${key}: ${value}`).join(', '),
          autoHideDuration: 6000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          },
          variant: 'error'
        }));
  
        throw error;
      });
    };
  }
  

// Action to update a suggestion
export function updateSuggestion(suggestion, id) {
    const data = {
        ...suggestion,
        avatar: suggestion.avatar ? suggestion.avatar['@id'] : null
    };

    return (dispatch) => {
        return agent.put(`/api/suggestions/${suggestion.id}`, data)
            .then(response => {
                dispatch({
                    type: UPDATE_SUGGESTION,
                    payload: response.data
                });

                dispatch(showMessage({
                    message: 'Suggestion modifiée avec succès!',
                    variant: 'success'
                }));

                dispatch(getSuggestions(id)); // Recharger les suggestions après la mise à jour
            })
            .catch(error => {
                dispatch({
                    type: SAVE_ERROR
                });

                dispatch(showMessage({
                    message: _.map(FuseUtils.parseApiErrors(error), (value, key) => `${key}: ${value}`).join(', '),
                    variant: 'error'
                }));
            });
    };
}

// Action to remove a suggestion
export function removeSuggestion(suggestion, id) {
    const updateSuggestion = { del: true };

    return (dispatch) => {
        return agent.put(suggestion['@id'], updateSuggestion)
            .then(() => {
                dispatch({
                    type: REMOVE_SUGGESTION
                });

                dispatch(showMessage({
                    message: 'Suggestion supprimée avec succès!',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'success'
                }));

                dispatch(getSuggestions(id)); // Recharger les suggestions après la suppression
            })
            .catch(error => {
                dispatch({
                    type: SAVE_ERROR
                });

                dispatch(showMessage({
                    message: `Erreur lors de la suppression: ${error.message}`,
                    autoHideDuration: 6000,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'error'
                }));
            });
    };
}

// Action to upload an image
export function uploadImage(file) {
    return (dispatch) => {
        const formData = new FormData();
        formData.append("file", file);

        return agent.post('/api/avatars', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
            dispatch({
                type: UPLOAD_IMAGE,
                payload: response.data
            });

            dispatch(showMessage({
                message: 'Image téléchargée avec succès!',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'success'
            }));
        })
        .catch(error => {
            dispatch({ type: UPLOAD_ERROR });

            dispatch(showMessage({
                message: _.map(FuseUtils.parseApiErrors(error), (value, key) => `${key}: ${value}`).join(', '),
                autoHideDuration: 6000,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'error'
            }));
        });
    };
}
