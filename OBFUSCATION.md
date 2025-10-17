# Code Obfuscation & Shrinking Configuration

This document explains the code obfuscation and resource shrinking setup for Finance Calculator on Android.

---

## 🔒 What is Code Obfuscation?

Code obfuscation makes your app harder to reverse-engineer by:
- **Renaming classes, methods, and variables** to meaningless names (e.g., `a`, `b`, `c`)
- **Removing unused code** to reduce APK/AAB size
- **Removing debug symbols** and logging statements
- **Optimizing bytecode** for better performance

### Benefits:
✅ **Security**: Harder to reverse-engineer your app  
✅ **Size Reduction**: Smaller APK/AAB (typically 20-40% smaller)  
✅ **Performance**: Optimized bytecode runs faster  
✅ **IP Protection**: Protects your calculation algorithms and business logic

---

## 🛠️ Configuration Files

### 1. ProGuard Rules (`android/app/proguard-rules.pro`)

This file tells ProGuard/R8 what to keep and what to obfuscate:

**What's Protected:**
- ✅ Expo modules (required for app to work)
- ✅ React Native core (essential framework code)
- ✅ JavaScript interface methods (for RN bridge)
- ✅ Navigation libraries
- ✅ AsyncStorage, SQLite, and other native modules
- ✅ Chart libraries (SVG rendering)
- ✅ Enum classes (needed by Java/Kotlin)
- ✅ Parcelable implementations (Android serialization)

