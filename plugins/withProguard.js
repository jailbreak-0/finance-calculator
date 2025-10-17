const { withAppBuildGradle, withProjectBuildGradle } = require('@expo/config-plugins');

const withProguard = (config) => {
  // This plugin ensures ProGuard is enabled in release builds
  // The actual ProGuard configuration is handled by the android/app/proguard-rules.pro file
  // and the EAS build hook
  
  return withAppBuildGradle(config, (config) => {
    // Ensure ProGuard is enabled for release builds
    let contents = config.modResults.contents;
    
    // Check if already configured
    if (contents.includes('minifyEnabled true')) {
      return config;
    }
    
    // Add ProGuard configuration to release buildType
    const releaseBlockRegex = /release\s*{/;
    if (releaseBlockRegex.test(contents)) {
      contents = contents.replace(
        /release\s*{/,
        `release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'`
      );
    }
    
    config.modResults.contents = contents;
    return config;
  });
};

module.exports = withProguard;
