import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import React from "react";
import tailwind from "twrnc";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TBooking } from "../redux/apiSlice";

const explore = () => {
  const {
    data: { bookings = [] },
  } = useSelector((state: RootState) => state.properties);
  return (
    <View style={tailwind`flex-1 bg-[#f1f1f1]`}>
      <View style={tailwind`py-5 bg-[#fff]`}>
        <Text style={tailwind`text-lg text-black text-center`}>Bookings</Text>
      </View>
        <FlatList
          data={bookings}
          renderItem={_renderBooking}
          keyExtractor={(item) => item.id.toString()}
        />
    </View>
  );
};

export default explore;

const _renderBooking: ListRenderItem<TBooking> = ({ index, item }) => {
  return (
    <View
      style={tailwind`p-4 bg-[#ffffff90] pt-5 dark:bg-black w-90 self-center rounded-md my-2 flex-row justify-between align-center`}
    >
      <View>
        <Text>Check In: {item.checkIn}</Text>
        <Text>Check Out: {item.checkOut}</Text>
      </View>
      <View
        style={tailwind`bg-[${
          item.status === "confirmed" ? "#86d65c" : "#ccc"
        }] justify-center p-1 rounded`}
      >
        <Text style={tailwind`text-[#fff]`}>{item.status.toUpperCase()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
