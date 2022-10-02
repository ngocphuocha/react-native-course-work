import React, { useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";

const SearchTripForm = ({ searchTrips }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (value) => {
    setSearchQuery(value);
    searchTrips(value.trim().toLowerCase());
  };

  return (
    <View>
      <Searchbar
        placeholder="Search trips"
        value={searchQuery}
        onChangeText={(value) => onChangeSearch(value)}
        style={{ marginVertical: 10 }}
      />
    </View>
  );
};

export default SearchTripForm;
