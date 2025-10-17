# Finance Calculator

A comprehensive mobile-first finance calculator app built with React Native (Expo) featuring multiple calculators, multi-currency support, and complete offline functionality with privacy-first design.

> **📱 Now Available on Google Play!**  
> <!-- Uncomment after publishing:
> [![Get it on Google Play](https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png)](https://play.google.com/store/apps/details?id=com.financecalculator.app)
> -->

## 🚀 Features

### Calculators
- **Compound Interest**: Projects investment growth with periodic contributions and compounding
- **Fixed Deposit**: Calculates maturity amounts with different payout options
- **Treasury Bills**: Calculates discounted purchase price and effective yield
- **Loans**: EMI calculator with amortization schedule and affordability insights
- **Retirement Planner**: Estimates retirement corpus with inflation adjustment

### Key Features
- 📱 Mobile-first design with dark mode
- 💱 Multi-currency support (GHS, USD, EUR, GBP, NGN, KES, ZAR)
- 📊 Year-by-year breakdowns for all calculations
- 🤖 AI assistant integration (OpenAI)
- 💾 Offline-capable with SQLite caching
- 📈 Interactive visualizations
- 🔔 Daily finance tips and notifications
- 🔒 Code obfuscation for enhanced security
- 📦 Optimized build size (30-40% smaller)

## 📦 Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Navigation**: React Navigation (Native Stack)
- **Database**: Expo SQLite
- **Charts**: React Native Chart Kit
- **State Management**: React Hooks
- **Storage**: AsyncStorage

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Expo Go app (for mobile testing)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd finance-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # OpenAI API Key (for AI Assistant)
   OPENAI_API_KEY=your_openai_api_key_here
   
   # API Base URL (if using custom backend)
   API_BASE_URL=https://your-api-url.com
   
   # Firebase/Analytics (optional)
   FIREBASE_API_KEY=your_firebase_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on a device**
   - **Android**: Press `a` or scan QR code with Expo Go
   - **iOS**: Press `i` or scan QR code with Camera app
   - **Web**: Press `w`

## 📁 Project Structure

```
finance-calculator/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CalculatorCard.tsx
│   │   ├── CurrencyInput.tsx
│   │   ├── NumberInput.tsx
│   │   ├── DropdownPicker.tsx
│   │   └── BreakdownModal.tsx
│   ├── screens/             # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── CompoundInterestScreen.tsx
│   │   └── ... (other calculators)
│   ├── services/            # Calculation engines
│   │   ├── compoundInterestCalculator.ts
│   │   ├── fixedDepositCalculator.ts
│   │   ├── treasuryBillsCalculator.ts
│   │   ├── loanCalculator.ts
│   │   └── retirementPlannerCalculator.ts
│   ├── navigation/          # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── constants/           # App constants
│   │   ├── theme.ts
│   │   └── calculators.ts
│   └── utils/               # Utility functions
├── App.tsx                  # Main app entry point
├── app.json                 # Expo configuration
├── package.json
└── README.md
```

## 🧮 Calculation Formulas

### Compound Interest
```
A = P * (1 + r/n)^(n*t) + Σ C_k * (1 + r/n)^(n*(t - k/f))
```
- P: Initial Investment
- r: Annual Interest Rate (decimal)
- n: Compounding periods per year
- t: Investment period in years
- C_k: Contribution at period k (adjusted for annual increment)

### Fixed Deposit
**Cumulative**: `M = P * (1 + r/m)^(m*t)`  
**Periodic Payout**: `Interest = P * r / p`

### Treasury Bills
**Discounted Price**: `DiscountedPrice = FaceValue / (1 + (r * d / 365))`  
**Effective Yield**: `((FaceValue - Price) / Price) * (365 / d) * 100`

### Loan EMI
```
EMI = (P * r * (1 + r)^n) / ((1 + r)^n - 1)
```
- P: Loan Amount
- r: Monthly Interest Rate
- n: Total months

### Retirement Planner
```
FV = CB * (1 + r)^t + PMT * ((1 + r)^t - 1) / r
Real Return = (1 + r) / (1 + inflation) - 1
```

## 🎨 Customization

### Theme
Edit `src/constants/theme.ts` to customize colors:
```typescript
export const DARK_THEME: Theme = {
  primaryColor: '#0B5FFF',
  accent: '#FFC857',
  // ... other colors
};
```

### Currencies
Add/remove currencies in `src/types/index.ts`:
```typescript
export type Currency = 'GHS' | 'USD' | 'EUR' | 'YourCurrency';
```

## 🔧 Development

### Adding a New Calculator

1. **Create calculator service** in `src/services/`:
   ```typescript
   export function calculateYourCalculator(inputs: YourInputs): YourOutputs {
     // Implement calculation logic
   }
   ```

2. **Add screen** in `src/screens/`:
   ```typescript
   export const YourCalculatorScreen: React.FC = () => {
     // Implement UI
   };
   ```

3. **Update navigation** in `src/navigation/AppNavigator.tsx`

4. **Add metadata** in `src/constants/calculators.ts`

### Running Tests
```bash
npm test
```

### Building for Production

**Android APK**:
```bash
eas build --platform android --profile preview
```

**iOS**:
```bash
eas build --platform ios --profile preview
```

## 📱 Features Roadmap

### Current Features ✅
- [x] Compound Interest Calculator
- [x] Fixed Deposit Calculator
- [x] Treasury Bills Calculator
- [x] Loan/EMI Calculator
- [x] Retirement Planner
- [x] Dark mode theme
- [x] Multi-currency support
- [x] Year-by-year breakdowns

### Upcoming Features 🚧
- [ ] SQLite database integration for calculation history
- [ ] AI assistant integration (optional with user's own API key)
- [ ] Historical calculations tracking
- [ ] Enhanced charts and visualizations
- [ ] Export to PDF/CSV
- [ ] Cloud backup (optional)
- [ ] iOS release on App Store
- [ ] Scenario comparison tool
- [ ] More currency support

## 🚀 Building & Deployment

### Development Build
```bash
npm start
```

### Production Build for Google Play

All production builds include:
- ✅ Code obfuscation (ProGuard/R8)
- ✅ Resource shrinking
- ✅ Debug log removal
- ✅ Optimized bytecode

1. **Preview Build (APK for testing)**
   ```bash
   npm run build:android:preview
   ```

2. **Production Build (AAB for Play Store)**
   ```bash
   npm run build:android:production
   ```

3. **Submit to Google Play**
   ```bash
   npm run submit:android
   ```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)  
For obfuscation details, see [OBFUSCATION.md](./OBFUSCATION.md)

## 📋 Documentation

- **[Getting Started Guide](./GETTING_STARTED.md)** - Quick start guide
- **[Deployment Guide](./DEPLOYMENT.md)** - How to deploy to Google Play
- **[Obfuscation Guide](./OBFUSCATION.md)** - Code protection and optimization
- **[Release Checklist](./RELEASE_CHECKLIST.md)** - Pre-release checklist
- **[Privacy Policy](./PRIVACY_POLICY.md)** - Privacy policy
- **[Google Play Listing](./GOOGLE_PLAY_LISTING.md)** - Store listing content
- **[Play Store Assets](./PLAY_STORE_ASSETS.md)** - Marketing materials
- **[Next Steps](./NEXT_STEPS.md)** - Future enhancements
- **[Project Summary](./PROJECT_SUMMARY.md)** - Project overview

## 🔒 Privacy & Security

Finance Calculator is built with privacy as the top priority:
- ✅ **All calculations are performed locally** on your device
- ✅ **No data is transmitted** to external servers
- ✅ **No tracking or analytics** - we don't collect any usage data
- ✅ **No ads** - completely ad-free experience
- ✅ **Minimal permissions** - only essential permissions requested
- ✅ **Open source** - code is publicly available for review
- ✅ **Code obfuscation** - production builds are obfuscated to protect algorithms

Your financial data stays on your device, always.
- ✅ **All calculations are performed locally** on your device
- ✅ **No data is transmitted** to external servers
- ✅ **No tracking or analytics** - we don't collect any usage data
- ✅ **No ads** - completely ad-free experience
- ✅ **Minimal permissions** - only essential permissions requested
- ✅ **Open source** - code is publicly available for review

Your financial data stays on your device, always.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code:
- Follows TypeScript best practices
- Includes appropriate type definitions
- Is tested on both Android and iOS (if applicable)
- Maintains the existing code style

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial development and design

## 🙏 Acknowledgments

- **Expo Team** - For the amazing React Native framework
- **React Navigation** - For seamless navigation solution
- **React Native Community** - For excellent libraries and support
- **Open Source Community** - For inspiration and tools

## 📞 Support & Contact

- **Email:** your.email@example.com
- **GitHub Issues:** [Report a bug or request a feature](https://github.com/yourusername/finance-calculator/issues)
- **Discussions:** [Community discussions](https://github.com/yourusername/finance-calculator/discussions)

For Google Play support, visit the Play Store listing.

## ⭐ Show Your Support

If you find this app helpful, please:
- ⭐ Star this repository
- 📱 Rate the app on Google Play
- 🐛 Report bugs and suggest features
- 🔄 Share with friends and colleagues
- 💬 Leave a review

---

**Made with ❤️ for the personal finance community**


---

**Version**: 1.1.0  
**Last Updated**: October 2025
