import { Button, StyleSheet, Text, View } from "react-native";

import * as ExpoSamplePedometer from "expo-sample-pedometer";
import React from "react";

export default function App() {
  React.useEffect(() => {
    console.log("HELLO");
    const subscription = ExpoSamplePedometer.addStepChangedListener(
      ({ step }) => {
        console.log(step);
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Start Counting Steps"
        onPress={() => {
          ExpoSamplePedometer.startSendingData();
        }}
      />
      <Text>Welcome to the Step Counter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