**What's Obfuscated:**
- ❌ Your business logic and calculation code
- ❌ Helper classes and utilities
- ❌ Custom components (that don't interact with native)

**What's Removed:**
- ❌ Debug logging (`Log.d()`, `Log.v()`, `Log.i()`)
- ❌ Unused code paths
- ❌ Unused resources

### 2. Expo Config Plugin (`plugins/withProguard.js`)

This plugin automatically configures your Android build to use ProGuard/R8:

```javascript
// Adds to android/app/build.gradle:
release {
    minifyEnabled true          // Enable code shrinking
    shrinkResources true        // Enable resource shrinking
    proguardFiles ...          // Use ProGuard rules
}
```

### 3. EAS Build Hook (`eas-hooks/eas-build-pre-install.js`)

This script ensures ProGuard is configured before building:
- Runs automatically during EAS builds
- Validates build.gradle configuration
- Ensures ProGuard rules are applied

### 4. EAS Configuration (`eas.json`)

Updated to use release builds for preview and production:

```json
{
  "preview": {
    "android": {
      "buildType": "apk",
      "gradleCommand": ":app:assembleRelease"  // Uses release config
    }
  },
  "production": {
    "android": {
      "buildType": "app-bundle",
      "enableProguardInReleaseBuilds": true     // Explicit ProGuard enable
    }
  }
}
```

---

## 📊 Expected Results

### Size Reduction
**Before Obfuscation:**
- APK: ~40-50 MB
- AAB: ~35-45 MB

**After Obfuscation:**
- APK: ~25-35 MB (30-40% reduction)
- AAB: ~20-30 MB (30-40% reduction)

### Build Time
- Adds 2-5 minutes to build time (ProGuard processing)
- Worth it for production releases

---

## 🚀 How to Build with Obfuscation

### Development (No Obfuscation)
```bash
npm start
npm run android
```
Development builds are NOT obfuscated for faster iteration.

### Preview Build (With Obfuscation)
```bash
npm run build:android:preview
```
Creates obfuscated APK for testing.

### Production Build (With Obfuscation)
```bash
npm run build:android:production
```
Creates obfuscated AAB for Google Play.

---

## 🔍 Verifying Obfuscation

### 1. Check APK/AAB Size
Obfuscated builds should be 30-40% smaller than debug builds.

### 2. Decompile and Inspect
Use tools like **jadx** or **apktool** to decompile your APK:

```bash
# Download jadx from https://github.com/skylot/jadx
jadx-gui your-app.apk
```

**What you should see:**
- Class names like: `a.class`, `b.class`, `c.class`
- Method names like: `a()`, `b()`, `c()`
- No debug logging statements
- Minimal string literals

### 3. Check Mapping File
EAS provides a mapping file (`mapping.txt`) that shows:
```
com.financecalculator.utils.Calculator -> a:
    double calculateCompoundInterest() -> a
    double calculateLoan() -> b
```

This file is crucial for:
- 📊 Crash report de-obfuscation
- 🐛 Debugging production issues
- 📈 Stack trace interpretation

**Download from:** EAS dashboard → Build details → Artifacts

---

## 🐛 Debugging Obfuscated Builds

### Crash Reports
When users report crashes in production:

1. **Get the stack trace** from Google Play Console
2. **Download mapping.txt** from EAS build artifacts
3. **Use ReTrace** to de-obfuscate:

```bash
# Android SDK includes retrace tool
retrace.bat mapping.txt crash-stacktrace.txt
```

This converts:
```
at a.b.c(Unknown Source)
```

To:
```
at com.financecalculator.services.compoundInterestCalculator.calculate(compoundInterestCalculator.ts:45)
```

### ProGuard Errors
If the app crashes after obfuscation:

**Common Issues:**
1. **Missing ProGuard rule** - Some class was obfuscated that shouldn't be
2. **Reflection usage** - Code using reflection needs explicit keep rules
3. **Native module incompatibility** - Some libraries don't support obfuscation

**Solution:**
Add keep rules to `proguard-rules.pro`:
```proguard
# Keep your class
-keep class com.yourpackage.YourClass { *; }

# Or keep by pattern
-keep class com.yourpackage.** { *; }
```

---

## 📝 Custom ProGuard Rules

If you add new native modules, update `proguard-rules.pro`:

### Example: Adding a New Library

```proguard
# Example: Keep Firebase
-keep class com.google.firebase.** { *; }
-keep interface com.google.firebase.** { *; }

# Example: Keep a specific library
-keep class com.example.mylibrary.** { *; }

# Example: Keep classes with annotations
-keep @com.example.KeepThis class * { *; }
```

### Testing Custom Rules

1. Add rule to `proguard-rules.pro`
2. Build preview APK: `npm run build:android:preview`
3. Test thoroughly on device
4. Check for crashes or missing functionality
5. Adjust rules as needed

---

## 🔐 Security Best Practices

### 1. Additional Obfuscation
For maximum security, consider:
- **String encryption** - Encrypt sensitive strings
- **Native code** - Move critical algorithms to C++ (NDK)
- **Server-side validation** - Don't trust client-side calculations

### 2. What ProGuard Can't Protect
⚠️ ProGuard doesn't protect:
- **API keys in code** - Use environment variables
- **Hardcoded secrets** - Use secure storage
- **Network traffic** - Use HTTPS and certificate pinning
- **Resources** (images, strings in XML)

### 3. Finance Calculator Specific
Since this is a finance app:
- ✅ Calculation algorithms are obfuscated
- ✅ Business logic is protected
- ✅ No sensitive user data is stored
- ✅ No API keys in production builds

---

## 📈 Monitoring & Maintenance

### After Release

1. **Monitor Crash Reports**
   - Check Google Play Console regularly
   - Download mapping.txt for each release
   - De-obfuscate stack traces

2. **Track App Size**
   - Monitor APK/AAB size over time
   - Aim for <30 MB
   - Investigate sudden increases

3. **Update ProGuard Rules**
   - When adding new libraries
   - When updating React Native version
   - When Expo SDK updates

4. **Keep Mapping Files**
   - Store `mapping.txt` for each release
   - Tag in version control
   - Keep for at least 1 year

---

## 🆘 Troubleshooting

### Build Fails with ProGuard Error
```bash
# Error: Can't find referenced class
```

**Solution:** Add missing class to ProGuard rules:
```proguard
-dontwarn com.missingpackage.**
-keep class com.missingpackage.** { *; }
```

### App Crashes on Startup
**Solution:** Check ProGuard kept essential classes:
```proguard
# Add this to keep your main application class
-keep class com.financecalculator.** { *; }
```

### Navigation Doesn't Work
**Solution:** Keep navigation classes:
```proguard
-keep class com.reactnavigation.** { *; }
-keep class com.swmansion.** { *; }
```

### Charts Don't Render
**Solution:** Keep SVG library:
```proguard
-keep class com.horcrux.svg.** { *; }
```

---

## 📚 Resources

- **ProGuard Manual:** https://www.guardsquare.com/manual/home
- **R8 Documentation:** https://developer.android.com/studio/build/shrink-code
- **Expo ProGuard Guide:** https://docs.expo.dev/guides/proguard/
- **React Native ProGuard:** https://reactnative.dev/docs/signed-apk-android

---

## ✅ Checklist

Before releasing with obfuscation:

- [x] ProGuard rules created (`proguard-rules.pro`)
- [x] Expo config plugin added (`withProguard.js`)
- [x] EAS build hook configured
- [x] `eas.json` updated for release builds
- [x] `app.json` includes plugin
- [ ] Test preview build thoroughly
- [ ] Verify all features work in obfuscated build
- [ ] Confirm app size reduction
- [ ] Download and save mapping.txt
- [ ] Test crash reporting works
- [ ] Update documentation if custom rules added

---

## 🎯 Summary

**Configuration Status:** ✅ **COMPLETE**

Your Finance Calculator app is now configured with:
- ✅ Code obfuscation (ProGuard/R8)
- ✅ Resource shrinking
- ✅ Debug logging removal
- ✅ Bytecode optimization
- ✅ Automatic configuration via EAS

**Next Steps:**
1. Build preview APK: `npm run build:android:preview`
2. Test thoroughly on device
3. Build production AAB: `npm run build:android:production`
4. Download mapping.txt from EAS
5. Submit to Google Play

**Expected Benefits:**
- 📦 30-40% smaller app size
- 🔒 Protected business logic
- ⚡ Slightly better performance
- 🛡️ Harder to reverse-engineer

---

**Your financial calculations are now more secure! 🔐**
