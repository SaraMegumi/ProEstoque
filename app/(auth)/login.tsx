import React, { useState } from 'react'; 
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '@/src/constants/theme';
import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import TemplateTelaFormulario from '@/src/components/TemplateTelaFormulario';
import LogoProEstoque from '@/src/components/LogoProEstoque';
import { useAuth } from '@/src/contexts/AuthContext';

export default function Login() {
  const { login, isLoading } = useAuth(); 

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
  try {
    await login(email, senha);
  } catch (error: any) {
    const mensagem = error?.response?.data?.erro ?? 'Não foi possível entrar. Tente novamente.';
    Alert.alert('Erro ao entrar', mensagem);
  }
};

  return (
    <TemplateTelaFormulario>
      <View style={styles.header}>
        <LogoProEstoque size="lg" /> 
        <Text style={styles.subtitle}>Bem-vindo de volta</Text>
      </View>
      <View style={styles.form}>
        <Input 
          label="E-mail"
          placeholder="Digite seu e-mail"
          leftIcon="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}           
          onChangeText={setEmail} 
        />
        <Input 
          label="Senha"
          placeholder="Digite sua senha"
          leftIcon="lock-closed-outline"
          isPassword={true}
          value={senha}           
          onChangeText={setSenha} 
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
        loading={isLoading}
        disabled={isLoading}
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