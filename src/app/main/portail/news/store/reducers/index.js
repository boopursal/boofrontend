import {combineReducers} from 'redux';
import actualite from './actualite.reducer';
//import demandes from './demandes.reducer';

const reducer = combineReducers({
    actualite
   // demandes
});

export default reducer;
