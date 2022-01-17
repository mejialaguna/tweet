import { useReducer } from "react";

import { UPDATE_ACTIVE_ITEM } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_ACTIVE_ITEM:
      return {
        ...state,
        currentActiveItem: action.currentActiveItem, //just updating one, dont need an array
      };

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
