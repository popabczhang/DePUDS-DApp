import React from 'react';
import { View, Text } from 'react-native';

// Example of a reusable button component
export const Button = ({ title, onPress }) => (
  <View>
    <Text onPress={onPress}>{title}</Text>
  </View>
);

// Example of a reusable input component
export const Input = ({ placeholder, value, onChangeText }) => (
  <View>
    <Text>{placeholder}</Text>
    <TextInput value={value} onChangeText={onChangeText} />
  </View>
);

// Export all components
export { Button, Input };