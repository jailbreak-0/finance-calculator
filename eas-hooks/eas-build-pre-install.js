#!/usr/bin/env node

/**
 * EAS Build Hook - Configure Android Build for Obfuscation
 * This script runs before the Android build to ensure ProGuard/R8 is properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Configuring Android build for code obfuscation and shrinking...');

// This hook will be run during EAS build
// For now, we'll create a gradle.properties file to enable ProGuard
const androidPath = path.join(__dirname, '..', 'android');

// Create android directory if it doesn't exist
if (!fs.existsSync(androidPath)) {
  console.log('📁 Creating android directory...');
  fs.mkdirSync(androidPath, { recursive: true });
}

// Create gradle.properties to enable ProGuard
const gradlePropertiesPath = path.join(androidPath, 'gradle.properties');
const gradleProperties = `
# ProGuard/R8 Configuration
android.enableProguardInReleaseBuilds=true
android.enableShrinkResourcesInReleaseBuilds=true

# Hermes Engine
hermesEnabled=true

# Use AndroidX
android.useAndroidX=true
android.enableJetifier=true
`;

fs.writeFileSync(gradlePropertiesPath, gradleProperties.trim(), 'utf8');
console.log('✅ Created gradle.properties with ProGuard enabled');

// Ensure proguard-rules.pro exists
const proguardRulesPath = path.join(androidPath, 'app', 'proguard-rules.pro');
if (!fs.existsSync(path.dirname(proguardRulesPath))) {
  fs.mkdirSync(path.dirname(proguardRulesPath), { recursive: true });
}

// Copy proguard rules if they don't exist
const sourceProguardPath = path.join(__dirname, '..', 'android', 'app', 'proguard-rules.pro');
if (fs.existsSync(sourceProguardPath) && !fs.existsSync(proguardRulesPath)) {
  fs.copyFileSync(sourceProguardPath, proguardRulesPath);
  console.log('✅ Copied ProGuard rules');
}

console.log('🎉 Build configuration complete!');

