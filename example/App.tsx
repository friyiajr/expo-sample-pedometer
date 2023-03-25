import {
  requestPermissions,
  addStepChangedListener,
  startSendingData,
  stopSendingData,
} from "expo-sample-pedometer";
import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
  const [isPermissionAllowed, setIsPermissionAllowed] = useState(false);
  const [numOfSteps, setNumOfSteps] = useState(0);

  useEffect(() => {
    const sub = addStepChangedListener(({ step }) => {
      setNumOfSteps(step);
    });

    return () => sub.remove();
  }, []);

  const requestPermissionsRN = () => {
    requestPermissions();
    setIsPermissionAllowed(true);
  };

  const startTracking = () => {
    startSendingData();
  };

  const stopTracking = () => {
    stopSendingData();
    setNumOfSteps(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        {isPermissionAllowed ? (
          <>
            <Text style={styles.stepsTitle}>Steps Taken</Text>
            <Text style={styles.stepsFont}>{numOfSteps}</Text>
          </>
        ) : (
          <Text style={styles.requestFont}>
            Please Enable Step Counting Permissions
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={isPermissionAllowed ? startTracking : requestPermissionsRN}
      >
        <Text style={styles.ctaButtonText}>
          {isPermissionAllowed ? "Start Tracking" : "Request Permissions"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ctaButton} onPress={stopTracking}>
        <Text style={styles.ctaButtonText}>Stop Tracking</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
  },
  requestFont: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  stepsFont: {
    fontSize: 224,
    fontWeight: "300",
  },
  stepsTitle: {
    fontSize: 50,
    fontWeight: "bold",
  },
  ctaButton: {
    height: 60,
    borderRadius: 8,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    marginBottom: 10,
  },
  ctaButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
