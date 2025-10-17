# Google Play Release Checklist

Use this checklist to ensure you've completed all necessary steps for releasing Finance Calculator on Google Play.

---

## Pre-Release Checklist

### ✅ Code & Configuration

- [x] All calculator screens functional
  - [x] Compound Interest Calculator
  - [x] Fixed Deposit Calculator
  - [x] Treasury Bills Calculator
  - [x] Loan Calculator
  - [x] Retirement Planner
- [x] Settings screen with currency selection
- [x] Multi-currency support (7 currencies)
- [x] Dark mode theme implemented
- [x] Navigation working (Bottom tabs + Stack)
- [x] Breakdown modals scrollable
- [x] TypeScript errors resolved
- [ ] All features tested on physical Android device
- [ ] App tested offline (no internet connection)

### ✅ App Configuration

- [x] `app.json` configured
  - [x] App name: "Finance Calculator"
  - [x] Version: "1.1.0"
  - [x] Version code: 2
  - [x] Package name: "com.financecalculator.app"
  - [x] Icon set (512x512)
  - [x] Adaptive icon set
  - [x] Splash screen configured
  - [x] Permissions configured (minimal)
  - [x] Blocked unnecessary permissions
- [x] `eas.json` created with build profiles
- [x] `package.json` updated with build scripts

### ✅ Documentation

- [x] Privacy Policy created (`PRIVACY_POLICY.md`)
- [x] Google Play listing content (`GOOGLE_PLAY_LISTING.md`)
- [x] Deployment guide (`DEPLOYMENT.md`)
- [x] README.md updated
- [x] `.gitignore` includes sensitive files
- [ ] Privacy Policy URL updated with your GitHub username
- [ ] Contact email updated in all documents

### ✅ Assets Required

- [x] App icon (512x512) - `./assets/icon.png`
- [x] Adaptive icon (512x512) - `./assets/adaptive-icon.png`
- [x] Splash screen - `./assets/splash-icon.png`
- [ ] Feature graphic (1024x500) - **TO CREATE**
- [ ] Screenshots (4-8 recommended) - **TO CREATE**
  - [ ] Home screen (Calculator list)
  - [ ] Compound Interest with results
  - [ ] Loan Calculator with breakdown
  - [ ] Retirement Planner with chart
  - [ ] Settings screen
  - [ ] Treasury Bills results
  - [ ] Fixed Deposit results
  - [ ] Breakdown modal with chart

---

## Setup Checklist

### ✅ Accounts & Tools

