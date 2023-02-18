import * as React from 'react';

import { ExpoSamplePedometerViewProps } from './ExpoSamplePedometer.types';

export default function ExpoSamplePedometerView(props: ExpoSamplePedometerViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
