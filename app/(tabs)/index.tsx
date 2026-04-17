import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Typography, Spacing, Radius } from '@/src/constants/theme';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Olá, João 👋</Text>
        <Text style={styles.subtitle}>Visão geral do seu estoque</Text>

        <View style={styles.mainCard}>
          <Text style={styles.cardLabel}>Total em produtos</Text>
          <Text style={styles.cardValue}>247</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.smallCard}>
            <Text style={styles.smallLabel}>Categorias</Text>
            <Text style={styles.smallValue}>12</Text>
          </View>

          <View style={styles.smallCard}>
            <Text style={styles.smallLabel}>Alertas</Text>
            <Text style={[styles.smallValue, { color: Colors.danger.text }]}>5</Text>
          </View>
        </View>

        <Text style={styles.nextClass}>← preenchido na próxima aula →</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background 
  },
  content: { 
    padding: Spacing[6] 
  },
  greeting: { 
    fontSize: Typography.fontSize.xl, 
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary
  },
  subtitle: { 
    fontSize: Typography.fontSize.md, 
    color: Colors.textSecondary, 
    marginBottom: Spacing[6] 
  },
  mainCard: { 
    backgroundColor: Colors.primary[600], 
    borderRadius: Radius.xl, 
    padding: Spacing[6], 
    marginBottom: Spacing[4],
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardLabel: { 
    color: 'rgba(255,255,255,0.8)', 
    fontSize: Typography.fontSize.md 
  },
  cardValue: { 
    color: Colors.white, 
    fontSize: Typography.fontSize["3xl"], 
    fontWeight: Typography.fontWeight.black 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  smallCard: { 
    backgroundColor: Colors.surface, 
    borderWidth: 1, 
    borderColor: Colors.border, 
    borderRadius: Radius.lg, 
    padding: Spacing[5], 
    width: '48%' 
  },
  smallLabel: { 
    color: Colors.textSecondary, 
    fontSize: Typography.fontSize.sm, 
    marginBottom: Spacing[2] 
  },
  smallValue: { 
    fontSize: Typography.fontSize.xl, 
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary
  },
  nextClass: { 
    textAlign: 'center', 
    color: Colors.neutral[400], 
    marginTop: Spacing[10], 
    fontStyle: 'italic',
    fontSize: Typography.fontSize.sm
  }
});