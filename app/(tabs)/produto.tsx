import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView, StatusBar, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '@/src/constants/theme';
import { CATEGORIAS_MOCK, Produto, PRODUTOS_MOCK } from '@/src/data/mockData';
import React from 'react';

const FILTROS = ['Todos', 'Bebidas', 'Alimentos', 'Limpeza', 'Papelaria', 'Eletrônicos'];

export default function Produtos() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [viewMode, setViewMode] = useState<'lista' | 'grade' | 'categoria'>('lista');

  const filteredData = useMemo(() => {
    return PRODUTOS_MOCK.filter((produto) => {
      const matchesSearch = produto.nome.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === 'Todos' || 
        CATEGORIAS_MOCK.find(cat => cat.id === produto.categoriaId)?.nome === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const sections = useMemo(() => {
    if (viewMode !== 'categoria') return [];
    return CATEGORIAS_MOCK.map(cat => ({
      title: cat.nome,
      data: filteredData.filter(p => p.categoriaId === cat.id)
    })).filter(section => section.data.length > 0);
  }, [filteredData, viewMode]);

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-outline" size={60} color={Colors.textSecondary} />
      <Text style={styles.emptyText}>Ops! Nenhum produto encontrado.</Text>
      <Text style={styles.emptySubtext}>Tente mudar o nome na busca ou a categoria.</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Produto }) => {
    const semEstoque = item.quantidade === 0;
    const baixo = item.quantidade > 0 && item.quantidade < 5;
    const status = semEstoque ? Colors.danger : baixo ? Colors.warning : Colors.success;
    const statusLabel = semEstoque ? 'Sem estoque' : baixo ? 'Baixo' : 'Normal';

    if (viewMode === 'grade') {
      return (
        <View style={styles.cardGrade}>
          <View style={[styles.iconWrapperGrade, { backgroundColor: status.bg }]}>
            <Ionicons name="cube" size={28} color={status.text} />
          </View>
          <Text style={styles.productNameGrade} numberOfLines={1}>{item.nome}</Text>
          <Text style={styles.productStock}>{item.quantidade} {item.unidade ?? 'un'}</Text>
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <View style={[styles.iconWrapper, { backgroundColor: status.bg }]}>
            <Ionicons name="cube" size={20} color={status.text} />
          </View>
          <View>
            <Text style={styles.productName}>{item.nome}</Text>
            <Text style={styles.productStock}>{item.quantidade} {item.unidade ?? 'un'}</Text>
          </View>
        </View>
        <View style={[styles.badge, { backgroundColor: status.bg }]}>
          <Text style={[styles.badgeText, { color: status.text }]}>{statusLabel}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Produtos</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity 
            style={styles.viewToggleButton} 
            onPress={() => {
              const modes: ('lista' | 'grade' | 'categoria')[] = ['lista', 'grade', 'categoria'];
              const nextIndex = (modes.indexOf(viewMode) + 1) % modes.length;
              setViewMode(modes[nextIndex]);
            }}
          >
            <Ionicons 
              name={viewMode === 'lista' ? 'grid-outline' : viewMode === 'grade' ? 'layers-outline' : 'list-outline'} 
              size={22} 
              color={Colors.primary[600]} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={26} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color={Colors.textSecondary} />
        <TextInput
          placeholder="Buscar produto..."
          placeholderTextColor={Colors.textSecondary}
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {FILTROS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.chip, activeFilter === f && styles.chipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {viewMode === 'categoria' ? (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          stickySectionHeadersEnabled={true}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={styles.listContent}
          renderSectionHeader={({ section: { title, data } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{title} ({data.length})</Text>
            </View>
          )}
        />
      ) : (
        <FlatList
          key={viewMode}
          data={filteredData}
          numColumns={viewMode === 'grade' ? 2 : 1}
          columnWrapperStyle={viewMode === 'grade' ? { justifyContent: 'space-between' } : null}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyComponent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacing[5],
    marginTop: Spacing[4],
    marginBottom: Spacing[3],
  },
  headerTitle: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  viewToggleButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.primary[600],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: Spacing[5],
    marginBottom: Spacing[3],
    paddingHorizontal: Spacing[4],
    borderRadius: Radius.lg,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  input: {
    flex: 1,
    marginLeft: Spacing[2],
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
  },
  filterWrapper: {
    height: 50,
    marginBottom: Spacing[2],
  },
  filterContent: {
    paddingHorizontal: Spacing[5],
    alignItems: 'center',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: Colors.primary[600],
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  chipTextActive: {
    color: Colors.white,
  },
  listContent: {
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[10],
  },
  card: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    borderRadius: Radius.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[3],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardGrade: {
    backgroundColor: Colors.white,
    width: '48%',
    padding: Spacing[4],
    borderRadius: Radius.xl,
    alignItems: 'center',
    marginBottom: Spacing[4],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconWrapperGrade: {
    width: 50,
    height: 50,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productNameGrade: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    padding: Spacing[2],
    borderRadius: Radius.md,
    marginRight: Spacing[3],
  },
  productName: {
    fontWeight: Typography.fontWeight.semibold,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
  productStock: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[1],
    borderRadius: Radius.full,
  },
  badgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  emptyText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: Spacing[4],
  },
  emptySubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing[2],
  },
  sectionHeader: {
    backgroundColor: Colors.background,
    paddingVertical: 8,
    marginTop: 12,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary[600],
    textTransform: 'uppercase',
  },
});