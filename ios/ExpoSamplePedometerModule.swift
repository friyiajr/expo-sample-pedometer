import ExpoModulesCore

public class ExpoSamplePedometerModule: Module {

  public func definition() -> ModuleDefinition {

    Name("ExpoSamplePedometer")

    Function("hello") {
      return "Hello world! 👋"
    }
  }
}
