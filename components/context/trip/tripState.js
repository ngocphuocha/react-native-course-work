import { useReducer } from "react";
import {
  GET_TRIPS,
  ADD_TRIP,
  UPDATE_TRIP,
  DELETE_TRIP,
  DELETE_ALL_TRIP,
} from "../types.js";
import TripContext from "./tripContext.js";
import TripReducer from "./tripReducer.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TripState = (props) => {
  const initialState = {
    tripsData: [],
    trip: {},
  };

  const [state, dispatch] = useReducer(TripReducer, initialState);

  const getTrips = async () => {
    const tripsArray = await AsyncStorage.getItem("trips");
    console.log("Trip Array: ");
    dispatch({ type: GET_TRIPS, payload: JSON.parse(tripsArray) });
  };

  const addTrip = async (newTrip) => {
    try {
      const trips = JSON.parse(await AsyncStorage.getItem("trips"));

      if (trips == null) {
        await AsyncStorage.setItem("trips", JSON.stringify([]));
      }

      const newTrips = [...trips, newTrip];
      // await AsyncStorage.removeItem("trips");
      await AsyncStorage.setItem("trips", JSON.stringify(newTrips));
      dispatch({ type: ADD_TRIP, payload: newTrips });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTripItem = async (updateTripItem) => {
    try {
      const foundItem = state.tripsData.find((e) => e.id == updateTripItem.id);
      console.log(foundItem);
      // return;
      Object.assign(foundItem, updateTripItem);

      // set new tripsData to async storage
      await AsyncStorage.setItem("trips", JSON.stringify(state.tripsData));
      dispatch({ type: UPDATE_TRIP, payload: state.tripsData });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTripItem = async (tripItem) => {
    try {
      // return the trip data array where not include the trip item
      const result = state.tripsData.filter((e) => e.id != tripItem.id);
      // set new tripsData to async storage
      await AsyncStorage.setItem("trips", JSON.stringify(result));
      // Update the trips data state context
      dispatch({ type: DELETE_TRIP, payload: result });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTrip = async () => {
    try {
      await AsyncStorage.setItem("trips", JSON.stringify([]));
      // Dispatch delete all item in trips data
      dispatch({
        type: DELETE_ALL_TRIP,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TripContext.Provider
      value={{
        tripsData: state.tripsData,
        trip: state.trip,
        getTrips,
        addTrip,
        updateTripItem,
        deleteTripItem,
        deleteTrip,
      }}
    >
      {props.children}
    </TripContext.Provider>
  );
};
export default TripState;