import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalculatorCard } from '../components/CalculatorCard';
import { CALCULATORS } from '../constants/calculators';
import { DARK_THEME } from '../constants/theme';
import { CalculatorId } from '../types';

type RootStackParamList = {
  Home: undefined;
  CompoundInterest: undefined;
  FixedDeposit: undefined;
  TreasuryBills: undefined;
  Loans: undefined;
  RetirementPlanner: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleCalculatorPress = (calculatorId: CalculatorId) => {
    const routeMap: Record<CalculatorId, keyof RootStackParamList> = {
      compoundInterest: 'CompoundInterest',
      fixedDeposit: 'FixedDeposit',
      treasuryBills: 'TreasuryBills',
      loans: 'Loans',
      retirementPlanner: 'RetirementPlanner',
    };
    
    navigation.navigate(routeMap[calculatorId]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={DARK_THEME.backgroundColor} />
      <View style={styles.header}>
        <Text style={styles.title}>Finance Calculator</Text>
        <Text style={styles.subtitle}>Choose a calculator to get started</Text>
      </View>
      <FlatList
        data={CALCULATORS}
        renderItem={({ item }) => (
          <CalculatorCard
            calculator={item}
            onPress={() => handleCalculatorPress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_THEME.backgroundColor,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: DARK_THEME.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: DARK_THEME.textSecondary,
  },
  grid: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
});
