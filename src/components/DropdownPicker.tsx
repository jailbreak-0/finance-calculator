import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DARK_THEME } from '../constants/theme';

interface DropdownPickerProps {
  label: string;
  value: string | number;
  onValueChange: (value: any) => void;
  items: (string | number)[];
  error?: string;
}

export const DropdownPicker: React.FC<DropdownPickerProps> = ({
  label,
  value,
  onValueChange,
  items,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor={DARK_THEME.textPrimary}
        >
          {items.map((item) => (
            <Picker.Item
              key={item.toString()}
              label={item.toString()}
              value={item}
              color={'black'}
            />
          ))}
        </Picker>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_THEME.textPrimary,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: DARK_THEME.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: DARK_THEME.border,
    overflow: 'hidden',
  },
  picker: {
    height: 48,
    color: DARK_THEME.textPrimary,
  },
  error: {
    fontSize: 12,
    color: '#FF6B6B',
    marginTop: 4,
  },
});
