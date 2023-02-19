const withPedometerPermission = (config) => {
  // Ensure the objects exist
  if (!config.ios) {
    config.ios = {};
  }
  if (!config.ios.infoPlist) {
    config.ios.infoPlist = {};
  }

  config.ios.infoPlist["NSMotionUsageDescription"] =
    "Needs Permission for Steps";

  return config;
};

exports.default = withPedometerPermission;
