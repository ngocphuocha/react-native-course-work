import {
  GET_TRIPS,
  ADD_TRIP,
  UPDATE_TRIP,
  DELETE_TRIP,
  DELETE_ALL_TRIP,
} from "../types.js";

export default (state, action) => {
  switch (action.type) {
    case GET_TRIPS:
      return {
        ...state,
        tripsData: action.payload,
      };
    case ADD_TRIP:
      return {
        ...state,
        tripsData: action.payload,
      };
    case UPDATE_TRIP:
      return {
        ...state,
        tripsData: action.payload,
      };
    case DELETE_TRIP:
      return {
        ...state,
        tripsData: action.payload,
      };
    case DELETE_ALL_TRIP:
      return {
        ...state,
        tripsData: [],
      };
    default:
      return state;
  }
};
