import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { CompoundInterestScreen } from '../screens/CompoundInterestScreen';
import { FixedDepositScreen } from '../screens/FixedDepositScreen';
import { TreasuryBillsScreen } from '../screens/TreasuryBillsScreen';
import { LoansScreen } from '../screens/LoansScreen';
import { RetirementPlannerScreen } from '../screens/RetirementPlannerScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { DARK_THEME } from '../constants/theme';

export type CalculatorStackParamList = {
  Home: undefined;
  CompoundInterest: undefined;
  FixedDeposit: undefined;
  TreasuryBills: undefined;
  Loans: undefined;
  RetirementPlanner: undefined;
};

export type TabParamList = {
  Calculators: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<CalculatorStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const CalculatorsStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: DARK_THEME.backgroundColor,
        },
        headerTintColor: DARK_THEME.textPrimary,
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: DARK_THEME.backgroundColor,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CompoundInterest"
        component={CompoundInterestScreen}
        options={{ title: 'Compound Interest', headerShown: false }}
      />
      <Stack.Screen
        name="FixedDeposit"
        component={FixedDepositScreen}
        options={{ title: 'Fixed Deposit', headerShown: false }}
      />
      <Stack.Screen
        name="TreasuryBills"
        component={TreasuryBillsScreen}
        options={{ title: 'Treasury Bills', headerShown: false }}
      />
      <Stack.Screen
        name="Loans"
        component={LoansScreen}
        options={{ title: 'Loans', headerShown: false }}
      />
      <Stack.Screen
        name="RetirementPlanner"
        component={RetirementPlannerScreen}
        options={{ title: 'Retirement Planner', headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: DARK_THEME.cardBackground,
            borderTopColor: DARK_THEME.cardBackground,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: DARK_THEME.accent,
          tabBarInactiveTintColor: DARK_THEME.textSecondary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="Calculators"
          component={CalculatorsStack}
          options={{
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🧮</Text>,
            tabBarLabel: 'Calculators',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>⚙️</Text>,
            tabBarLabel: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
