package expo.modules.samplepedometer

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.os.bundleOf

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

const val kOnStepCounted = "onStepCounted"
const val kRequestCode = 1

class StepEventListener(val cb: (name: String, body: Bundle?) -> Unit): SensorEventListener {
  var steps = 0

  override fun onSensorChanged(event: SensorEvent?) {
      event?.values?.get(0)?.let {
          this.cb(kOnStepCounted, bundleOf("step" to steps++))
      }
  }

  override fun onAccuracyChanged(p0: Sensor?, p1: Int) {}
}

class ExpoSamplePedometerModule: Module() {
  var sensorManager: SensorManager? = null
  var stepListener: StepEventListener? = null

  override fun definition() = ModuleDefinition {
    Name("ExpoSamplePedometer")

    Events(kOnStepCounted)

    Function("requestPermissions") {
      val activity = appContext.activityProvider?.currentActivity
      val applicationContext = activity?.applicationContext
      if(applicationContext != null) {
        val permissionCheck = ContextCompat.checkSelfPermission(
          applicationContext,
          Manifest.permission.ACTIVITY_RECOGNITION
        )
        if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
          ActivityCompat.requestPermissions(
            activity,
            arrayOf(Manifest.permission.ACTIVITY_RECOGNITION),
            kRequestCode
          )
        }
      }
    }

    Function("startSendingData") {
      val activity = appContext.activityProvider?.currentActivity
      val applicationContext = activity?.applicationContext
      if(applicationContext != null) {
        sensorManager = applicationContext.applicationContext.getSystemService(Context.SENSOR_SERVICE) as SensorManager
        stepListener = StepEventListener(::sendEvent)
        val stepSensor = sensorManager?.getDefaultSensor(Sensor.TYPE_STEP_DETECTOR)
        sensorManager?.registerListener(stepListener, stepSensor, SensorManager.SENSOR_DELAY_UI)
      }
    }

    Function("stopSendingData") {
      sensorManager?.unregisterListener(stepListener)
    }
  }
}
