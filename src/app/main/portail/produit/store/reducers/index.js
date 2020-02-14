import {combineReducers} from 'redux';
import detailProduit from './detailProduit.reducer';

const reducer = combineReducers({
    detailProduit,
});

export default reducer;
