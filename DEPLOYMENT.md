# Google Play Deployment Guide

This guide walks you through deploying Finance Calculator to Google Play Store using Expo EAS (Expo Application Services).

---

## Prerequisites

Before you begin, ensure you have:

1. **Expo Account**
   - Create a free account at https://expo.dev
   - Install EAS CLI: `npm install -g eas-cli`
   - Login: `eas login`

2. **Google Play Console Account**
   - Create a Google Play Developer account ($25 one-time fee)
   - Access at: https://play.google.com/console

3. **App Signing Key**
   - Google Play will manage app signing (recommended)
   - Or create your own keystore

4. **Required Assets**
   - App icon (512x512 px) ✅ Already in `./assets/icon.png`
   - Feature graphic (1024x500 px) ⚠️ Need to create
   - Screenshots (4-8 recommended) ⚠️ Need to create

---

## Step 1: Configure EAS Build

### 1.1 Initialize EAS
```powershell
# Navigate to your project
cd C:\Users\jAiLbReAk\Documents\Projects\finance-calculator

# Configure EAS (if not already done)
eas build:configure
```

### 1.2 Verify Configuration
Check that `eas.json` is properly configured (already done):
```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle",
        "enableProguardInReleaseBuilds": true
      }
    }
  }
}
```

**🔒 Code Obfuscation Enabled:**
- ✅ ProGuard/R8 configured for code shrinking
- ✅ Resource shrinking enabled
- ✅ Debug logging removed in release builds
- ✅ Expected APK/AAB size reduction: 30-40%

See [OBFUSCATION.md](./OBFUSCATION.md) for details.
```

---

## Step 2: Update App Configuration

### 2.1 Review app.json
Ensure all fields are correct:
- ✅ `version`: "1.1.0"
- ✅ `versionCode`: 2
- ✅ `package`: "com.financecalculator.app"
- ✅ `permissions`: Minimal permissions set
- ✅ `blockedPermissions`: Unnecessary permissions blocked

### 2.2 Update Privacy Policy URL
In `app.json`, update the privacy policy URL in `extra` section:
```json
"extra": {
  "privacyPolicyUrl": "https://github.com/YOURUSERNAME/finance-calculator/blob/main/PRIVACY_POLICY.md"
}
```

Replace `YOURUSERNAME` with your actual GitHub username.

---

## Step 3: Build APK for Testing

### 3.1 Build Preview APK
```powershell
# Build a preview APK for testing
npm run build:android:preview

# OR directly with EAS
eas build --platform android --profile preview
```

This creates an APK you can install on physical devices for testing.

### 3.2 Download and Test APK
1. Once build completes, download the APK from the EAS dashboard
2. Install on Android device: `adb install path/to/app.apk`
3. Test all features thoroughly:
   - All 5 calculators
   - Currency switching
   - Settings screen
   - Breakdown modals
   - Offline functionality

---

## Step 4: Build Production App Bundle

### 4.1 Build App Bundle (AAB)
```powershell
# Build production app bundle for Google Play
npm run build:android:production

# OR directly with EAS
eas build --platform android --profile production
```

Google Play requires AAB (Android App Bundle) format for new apps.

### 4.2 Download App Bundle
1. Wait for build to complete (usually 10-20 minutes)
2. Download the `.aab` file from EAS dashboard
3. Keep this file safe - you'll upload it to Google Play Console

---

## Step 5: Create Google Play Console Listing

### 5.1 Create New Application
1. Go to https://play.google.com/console
2. Click "Create app"
3. Fill in:
   - App name: "Finance Calculator"
   - Default language: English (United States)
   - App or game: App
   - Free or paid: Free
4. Accept declarations and create app

### 5.2 Complete Store Listing
Navigate to "Store presence" → "Main store listing"

#### App Details
- **App name:** Finance Calculator
- **Short description:** (See GOOGLE_PLAY_LISTING.md)
  ```
  All-in-one financial calculator with multi-currency support. Offline.
  ```
- **Full description:** (Copy from GOOGLE_PLAY_LISTING.md)

#### Graphics
1. **App icon:** Upload `./assets/icon.png` (512x512)
2. **Feature graphic:** Create and upload (1024x500)
   - Suggestion: Use blue background (#0B5FFF) with app name and calculator icon
3. **Phone screenshots:** Upload 4-8 screenshots
   - Take screenshots of each calculator in use
   - Show Settings screen with currencies
   - Show breakdown modals with charts

#### Categorization
- **App category:** Finance
- **Tags:** Finance, Calculator, Tools

#### Contact Details
- **Email:** your.email@example.com
- **Website:** https://github.com/yourusername/finance-calculator
- **Privacy policy:** https://github.com/yourusername/finance-calculator/blob/main/PRIVACY_POLICY.md

### 5.3 Set Up App Access
- Select "All functionality is available without special access"
- Or explain if any features need credentials

### 5.4 Complete Ads Declaration
- Select "No, my app does not contain ads"

### 5.5 Complete Content Rating
1. Click "Start questionnaire"
2. Select app category: Finance
3. Answer all questions (all should be "No" for this app)
4. Submit to get rating (should be "Everyone")

### 5.6 Complete Target Audience
1. Target age group: 18 and over
2. Appeal to children: No

### 5.7 Create Data Safety Form
Based on our privacy policy:

**Data Collection:**
- ✅ We do not collect any user data
- ❌ No personal information collected
- ❌ No location data
- ❌ No financial information shared externally
- ℹ️ All data stored locally on device only

**Security Practices:**
- ✅ Data is encrypted in transit (N/A - no transmission)
- ✅ Data is stored securely on device
- ✅ User can request data deletion (uninstall app)

---

## Step 6: Upload App Bundle

### 6.1 Create Release
1. Go to "Release" → "Production"
2. Click "Create new release"
3. Upload your `.aab` file from Step 4
4. Google Play will verify the bundle

### 6.2 Add Release Notes
(Copy from GOOGLE_PLAY_LISTING.md - "What's New" section)
```
🎉 Initial release of Finance Calculator!

