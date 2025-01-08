import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tailwind from "twrnc";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const profile = () => {
  const {
    data: { profile },
  } = useSelector((state: RootState) => state.properties);

  return (
    <View style={tailwind`flex-1 bg-[#f1f1f1]`}>
      <View style={tailwind`py-5 bg-[#fff]`}>
        <Text style={tailwind`text-lg text-black text-center`}>Profile</Text>
      </View>
      <View style={tailwind`flex-1 px-4`}>
        <Text style={tailwind`text-[#000] text-xl`}>Name: {profile?.name}</Text>
        <Text style={tailwind`text-[#000] text-xl`}>
          Email: {profile?.email}
        </Text>
      </View>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