- [ ] Expo account created (https://expo.dev)
- [ ] EAS CLI installed (`npm install -g eas-cli`)
- [ ] Logged into EAS (`eas login`)
- [ ] Google Play Developer account created ($25)
- [ ] Access to Google Play Console

### ✅ Environment Setup

- [ ] Node.js and npm installed
- [ ] Project dependencies installed (`npm install`)
- [ ] EAS configured (`eas build:configure`)
- [ ] Git repository initialized
- [ ] Remote repository created (GitHub)

---

## Build Checklist

### ✅ Preview Build (Testing)

- [ ] Preview APK built (`npm run build:android:preview`)
- [ ] APK downloaded from EAS dashboard
- [ ] APK installed on test device
- [ ] All features tested:
  - [ ] All 5 calculators work
  - [ ] Currency can be changed
  - [ ] Settings save/persist
  - [ ] Modals scroll properly
  - [ ] Charts display correctly
  - [ ] No crashes or errors

### ✅ Production Build

- [ ] Production AAB built (`npm run build:android:production`)
- [ ] Build completed successfully
- [ ] AAB file downloaded and saved
- [ ] Build notes documented

---

## Google Play Console Checklist

### ✅ App Creation

- [ ] New app created in Play Console
- [ ] App name: "Finance Calculator"
- [ ] Default language: English
- [ ] App type: App (not Game)
- [ ] Free/Paid: Free

### ✅ Store Listing

- [ ] App name set
- [ ] Short description added (80 chars max)
- [ ] Full description added (4000 chars max)
- [ ] App icon uploaded (512x512)
- [ ] Feature graphic uploaded (1024x500)
- [ ] Screenshots uploaded (minimum 2, recommended 4-8)
- [ ] Category: Finance
- [ ] Contact email added
- [ ] Privacy policy URL added
- [ ] Website URL added (optional)

### ✅ App Content

- [ ] App access completed
  - [ ] "All functionality available without special access" selected
- [ ] Ads declaration completed
  - [ ] "No ads" selected
- [ ] Content rating questionnaire completed
  - [ ] Rating received (should be "Everyone")
- [ ] Target audience set
  - [ ] Age: 18+
  - [ ] Not appealing to children
- [ ] Data safety form completed
  - [ ] No data collection declared
  - [ ] Local storage only explained
- [ ] News apps declaration (N/A - skip)
- [ ] COVID-19 contact tracing (N/A - skip)
- [ ] Data deletion (handled by uninstall)

### ✅ Store Settings

- [ ] App category selected: Finance
- [ ] Tags/keywords added
- [ ] Contact details verified
- [ ] Countries/regions selected
  - [ ] Ghana (Primary)
  - [ ] United States
  - [ ] United Kingdom
  - [ ] EU countries
  - [ ] Nigeria
  - [ ] Kenya
  - [ ] South Africa
  - [ ] (Or select "All countries")

---

## Release Checklist

### ✅ Testing Track (Recommended)

- [ ] Internal testing release created
- [ ] Testers added (email addresses)
- [ ] Feedback received from testers
- [ ] Bugs fixed from testing
- [ ] Updated build uploaded if needed

### ✅ Production Release

- [ ] Production release created
- [ ] AAB file uploaded
- [ ] Release notes added
- [ ] All required fields completed
- [ ] Review completed - no errors
- [ ] Release started (rolled out)

### ✅ Post-Submission

- [ ] Submission confirmation received
- [ ] Review status checked (1-3 days typically)
- [ ] Approval email received
- [ ] App live on Google Play Store
- [ ] App searchable on Play Store
- [ ] Download link working

---

## Post-Launch Checklist

### ✅ Monitoring

- [ ] Monitor Play Console dashboard
- [ ] Check for crash reports
- [ ] Review user ratings and reviews
- [ ] Respond to user feedback
- [ ] Track download statistics
- [ ] Monitor performance metrics

### ✅ Marketing & Promotion

- [ ] Share on social media
- [ ] Add Play Store badge to website/README
- [ ] Create promotional materials
- [ ] Engage with user community
- [ ] Collect user testimonials

### ✅ Maintenance

- [ ] Plan for regular updates
- [ ] Monitor for bugs and issues
- [ ] Implement user-requested features
- [ ] Keep dependencies updated
- [ ] Maintain privacy policy compliance

---

## Update Checklist (For Future Releases)

When releasing updates:

- [ ] Update version in `app.json`:
  - [ ] Increment `versionCode`
  - [ ] Update `version` (semantic versioning)
- [ ] Update release notes in `GOOGLE_PLAY_LISTING.md`
- [ ] Build new production AAB
- [ ] Test on devices before submitting
- [ ] Upload to Play Console
- [ ] Add release notes
- [ ] Review and publish

---

## Common Issues & Solutions

### Build Failures
- ❌ **Issue:** Build fails with dependency errors
- ✅ **Solution:** Run `npm install`, check package.json, clear cache

### Upload Failures
- ❌ **Issue:** Version code error
- ✅ **Solution:** Increment versionCode in app.json

### Review Rejection
- ❌ **Issue:** Missing privacy policy
- ✅ **Solution:** Ensure privacy policy URL is accessible

### App Not Found
- ❌ **Issue:** Can't find app on Play Store
- ✅ **Solution:** Wait for indexing (can take a few hours), check country availability

---

## Quick Commands Reference

```powershell
# Install dependencies
npm install

# Start development
npm start

# Build preview APK
npm run build:android:preview

# Build production AAB
npm run build:android:production

# Submit to Google Play
npm run submit:android

# Check build status
eas build:list

# Login to EAS
eas login
```

---

## Important URLs

- **Expo Dashboard:** https://expo.dev
- **Google Play Console:** https://play.google.com/console
- **EAS Build Docs:** https://docs.expo.dev/build/introduction/
- **Play Store Policies:** https://play.google.com/about/developer-content-policy/

---

## Before You Submit - Final Verification

Double-check these critical items:

✅ **Privacy Policy**
- [ ] Privacy policy is publicly accessible
- [ ] URL is correct in Play Console
- [ ] URL is correct in app.json extra field

✅ **App Content**
- [ ] All screenshots are accurate
- [ ] Description matches app functionality
- [ ] No misleading claims
- [ ] Contact information is correct

✅ **Technical**
- [ ] App works offline
- [ ] No crashes on fresh install
- [ ] All permissions justified
- [ ] Minimal permissions requested

✅ **Legal**
- [ ] No copyright violations
- [ ] No trademark issues
- [ ] Compliant with Play Store policies
- [ ] Age rating is accurate

---

## Success Metrics

After launch, track:
- Downloads per day/week/month
- User ratings (target: 4.0+ stars)
- User reviews and feedback
- Crash-free rate (target: 99%+)
- Uninstall rate
- Active users

---

**Remember:** Quality over speed. Take time to test thoroughly before releasing!

**Good luck with your release! 🚀**
