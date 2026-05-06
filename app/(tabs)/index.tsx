import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, AccessibilityInfo } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '@/src/constants/theme';
import { PRODUTOS_MOCK, getProdutosComEstoqueBaixo, getValorTotalEstoque, formatarPreco } from '@/src/data/mockData';

export default function Dashboard() {
  const alertas = getProdutosComEstoqueBaixo();
  const recentes = PRODUTOS_MOCK.slice(0, 10);

  const dataDeHoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const cardsResumo = [
    { id: '1', label: 'Produtos', value: PRODUTOS_MOCK.length, icon: 'cube', status: Colors.info },
    { id: '2', label: 'Alertas', value: alertas.length, icon: 'alert-circle', status: Colors.danger },
    { id: '3', label: 'Categorias', value: '8', icon: 'grid', status: { bg: '#F3F4F6', text: Colors.primary[600] } },
    { id: '4', label: 'Estoque', value: formatarPreco(getValorTotalEstoque()), icon: 'cash', status: Colors.success },
  ];

  const renderHeader = () => (
    <View>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerTitle}>Olá, João 👋</Text>
          <Text style={styles.date}>{dataDeHoje.charAt(0).toUpperCase() + dataDeHoje.slice(1)}</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={26} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryGrid}>
        {cardsResumo.map((card) => (
          <View key={card.id} style={[styles.summaryCard, { backgroundColor: card.status.bg }]}>
            <Ionicons name={card.icon as any} size={22} color={card.status.text} />
            <Text style={styles.cardValue}>{card.value}</Text>
            <Text style={styles.cardLabel}>{card.label}</Text>
          </View>
        ))}
      </View>

      {alertas.length > 0 && (
        <View style={styles.criticalAlert}>
          <View style={styles.alertHeader}>
            <Ionicons name="warning" size={18} color={Colors.danger.text} />
            <Text style={styles.alertTitle}>Estoque crítico ({alertas.length})</Text>
          </View>
          {alertas.slice(0, 2).map(item => (
            <View key={item.id} style={styles.alertRow}>
              <Text style={styles.alertName}>{item.nome}</Text>
              <Text style={styles.alertQty}>{item.quantidade} un</Text>
            </View>
          ))}
          <TouchableOpacity>
            <Text style={styles.viewAll}>Ver todos os alertas →</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={[styles.headerTitle, { fontSize: Typography.fontSize.lg, marginBottom: Spacing[3] }]}>
        Produtos recentes
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />
      
      <FlatList
        data={recentes}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const baixo = item.quantidade < 5;
          const status = baixo ? Colors.warning : Colors.success;

          return (
            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <View style={[styles.iconWrapper, { backgroundColor: status.bg }]}>
                  <Ionicons name="cube" size={20} color={status.text} />
                </View>
                <View>
                  <Text style={styles.productName}>{item.nome}</Text>
                  <Text style={styles.productStock}>{item.quantidade} unidades</Text>
                </View>
              </View>
              
              <View style={[styles.badge, { backgroundColor: status.bg }]}>
                <Text style={[styles.badgeText, { color: status.text }]}>
                  {baixo ? 'Baixo' : 'Normal'}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing[4],
    marginBottom: Spacing[5],
  },
  
  headerTitle: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  addButton: {
    width: 44, height: 44, borderRadius: Radius.full,
    backgroundColor: Colors.primary[600],
    justifyContent: 'center', alignItems: 'center',
    elevation: 4, shadowColor: Colors.primary[600],
    shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.35, shadowRadius: 6,
  },
  
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing[2],
  },
  summaryCard: {
    width: '48%',
    padding: Spacing[4],
    borderRadius: Radius.xl,
    marginBottom: Spacing[4],
  },
  cardValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginTop: Spacing[2],
  },
  cardLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  date:{
    fontSize: Typography.fontSize.lg, color: Colors.textSecondary, marginTop: 2

  },

  criticalAlert: {
    backgroundColor: Colors.danger.bg,
    padding: Spacing[4],
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.danger.border,
    marginBottom: Spacing[6],
  },
  alertHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginBottom: Spacing[3] 
  },
  alertTitle: { 
    color: Colors.danger.text, 
    fontWeight: Typography.fontWeight.bold, 
    fontSize: Typography.fontSize.sm
   },
  alertRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 4 
  },
  alertName: { 
    color: Colors.textSecondary, 
    fontSize: Typography.fontSize.sm 
  },
  alertQty: { 
    color: Colors.danger.text, 
    fontWeight: Typography.fontWeight.bold 
  },
  viewAll: { 
    textAlign: 'right', 
    color: Colors.primary[600], 
    fontWeight: 'bold', 
    fontSize: Typography.fontSize.xs, 
    marginTop: Spacing[2] 
  },

  listContent: { 
    paddingHorizontal: Spacing[5], 
    paddingBottom: Spacing[10] 
  },
  card: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing[4], paddingVertical: Spacing[3],
    borderRadius: Radius.xl, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center',
    marginBottom: Spacing[3], borderWidth: 1, borderColor: Colors.border,
  },
  cardInfo: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  iconWrapper: { 
    padding: Spacing[2], 
    borderRadius: Radius.md, 
    marginRight: Spacing[3] 
  },
  productName: { 
    fontWeight: Typography.fontWeight.semibold, 
    fontSize: Typography.fontSize.base, 
    color: Colors.textPrimary 
  },
  productStock: { 
    fontSize: Typography.fontSize.md, 
    color: Colors.textSecondary, 
    marginTop: 2 
  },
  badge: { 
    paddingHorizontal: Spacing[3], 
    paddingVertical: Spacing[1], 
    borderRadius: Radius.full 
  },
  badgeText: { 
    fontSize: Typography.fontSize.xs, 
    fontWeight: Typography.fontWeight.semibold 
  },
});

function setRefreshing(arg0: boolean) {
  throw new Error('Function not implemented.');
}
