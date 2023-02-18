import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoSamplePedometer.web.ts
// and on native platforms to ExpoSamplePedometer.ts
import ExpoSamplePedometerModule from './ExpoSamplePedometerModule';
import ExpoSamplePedometerView from './ExpoSamplePedometerView';
import { ChangeEventPayload, ExpoSamplePedometerViewProps } from './ExpoSamplePedometer.types';

// Get the native constant value.
export const PI = ExpoSamplePedometerModule.PI;

export function hello(): string {
  return ExpoSamplePedometerModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoSamplePedometerModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoSamplePedometerModule ?? NativeModulesProxy.ExpoSamplePedometer);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoSamplePedometerView, ExpoSamplePedometerViewProps, ChangeEventPayload };
