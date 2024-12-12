import { SET_FOURNISSEURS } from '../actions/import.actions';

const initialState = {
  fournisseurs: [],
};

const importReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOURNISSEURS:
      return {
        ...state,
        fournisseurs: action.payload,
      };
    default:
      return state;
  }
};

export default importReducer;
