import {combineReducers} from 'redux';
import contactFournisseur from './contactFournisseur.reducer';
import contactsFournisseur from './contactsFournisseur.reducer';

const reducer = combineReducers({
    contactsFournisseur,
    contactFournisseur
});

export default reducer;
