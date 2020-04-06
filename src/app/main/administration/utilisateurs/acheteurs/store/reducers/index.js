import {combineReducers} from 'redux';
import acheteurs from './acheteurs.reducer';
import acheteur from './acheteur.reducer';

const reducer = combineReducers({
    acheteurs,
    acheteur
});

export default reducer;
