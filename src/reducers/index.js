import {
  SET_ACTIVE_FILTERS,
  SET_CATEGORY,
  TOGGLE_LARGE_IMAGE
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_FILTERS: {
      const { obj, name } = action.payload;

      const newActiveFilters = {
        ...state.activeFilters,
        ...obj
      };

      if (
        (name !== "Carat" && obj[name].filters.length === 0) ||
        (obj[name].min === null && obj[name].max === null)
      )
        delete newActiveFilters[name];

      return { ...state, activeFilters: newActiveFilters };
    }
    case SET_CATEGORY: {
      return { ...state, category: action.payload };
    }
    case TOGGLE_LARGE_IMAGE: {
      return {
        ...state,
        popupState: {
          visible: !state.popupState.visible,
          link: action.payload
        }
      };
    }
    default:
      return state;
  }
};
