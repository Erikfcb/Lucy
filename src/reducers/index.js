import { SET_DIAMONDS, SET_CATEGORY } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_DIAMONDS: {
      return { ...state, diamonds: action.payload };
    }
    case SET_CATEGORY: {
      return { ...state, category: action.payload };
    }
    default:
      return state;
  }
};
