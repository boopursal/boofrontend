import {combineReducers} from 'redux';
import produits from './produits.reducer';
import produit from './produit.reducer';

const reducer = combineReducers({
    produits,
    produit
});

export default reducer;
