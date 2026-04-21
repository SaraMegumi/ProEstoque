import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '@/src/constants/theme';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function LogoProEstoque({ size = 'md' }: LogoProps) {
  const config = {
    sm: { icon: 20, font: Typography.fontSize.sm },
    md: { icon: 38, font: Typography.fontSize.lg },
    lg: { icon: 50, font: Typography.fontSize.xl },
  };

  const current = config[size];

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Ionicons name="cube-outline" size={current.icon} color={Colors.white} />
      </View>
      <Text style={[styles.text, { fontSize: current.font }]}>ProEstoque</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row',     
    alignItems: 'center',       
    justifyContent: 'center',   
    gap: Spacing[2],           
    marginBottom: Spacing[8],   
  },
  iconBox: { 
    backgroundColor: Colors.primary[600], 
    padding: Spacing[2], 
    borderRadius: Radius.md, 
    
  },
  text: { 
    fontWeight: Typography.fontWeight.bold, 
    color: Colors.textPrimary, 
  },
});