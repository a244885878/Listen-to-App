import { useEffect } from "react";
import { View, Text } from "react-native";
import { useTabActive } from "@/components/TabBar";

const My = () => {
  const isActive = useTabActive();

  useEffect(() => {
    console.log("My mounted");
  }, []);

  useEffect(() => {
    console.log(isActive ? "My激活" : "My失活");
  }, [isActive]);

  return (
    <View>
      <Text>My</Text>
    </View>
  );
};

export default My;
