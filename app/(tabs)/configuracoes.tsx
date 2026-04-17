import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { Colors, Typography, Spacing, Radius } from '@/src/constants/theme';
import Button from '@/src/components/Button'; 

export default function Config() {
  
  const handleLogout = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.content}>
        <Button 
          label="Sair da Conta" 
          onPress={handleLogout} 
          variant="outline" 
          fullWidth 
        />
        
        <Text style={styles.version}>Versão 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, 
    padding: Spacing[6],
    justifyContent: 'center', 
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: Spacing[10],
    color: Colors.textPrimary,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  version: {
    marginTop: Spacing[5],
    color: Colors.neutral[400], 
    fontSize: Typography.fontSize.sm,
  }
});