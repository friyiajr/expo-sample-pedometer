import { EventEmitter, Subscription } from "expo-modules-core";

import ExpoSamplePedometerModule from "./ExpoSamplePedometerModule";

const emitter = new EventEmitter(ExpoSamplePedometerModule);

export type StepChangeEvent = {
  step: number;
};

export function requestPermissions() {
  return ExpoSamplePedometerModule.requestPermissions();
}

export function startSendingData() {
  return ExpoSamplePedometerModule.startSendingData();
}

export function stopSendingData() {
  return ExpoSamplePedometerModule.stopSendingData();
}

export function addStepChangedListener(
  listener: (event: StepChangeEvent) => void
): Subscription {
  return emitter.addListener<StepChangeEvent>("onStepCounted", listener);
}
