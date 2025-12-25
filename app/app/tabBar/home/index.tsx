import { useEffect } from "react";
import { View, Text } from "react-native";
import { useTabActive } from "@/components/TabBar";

const Home = () => {
  const isActive = useTabActive();

  useEffect(() => {
    console.log("Home mounted");
  }, []);

  useEffect(() => {
    console.log(isActive ? "home激活" : "home失活");
  }, [isActive]);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
