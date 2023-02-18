import * as ExpoSamplePedometer from "expo-sample-pedometer";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [steps, setSteps] = useState(0);

  React.useEffect(() => {
    const subscription = ExpoSamplePedometer.addStepChangedListener(
      ({ step }) => {
        setSteps(step);
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Request Permissions"
        onPress={() => {
          ExpoSamplePedometer.requestPermissions();
        }}
      />
      <View
        style={{
          height: 50,
        }}
      />
      <Button
        title="Start Counting Steps"
        onPress={() => {
          ExpoSamplePedometer.startSendingData();
        }}
      />
      <Text style={{ fontSize: 30 }}>{steps}</Text>
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
