import { EventEmitter, Subscription } from "expo-modules-core";

import ExpoSamplePedometerModule from "./ExpoSamplePedometerModule";

const emitter = new EventEmitter(ExpoSamplePedometerModule);

export type StepChangeEvent = {
  step: number;
};

export function startSendingData(): string {
  return ExpoSamplePedometerModule.startSendingData();
}

export function addStepChangedListener(
  listener: (event: StepChangeEvent) => void
): Subscription {
  return emitter.addListener<StepChangeEvent>("onStepCounted", listener);
}
