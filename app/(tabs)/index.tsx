import {
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import tailwind from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchProperties, TProperty } from "../redux/apiSlice";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("screen");

const index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: { properties = [] },
    status,
    error,
  } = useSelector((state: RootState) => state.properties);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProperties());
    }
  }, [dispatch, status]);

  return (
    <View style={tailwind`flex-1 bg-[#f1f1f1]`}>
      <View style={tailwind`py-5 bg-[#fff]`}>
        <Text style={tailwind`text-lg text-black text-center`}>
          {" "}
          Available Properties{" "}
        </Text>
      </View>
        <FlatList
          data={properties}
          renderItem={_renderProperty}
          keyExtractor={(item) => item.id.toString()}
        />
    </View>
  );
};

export default index;

const CARD_WIDTH = width * 0.9;

const _renderProperty: ListRenderItem<TProperty> = ({ item, index }) => {
  return (
    <View
      style={tailwind`p-4 bg-white pt-5 dark:bg-black w-90 self-center rounded-md my-4`}
    >
      <Swiper
        dotStyle={styles.dotStyle}
        loop={true}
        style={tailwind`h-70`}
        activeDotStyle={styles.activeDotStyle}
      >
        {item.images.map((uri, i) => (
          <View style={styles.slide1}>
            <Image
              key={`${i}_${index}_${uri}`}
              resizeMode="contain"
              source={{ uri }}
              style={tailwind`w-full h-70 rounded`}
            />
          </View>
        ))}
      </Swiper>
      <Text
        style={tailwind`text-stone-500 uppercase pt-2 text-[#e36208] font-bold`}
      >
        {item.title}
      </Text>
      <View style={tailwind`flex flex-row pt-2`}>
        <Image
          source={require("../../assets/images/location.png")}
          style={tailwind`w-4 h-4`}
        />
        <Text style={tailwind`text-gray-600 pl-2`}>
          {item.location.address} {item.location.city} {item.location.state}
        </Text>
      </View>
      <Text style={tailwind`text-gray-600 pt-2`}>
        {item.features.join(", ")}
      </Text>
      <Text
        style={tailwind`text-right text-xl font-bold text-stone-500 pt-2 text-[#e36208]`}
      >
        ${item.price}
      </Text>
      <TouchableOpacity
        style={tailwind`bg-[#e36208] mt-2 w-full p-2 rounded-md self-center`}
      >
        <Text style={tailwind`text-center text-[#fff]`}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dotStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.48)",
  },
  activeDotStyle: {
    backgroundColor: "#e36208",
  },
  slide1: {
    flex: 1,
  },
});
