import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Typography, Spacing, Radius } from "@/src/constants/theme";

import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import TemplateTelaFormulario from "@/src/components/TemplateTelaFormulario";
import LogoProEstoque from "@/src/components/LogoProEstoque";
import { useAuth } from "@/src/contexts/AuthContext";

type FormFields = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

export default function Cadastro() {
  const { registrar } = useAuth();
  const [form, setForm] = useState<FormFields>({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormFields> = {};
    if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!form.email.includes("@")) newErrors.email = "E-mail inválido";
    if (form.senha.length < 6)
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres";
    if (form.senha !== form.confirmarSenha)
      newErrors.confirmarSenha = "As senhas não coincidem";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCadastro = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await registrar(form.nome, form.email, form.senha);
      router.replace("/(tabs)");
    } catch (error: any) {
      console.log("ERRO CADASTRO:", JSON.stringify(error?.response?.data));
      console.log("ERRO STATUS:", error?.response?.status);
      console.log("ERRO MESSAGE:", error?.message);
      const mensagem =
        error?.response?.data?.erro ??
        "Não foi possível criar a conta. Tente novamente.";
      Alert.alert("Erro ao cadastrar", mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TemplateTelaFormulario>
      <View style={styles.header}>
        <LogoProEstoque size="md" />
        <Ionicons name="card" size={0} color={Colors.primary[600]} />
        <Text style={styles.title}>Criar conta</Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Nome completo"
          leftIcon="person-outline"
          value={form.nome}
          onChangeText={(v) => updateField("nome", v)}
          error={errors.nome}
          placeholder="João Silva"
          autoCapitalize="words"
        />
        <Input
          label="E-mail"
          leftIcon="mail-outline"
          value={form.email}
          onChangeText={(v) => updateField("email", v)}
          error={errors.email}
          placeholder="joao@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Senha"
          leftIcon="lock-closed-outline"
          value={form.senha}
          onChangeText={(v) => updateField("senha", v)}
          error={errors.senha}
          placeholder="••••••"
          isPassword
        />
        <Input
          label="Confirmar senha"
          leftIcon="lock-closed-outline"
          value={form.confirmarSenha}
          onChangeText={(v) => updateField("confirmarSenha", v)}
          error={errors.confirmarSenha}
          placeholder="••••"
          isPassword
        />
      </View>

      <Button
        label="Criar Conta"
        onPress={handleCadastro}
        loading={loading}
        fullWidth
      />

      <TouchableOpacity style={styles.footer} onPress={() => router.back()}>
        <Text style={styles.footerText}>Já tenho conta</Text>
      </TouchableOpacity>
    </TemplateTelaFormulario>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: Spacing[8],
  },
  logoBox: {
    backgroundColor: Colors.primary[600],
    padding: Spacing[4],
    borderRadius: Radius.xl,
    marginBottom: Spacing[3],
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  form: {
    marginBottom: Spacing[5],
  },
  footer: {
    marginTop: Spacing[5],
    alignItems: "center",
  },
  footerText: {
    color: Colors.primary[600],
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.md,
  },
});
