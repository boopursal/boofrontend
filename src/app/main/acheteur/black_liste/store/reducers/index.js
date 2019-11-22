import {combineReducers} from 'redux';
import blackListes from './blackListes.reducer';
import dialog from './dialog.reducer';
const reducer = combineReducers({
    blackListes,
    dialog
});

export default reducer;