Features:
• 5 powerful financial calculators
• Multi-currency support (7 currencies)
• Compound Interest Calculator
• Fixed Deposit Calculator
• Treasury Bills Calculator
• Loan Calculator with amortization
• Retirement Planner
• Beautiful dark mode interface
• Completely offline - privacy first
• No ads, no tracking
```

### 6.3 Review and Roll Out
1. Review all information
2. Click "Review release"
3. Fix any warnings or errors
4. Click "Start rollout to Production"

---

## Step 7: Alternative - Submit Using EAS

You can automate submission using EAS CLI:

### 7.1 Set Up Service Account
1. In Google Play Console → Setup → API access
2. Create service account
3. Grant permissions
4. Download JSON key file
5. Save as `google-play-service-account.json` in project root
6. **Add to .gitignore** (important - never commit this!)

### 7.2 Submit with EAS
```powershell
# Submit to Google Play
npm run submit:android

# OR directly
eas submit --platform android --profile production
```

This will automatically:
- Upload your latest production build
- Submit to internal testing track
- Create as draft release

---

## Step 8: Testing Tracks

Before production release, use testing tracks:

### 8.1 Internal Testing
- Up to 100 testers
- Fast review (usually hours)
- Great for team testing

### 8.2 Closed Testing
- Up to 1000+ testers
- Invite testers via email
- Get feedback before public release

### 8.3 Open Testing
- Anyone can join
- Public testing phase
- Last step before production

### 8.4 Promote to Production
Once testing is complete:
1. Go to testing track with approved build
2. Click "Promote release"
3. Select "Production"
4. Confirm promotion

---

## Step 9: After Submission

### 9.1 Review Process
- Google reviews your app (usually 1-3 days)
- You'll receive email when approved/rejected
- Fix any issues and resubmit if needed

### 9.2 Going Live
Once approved:
- App appears on Google Play Store
- Available in selected countries
- Can be found by searching "Finance Calculator"

### 9.3 Post-Launch
- Monitor reviews and ratings
- Respond to user feedback
- Track downloads in Play Console
- Update app regularly

---

## Step 10: Future Updates

### 10.1 Version Updates
When releasing updates:

1. Update version in `app.json`:
   ```json
   "version": "1.2.0",
   "android": {
     "versionCode": 3
   }
   ```

2. Build new version:
   ```powershell
   npm run build:android:production
   ```

3. Submit to Google Play:
   ```powershell
   npm run submit:android
   ```

### 10.2 Version Code Rules
- Increment `versionCode` with every release
- Update `version` following semantic versioning:
  - Major: Breaking changes (2.0.0)
  - Minor: New features (1.2.0)
  - Patch: Bug fixes (1.1.1)

---

## Troubleshooting

### Build Fails
```powershell
# Clear EAS cache
eas build --platform android --profile production --clear-cache

# Check build logs in EAS dashboard
# Common issues: Dependencies, gradle config, permissions
```

### Upload Fails
- Ensure `versionCode` is higher than previous release
- Check package name matches Play Console
- Verify app bundle is signed correctly

### Review Rejection
Common reasons:
- Missing privacy policy
- Incorrect permissions
- Content policy violations
- Misleading screenshots

Fix issues and resubmit.

---

## Security Best Practices

1. **Never commit sensitive files:**
   ```gitignore
   # Add to .gitignore
   google-play-service-account.json
   *.jks
   *.keystore
   ```

2. **Use environment variables for API keys**
3. **Keep EAS credentials secure**
4. **Enable two-factor authentication on Play Console**

---

## Useful Commands

```powershell
# Login to EAS
eas login

# Check build status
eas build:list

# View build details
eas build:view

# Cancel build
eas build:cancel

# Update EAS configuration
eas build:configure

# Check credentials
eas credentials

# View submission status
eas submit:list
```

---

## Cost Breakdown

- **Expo Account:** Free (unlimited builds with limitations)
- **EAS Build:** Free tier available, paid plans for priority builds
- **Google Play Developer:** $25 one-time registration fee
- **Total to start:** $25

---

## Resources

- **EAS Build Documentation:** https://docs.expo.dev/build/introduction/
- **EAS Submit Documentation:** https://docs.expo.dev/submit/introduction/
- **Google Play Console:** https://play.google.com/console
- **Play Console Help:** https://support.google.com/googleplay/android-developer

---

## Support

If you encounter issues:
1. Check EAS build logs
2. Review Google Play Console error messages
3. Consult Expo documentation
4. Ask in Expo Discord/Forums
5. Check Google Play support

---

## Next Steps

After successful deployment:

1. ✅ Monitor app performance in Play Console
2. ✅ Respond to user reviews
3. ✅ Plan feature updates (see NEXT_STEPS.md)
4. ✅ Consider iOS release
5. ✅ Promote app on social media
6. ✅ Gather user feedback
7. ✅ Iterate and improve

**Good luck with your Google Play release! 🚀**
