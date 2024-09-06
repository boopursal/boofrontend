import {combineReducers} from 'redux';
import suggestions from './suggestions.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    suggestions,
    dialog
});

export default reducer;
