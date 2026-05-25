import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Typography } from '@/src/constants/theme';
import { produtoSchema, ProdutoFormData } from '@/src/schemas/produtoSchema';
import { useProducts } from '@/src/contexts/ProductsContext';

export default function EditarProduto() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { products, updateProduct, deleteProduct } = useProducts();

  const produtoOriginal = products.find((p: any) => p.id === id);

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),

    
  });

  useEffect(() => {
    if (produtoOriginal) {
      reset(produtoOriginal);
    }
  }, [produtoOriginal]);

  const onSubmit: SubmitHandler<ProdutoFormData> = (data) => {
    updateProduct({ ...data, id: String(id) });
    router.back();
  };

  const confirmarExclusao = () => {
    Alert.alert(
      "Excluir Produto",
      "Tem certeza que deseja remover este item?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: () => {
            deleteProduct(String(id));
            router.back();
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome do Produto *</Text>
          <Controller control={control} name="nome"
            render={({ field: { onChange, value } }) => (
              <View style={[styles.inputWrapper, errors.nome && styles.inputError]}>
                <Ionicons name="cube-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
                <TextInput style={styles.input} onChangeText={onChange} value={value} />
              </View>
            )}
          />
          {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoria *</Text>
          <Controller control={control} name="categoria"
            render={({ field: { onChange, value } }) => (
              <View style={[styles.inputWrapper, errors.categoria && styles.inputError]}>
                <Ionicons name="pricetag-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
                <TextInput style={styles.input} onChangeText={onChange} value={value} />
              </View>
            )}
          />
          {errors.categoria && <Text style={styles.errorText}>{errors.categoria.message}</Text>}
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Qtd em estoque *</Text>
            <Controller control={control} name="quantidade"
              render={({ field: { onChange, value } }) => (
                <View style={[styles.inputWrapper, errors.quantidade && styles.inputError]}>
                  <TextInput keyboardType="numeric" style={styles.input}
                    onChangeText={(text) => onChange(text === '' ? 0 : Number(text))}
                    value={value?.toString()} />
                </View>
              )}
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Qtd mínima *</Text>
            <Controller control={control} name="minimo"
              render={({ field: { onChange, value } }) => (
                <View style={[styles.inputWrapper, errors.minimo && styles.inputError]}>
                  <TextInput keyboardType="numeric" style={styles.input}
                    onChangeText={(text) => onChange(text === '' ? 0 : Number(text))}
                    value={value?.toString()} />
                </View>
              )}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Unidade de Medida *</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
            {(['un', 'kg', 'cx', 'L', 'm'] as const).map((item) => (
              <Controller
                key={item}
                control={control}
                name="unidade"
                render={({ field: { onChange, value } }) => (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      height: 45,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: Radius.md,
                      borderWidth: 1,
                      borderColor: value === item ? Colors.primary[600] : Colors.border,
                      backgroundColor: value === item ? Colors.primary[600] : Colors.white,
                    }}
                    onPress={() => onChange(item)}
                  >
                    <Text style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      color: value === item ? Colors.white : Colors.textSecondary,
                    }}>
                      {item.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ))}
          </View>
          {errors.unidade && <Text style={styles.errorText}>{errors.unidade.message}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Preço de venda (R$) *</Text>
          <Controller control={control} name="preco"
            render={({ field: { onChange, value } }) => (
              <View style={[styles.inputWrapper, errors.preco && styles.inputError]}>
                <Ionicons name="cash-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
                <TextInput keyboardType="numeric" style={styles.input}
                  onChangeText={(text) => onChange(text === '' ? 0 : Number(text))}
                  value={value?.toString()} />
              </View>
            )}
          />
          {errors.preco && <Text style={styles.errorText}>{errors.preco.message}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Observação (opcional)</Text>
          <Controller control={control} name="descricao"
            render={({ field: { onChange, value } }) => (
              <View style={[styles.inputWrapper, { height: 100, alignItems: 'flex-start', paddingTop: 10 }]}>
                <TextInput multiline numberOfLines={4} style={[styles.input, { textAlignVertical: 'top' }]}
                  onChangeText={onChange} value={value} />
              </View>
            )}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
          <Text style={styles.saveButtonText}>{isSubmitting ? 'Salvando...' : 'Salvar Alterações'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={confirmarExclusao}>
          <Ionicons name="trash-outline" size={20} color={Colors.danger.text} />
          <Text style={styles.deleteButtonText}>Excluir Produto</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing[5], paddingVertical: Spacing[4] },
  backButton: { padding: 8, borderRadius: Radius.md, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border },
  headerTitle: { fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary },
  formContainer: { padding: Spacing[5] },
  inputGroup: { marginBottom: Spacing[4] },
  label: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary, marginBottom: 8, marginLeft: 4 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: Radius.lg, height: 52, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: 15 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: Colors.textPrimary },
  inputError: { borderColor: Colors.danger.text },
  errorText: { color: Colors.danger.text, fontSize: 12, marginTop: 4, marginLeft: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  saveButton: { backgroundColor: Colors.primary[600], height: 56, borderRadius: Radius.xl, justifyContent: 'center', alignItems: 'center', marginTop: Spacing[6], elevation: 4, shadowColor: Colors.primary[600], shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  saveButtonText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
  deleteButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 25, gap: 8, paddingBottom: 20 },
  deleteButtonText: { color: Colors.danger.text, fontWeight: '600', fontSize: 15 },
});