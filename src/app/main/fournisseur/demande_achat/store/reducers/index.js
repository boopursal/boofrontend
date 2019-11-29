import {combineReducers} from 'redux';
import demandes from './demandes.reducer';
import demande from './demande.reducer';

const reducer = combineReducers({
    demandes,
    demande
});

export default reducer;
