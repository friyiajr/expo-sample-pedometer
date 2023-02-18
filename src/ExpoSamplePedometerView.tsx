import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoSamplePedometerViewProps } from './ExpoSamplePedometer.types';

const NativeView: React.ComponentType<ExpoSamplePedometerViewProps> =
  requireNativeViewManager('ExpoSamplePedometer');

export default function ExpoSamplePedometerView(props: ExpoSamplePedometerViewProps) {
  return <NativeView {...props} />;
}
