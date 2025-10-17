# Getting Started with Finance Calculator

Welcome to the Finance Calculator app! This guide will help you get up and running quickly.

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm start
```

### 3. Run on Your Device
- **Install Expo Go** on your mobile device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- **Scan the QR code** displayed in your terminal
- The app will load on your device!

## 📱 Running the App

### On Mobile Device (Recommended)
```bash
npm start
# Then scan QR code with Expo Go app
```

### On Android Emulator
```bash
npm run android
```

### On iOS Simulator (Mac only)
```bash
npm run ios
```

### On Web Browser
```bash
npm run web
```

## 🧮 Using the Calculators

### Compound Interest Calculator
1. Open the app and tap **"Compound Interest"** card
2. Enter your initial investment amount
3. Set your monthly/yearly contribution
4. Choose contribution frequency (Monthly, Quarterly, etc.)
5. Enter expected annual interest rate
6. Set investment period in years
7. Select compounding frequency
8. Tap **"Calculate"** to see results
9. Tap **"View Breakdown"** for year-by-year details

**Example:**
- Initial Investment: $1,000
- Monthly Contribution: $50
- Interest Rate: 7.5%
- Period: 10 years
- Result: See your investment grow to ~$9,000+

### Fixed Deposit Calculator
1. Tap **"Fixed Deposit"** card
2. Enter deposit amount
3. Set annual interest rate
4. Choose tenure (years)
5. Select payout option (Cumulative or Periodic)
6. Calculate to see maturity value

### Treasury Bills Calculator
1. Tap **"Treasury Bills"** card
2. Enter face value amount
3. Choose maturity period (91, 182, or 364 days)
4. Enter discount rate
5. See purchase price and effective yield

### Loan/EMI Calculator
1. Tap **"Loans"** card
2. Enter loan amount
3. Set interest rate
4. Choose loan period (Years or Months)
5. Optionally enter annual income for affordability check
6. View EMI, total interest, and amortization schedule

### Retirement Planner
1. Tap **"Retirement Planner"** card
2. Enter current age and retirement age
3. Set current savings balance
4. Enter monthly contribution
5. Set expected return rate
6. Enter expected inflation rate
7. See projected corpus (nominal and real)

## 🎨 Features to Explore

### Multi-Currency Support
- Tap the currency symbol to change currency
- Supports: GHS, USD, EUR, GBP, NGN, KES, ZAR
- Auto-detects based on your location

### Year-by-Year Breakdown
- After calculating, tap **"View Breakdown"**
- See detailed year-by-year projection
- Understand how your money grows over time

### AI Assistant (Coming Soon)
- Get personalized financial advice
- Ask "What if?" questions
- Understand complex formulas in simple terms

## 🔧 Customization

### Change Default Currency
Edit `src/utils/currency.ts`:
```typescript
export function autoDetectCurrency(): Currency {
  return 'GHS'; // Your preferred currency
}
```

### Modify Theme Colors
Edit `src/constants/theme.ts`:
```typescript
export const DARK_THEME: Theme = {
  primaryColor: '#0B5FFF', // Change this
  accent: '#FFC857',       // And this
  // ...
};
```

## 🐛 Troubleshooting

### App won't start?
```bash
# Clear cache and restart
npm start -- --clear
```

### Can't connect to Expo Go?
- Ensure your phone and computer are on the same Wi-Fi network
- Try using tunnel mode: `npm start -- --tunnel`

### TypeScript errors?
```bash
# Rebuild TypeScript
npm run tsc
```

### Metro bundler issues?
```bash
# Reset Metro bundler
npx expo start -c
```

## 📚 Next Steps

1. **Try all calculators** - Familiarize yourself with each one
2. **View breakdowns** - Understand the detailed calculations
3. **Save scenarios** - Compare different financial scenarios
4. **Explore the code** - See how calculations work in `src/services/`
5. **Customize** - Make it your own!

## 💡 Tips

- **Use realistic numbers** for better projections
- **Compare scenarios** by changing one variable at a time
- **Check breakdowns** to understand the math
- **Consider inflation** especially for long-term planning
- **Review regularly** as your financial situation changes

## 🆘 Need Help?

- Check the [README.md](./README.md) for detailed documentation
- Review the code in `src/` folders
- Check Expo documentation: https://docs.expo.dev
- Open an issue on GitHub

## 🎯 Quick Calculator Tips

### Compound Interest
- Higher compounding frequency = more growth
- Small increases in contribution make big differences over time
- Time is your biggest ally - start early!

### Loans
- Shorter loan periods = less total interest
- Even 0.5% interest rate difference matters
- Pay extra principal to save thousands

### Retirement
- Start now, not later
- Account for inflation - it erodes purchasing power
- The real (inflation-adjusted) value matters most

---

Happy calculating! 💰📊
