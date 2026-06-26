import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { Colors, Typography, Spacing } from "@/src/constants/theme";

interface LoadingViewProps {
  mensagem?: string;
}

export default function LoadingView({
  mensagem = "Carregando...",
}: LoadingViewProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary[600]} />
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing[4],
  },
  texto: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },
});
