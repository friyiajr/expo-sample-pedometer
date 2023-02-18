package expo.modules.samplepedometer

import android.Manifest
import android.app.Activity
import android.app.Application
import android.content.Context
import android.content.pm.PackageManager
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import android.util.Log
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.os.bundleOf
import expo.modules.core.interfaces.ReactActivityLifecycleListener

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

val ON_STEP_COUNTED = "onStepCounted"
//      this@ExpoSamplePedometerModule.sendEvent(ON_STEP_COUNTED, bundleOf("step" to it.toInt()))

class StepEventListener: SensorEventListener {
  private var cb: ((name: String, body: Bundle?) -> Unit)? = null

  fun setCallback(cb: (name: String, body: Bundle?) -> Unit) {
    this.cb = cb
  }

  override fun onSensorChanged(event: SensorEvent?) {
      event?.values?.get(0)?.let {
          this.cb?.invoke(ON_STEP_COUNTED, bundleOf("step" to it.toInt()))
      }
  }

  override fun onAccuracyChanged(p0: Sensor?, p1: Int) {
    // OK
  }
}

class ExpoSamplePedometerModule: Module(), ReactActivityLifecycleListener {
  var sensorManager: SensorManager? = null
  var stepListener: StepEventListener? = null

//  override fun onCreate(activity: Activity?, savedInstanceState: Bundle?) {
//    super.onCreate(activity, savedInstanceState)
//
//
//  }

  override fun definition() = ModuleDefinition {
    Name("ExpoSamplePedometer")

    Events(ON_STEP_COUNTED)

    fun sendEvent(name: String, body: Bundle?) {
      this@ExpoSamplePedometerModule.sendEvent(name, body)
    }

    Function("startSendingData") {
      val activity = appContext.activityProvider?.currentActivity
      val applicationContext = activity?.applicationContext

      if(applicationContext != null) {
        if (ContextCompat.checkSelfPermission(applicationContext, Manifest.permission.ACTIVITY_RECOGNITION)
          != PackageManager.PERMISSION_GRANTED) {
          ActivityCompat.requestPermissions(
            activity,
            arrayOf(Manifest.permission.ACTIVITY_RECOGNITION),
            10
          )
        } else {
          Log.i("STARTUP", "applicationContext is null")
        }

        sensorManager = applicationContext.applicationContext.getSystemService(Context.SENSOR_SERVICE) as SensorManager
        stepListener = StepEventListener()
        val stepSensor = sensorManager?.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)
        sensorManager?.registerListener(stepListener, stepSensor, SensorManager.SENSOR_DELAY_UI)
        stepListener?.setCallback(::sendEvent)
      }

      "Starting To Step Count!"
    }

//    OnCreate {
//      val activity = appContext.activityProvider?.currentActivity
//      val applicationContext = activity?.applicationContext
//
//      if(applicationContext != null) {
//        if (ContextCompat.checkSelfPermission(applicationContext, Manifest.permission.ACTIVITY_RECOGNITION)
//          != PackageManager.PERMISSION_GRANTED) {
//          ActivityCompat.requestPermissions(
//            activity,
//            arrayOf(Manifest.permission.ACTIVITY_RECOGNITION),
//            10
//          )
//        } else {
//          Log.i("STARTUP", "applicationContext is null")
//        }
//
//        sensorManager = applicationContext.applicationContext.getSystemService(Context.SENSOR_SERVICE) as SensorManager
//        stepListener = StepEventListener()
//        val stepSensor = sensorManager?.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)
//        sensorManager?.registerListener(stepListener, stepSensor, SensorManager.SENSOR_DELAY_UI)
//        stepListener?.setCallback(::sendEvent)
//      }
//    }
  }
}
