import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Typography, Spacing, Radius } from '@/src/constants/theme';

import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import TemplateTelaFormulario from '@/src/components/TemplateTelaFormulario';

export default function Login() {
  
  const handleLogin = () => {
   
    router.replace("/(tabs)");
  };

  return (
    <TemplateTelaFormulario>
      
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <Ionicons name="wallet-outline" size={48} color={Colors.white} />
        </View>
        <Text style={styles.title}>ProEstoque</Text>
        <Text style={styles.subtitle}>Bem-vindo de volta</Text>
      </View>

      
      <View style={styles.form}>
        <Input 
          label="E-mail"
          placeholder="Digite seu e-mail"
          leftIcon="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input 
          label="Senha"
          placeholder="Digite sua senha"
          leftIcon="lock-closed-outline"
          isPassword={true}
        />

        <TouchableOpacity 
          style={styles.forgotPass} 
          onPress={() => router.push("/(auth)/recuperar-senha")}
        >
          <Text style={styles.forgotText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      
      <Button 
        label="Entrar" 
        onPress={handleLogin} 
        variant="primary" 
        fullWidth={true} 
      />

      <TouchableOpacity 
        style={styles.footer} 
        onPress={() => router.push("/(auth)/cadastro")}
      >
        <Text style={styles.footerText}>
          Não tem conta? <Text style={styles.linkBold}>Cadastrar</Text>
        </Text>
      </TouchableOpacity>
    </TemplateTelaFormulario>
  );
}

const styles = StyleSheet.create({
  header: { 
    alignItems: 'center', 
    marginTop: Spacing[10], 
    marginBottom: Spacing[10] 
  },
  logoBox: { 
    backgroundColor: Colors.primary[600], 
    padding: Spacing[5], 
    borderRadius: Radius.xl, 
    marginBottom: Spacing[4] 
  },
  title: { 
    fontSize: Typography.fontSize["2xl"], 
    fontWeight: Typography.fontWeight.bold, 
    color: Colors.textPrimary 
  },
  subtitle: { 
    fontSize: Typography.fontSize.md, 
    color: Colors.textSecondary, 
    marginTop: Spacing[1] 
  },
  form: { 
    marginBottom: Spacing[6] 
  },
  forgotPass: { 
    alignSelf: 'flex-end', 
    marginBottom: Spacing[5] 
  },
  forgotText: { 
    color: Colors.primary[600], 
    fontWeight: Typography.fontWeight.semibold 
  },
  footer: { 
    marginTop: Spacing[6], 
    alignItems: 'center' 
  },
  footerText: { 
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary 
  },
  linkBold: { 
    color: Colors.primary[600], 
    fontWeight: Typography.fontWeight.bold 
  }
});