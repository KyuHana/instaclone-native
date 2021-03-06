import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { logUserOut } from "../apollo";

export default function Search({navigation}) {
  return (
    <View 
      style={{
        backgroundColor: "black",
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center"
      }}
    >
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text style={{ color: "white" }}>Photo</Text>
      </TouchableOpacity>

    </View>
  );
}