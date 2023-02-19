import ExpoModulesCore
import CoreMotion

public class ExpoSamplePedometerModule: Module {
    
    let kOnStepCounted = "onStepCounted"

    public func definition() -> ModuleDefinition {
        let pedometer = CMPedometer()

        Name("ExpoSamplePedometer")
        
        Events(kOnStepCounted)

        Function("requestPermissions") {
            pedometer.stopEventUpdates()
        }
        
        Function("startSendingData") {
            pedometer.startUpdates(from: Date()) { pedometerData, error in
            guard let pedometerData = pedometerData, error == nil else { return }
                self.sendEvent(self.kOnStepCounted, [
                   "step": pedometerData.numberOfSteps.intValue
                ])
            }
        }
    }
}
