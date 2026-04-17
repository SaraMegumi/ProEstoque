import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors, Typography, Spacing, Radius } from '@/src/constants/theme';

import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import TemplateTelaFormulario from '@/src/components/TemplateTelaFormulario';

export default function RecuperarSenha() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecuperar = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true); 
    }, 1500);
  };

  return (
    <TemplateTelaFormulario>
    
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color={Colors.primary[600]} />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.logoBox}>
          <Ionicons name="lock-open" size={40} color={Colors.white} />
        </View>

        <Text style={styles.title}>Recuperar senha</Text>
        
        {!isSuccess ? (
          <>
            <Text style={styles.subtitle}>
              Informe seu e-mail e enviaremos um link
            </Text>

            <View style={styles.form}>
              <Input 
                label="E-mail"
                placeholder="joao@email.com"
                leftIcon="mail-outline"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Button 
              label="Enviar Link" 
              onPress={handleRecuperar} 
              loading={loading}
              fullWidth
            />
          </>
        ) : (
          <>
            
            <View style={styles.successCard}>
              <MaterialCommunityIcons 
                name="email-check-outline" 
                size={60} 
                color={Colors.success.text} 
              />
              <Text style={styles.successTitle}>E-mail enviado!</Text>
              <Text style={styles.successSubtitle}>Verifique sua caixa de entrada</Text>
            </View>

            <Button 
              label="Voltar ao Login" 
              onPress={() => router.back()} 
              variant="outline" 
              fullWidth
            />
          </>
        )}
      </View>
    </TemplateTelaFormulario>
  );
}

const styles = StyleSheet.create({
  backButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: Spacing[5] 
  },
  backText: { 
    color: Colors.primary[600], 
    marginLeft: Spacing[1], 
    fontWeight: Typography.fontWeight.bold 
  },
  content: { 
    alignItems: 'center' 
  },
  logoBox: { 
    backgroundColor: Colors.primary[600], 
    padding: Spacing[5], 
    borderRadius: Radius.xl, 
    marginBottom: Spacing[4] 
  },
  title: { 
    fontSize: Typography.fontSize.xl, 
    fontWeight: Typography.fontWeight.bold, 
    color: Colors.textPrimary, 
    marginBottom: Spacing[2] 
  },
  subtitle: { 
    fontSize: Typography.fontSize.md, 
    color: Colors.textSecondary, 
    textAlign: 'center', 
    marginBottom: Spacing[8] 
  },
  form: { 
    width: '100%', 
    marginBottom: Spacing[5] 
  },
  successCard: {
    width: '100%',
    backgroundColor: Colors.success.bg, 
    borderWidth: 1,
    borderColor: Colors.success.border,
    borderRadius: Radius.lg,
    padding: Spacing[8],
    alignItems: 'center',
    marginBottom: Spacing[8],
  },
  successTitle: { 
    fontSize: Typography.fontSize.lg, 
    fontWeight: Typography.fontWeight.bold, 
    color: Colors.success.text, 
    marginTop: Spacing[2] 
  },
  successSubtitle: { 
    fontSize: Typography.fontSize.base, 
    color: Colors.success.text, 
    textAlign: 'center', 
    marginTop: Spacing[1] 
  },
});