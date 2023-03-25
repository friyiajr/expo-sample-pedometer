import ExpoModulesCore
import CoreMotion

public class ExpoSamplePedometerModule: Module {
    
    let kOnStepCounted = "onStepCounted"

    public func definition() -> ModuleDefinition {
        var pedometer: CMPedometer? = nil

        Name("ExpoSamplePedometer")
        
        Events(kOnStepCounted)

        Function("requestPermissions") {
            pedometer = CMPedometer()
            pedometer?.stopEventUpdates()
        }
        
        Function("startSendingData") {
            pedometer = CMPedometer()
            pedometer?.startUpdates(from: Date()) { pedometerData, error in
            guard let pedometerData = pedometerData, error == nil else { return }
                self.sendEvent(self.kOnStepCounted, [
                   "step": pedometerData.numberOfSteps.intValue
                ])
            }
        }
      
       Function("stopSendingData") {
           pedometer?.stopEventUpdates()
           pedometer = nil
       }
    }
}
