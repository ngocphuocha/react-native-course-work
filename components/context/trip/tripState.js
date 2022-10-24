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
    dispatch({ type: GET_TRIPS, payload: JSON.parse(tripsArray) });
  };

  const searchTripItem = async (query) => {
    await getTrips();

    // set time out 0.5 second for get all trips
    // Reference https://stackoverflow.com/questions/5324798/how-to-search-an-array-in-jquery-like-sql-like-value-statement
    setTimeout(() => {
      if (query.length === 0) {
        getTrips();
      } else {
        const result = state.tripsData.filter(
          (item) => item.name.toLowerCase().indexOf(query) > -1
        );
        dispatch({ type: UPDATE_TRIP, payload: result });
      }
    }, 500);
  };

  const addTrip = async (newTrip) => {
    try {
      const trips = JSON.parse(await AsyncStorage.getItem("trips"));

      if (trips == null) {
        await AsyncStorage.setItem("trips", JSON.stringify([]));
      }

      const newTrips = [...trips, newTrip];

      await AsyncStorage.setItem("trips", JSON.stringify(newTrips));
      dispatch({ type: ADD_TRIP, payload: newTrips });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTripItem = async (updateTripItem) => {
    try {
      const foundItem = state.tripsData.find((e) => e.id === updateTripItem.id);
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
      const result = state.tripsData.filter((e) => e.id !== tripItem.id);
      // set new tripsData to async storage
      await AsyncStorage.setItem("trips", JSON.stringify(result));
      // Update the trips data state context
      dispatch({ type: DELETE_TRIP, payload: result });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllTrip = async () => {
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
        searchTripItem,
        addTrip,
        updateTripItem,
        deleteTripItem,
        deleteAllTrip,
      }}
    >
      {props.children}
    </TripContext.Provider>
  );
};
export default TripState;
