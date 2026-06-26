import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Typography, Spacing, Radius } from "@/src/constants/theme";

interface ErrorViewProps {
  mensagem?: string;
  onRetry?: () => void;
}

export default function ErrorView({
  mensagem = "Algo deu errado. Verifique sua conexão.",
  onRetry,
}: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="cloud-offline-outline"
        size={56}
        color={Colors.danger.text}
      />
      <Text style={styles.titulo}>Erro de conexão</Text>
      <Text style={styles.mensagem}>{mensagem}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.botao} onPress={onRetry}>
          <Ionicons name="refresh-outline" size={18} color={Colors.white} />
          <Text style={styles.botaoTexto}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing[8],
    gap: Spacing[3],
  },
  titulo: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  mensagem: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[2],
    backgroundColor: Colors.primary[600],
    paddingHorizontal: Spacing[6],
    paddingVertical: Spacing[3],
    borderRadius: Radius.full,
    marginTop: Spacing[2],
  },
  botaoTexto: {
    color: Colors.white,
    fontWeight: Typography.fontWeight.semibold,
    fontSize: Typography.fontSize.sm,
  },
});
