import {combineReducers} from 'redux';
import secteurs from './secteurs.reducer';
import secteur from './secteur.reducer';

const reducer = combineReducers({
    secteurs,
    secteur,
});

export default reducer;
