import {combineReducers} from 'redux';
import fournisseurs from './fournisseurs.reducer';
import fournisseur from './fournisseur.reducer';

const reducer = combineReducers({
    fournisseurs,
    fournisseur
});

export default reducer;
