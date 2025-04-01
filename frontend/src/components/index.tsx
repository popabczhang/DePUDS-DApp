import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';

// Reusable button component
export const Button = ({ 
  title, 
  onPress,
  style,
  disabled = false
}: { 
  title: string; 
  onPress: () => void;
  style?: object;
  disabled?: boolean;
}) => (
  <TouchableOpacity 
    style={[styles.button, disabled && styles.buttonDisabled, style]} 
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{title}</Text>
  </TouchableOpacity>
);

// Reusable input component
export const Input = ({ 
  placeholder, 
  value, 
  onChangeText,
  style,
  secureTextEntry = false
}: { 
  placeholder: string; 
  value: string; 
  onChangeText: (text: string) => void;
  style?: object;
  secureTextEntry?: boolean;
}) => (
  <View style={styles.inputContainer}>
    <TextInput 
      style={[styles.input, style]} 
      placeholder={placeholder} 
      value={value} 
      onChangeText={onChangeText} 
      secureTextEntry={secureTextEntry}
    />
  </View>
);

// Card component for projects
export const ProjectCard = ({
  title,
  description,
  imageUrl,
  onPress
}: {
  title: string;
  description: string;
  imageUrl?: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    {imageUrl && <Image source={{ uri: imageUrl }} style={styles.cardImage} />}
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription} numberOfLines={2}>{description}</Text>
    </View>
  </TouchableOpacity>
);

// Vote button component
export const VoteButton = ({
  option,
  selected,
  onPress
}: {
  option: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.voteButton, selected && styles.voteButtonSelected]}
    onPress={onPress}
  >
    <Text style={[styles.voteButtonText, selected && styles.voteButtonTextSelected]}>{option}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#888888',
  },
  inputContainer: {
    marginVertical: 10,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
    overflow: 'hidden',
  },
  cardImage: {
    height: 150,
    width: '100%',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  voteButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 6,
  },
  voteButtonSelected: {
    backgroundColor: '#007bff',
  },
  voteButtonText: {
    color: '#007bff',
    fontWeight: '500',
  },
  voteButtonTextSelected: {
    color: '#fff',
  }
});