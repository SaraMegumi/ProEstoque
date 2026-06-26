import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Radius, Spacing, Typography } from "@/src/constants/theme";
import { produtoSchema, ProdutoFormData } from "@/src/schemas/produtoSchema";
import { useProducts } from "@/src/contexts/ProductsContext";
import { useCategorias } from "@/src/hooks/useCategorias";

export default function EditarProduto() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { products, updateProduct, deleteProduct } = useProducts();
  const { categorias } = useCategorias();

  const produtoOriginal = products.find((p) => p.id === id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
  });

  useEffect(() => {
    if (produtoOriginal) {
      reset({
        nome: produtoOriginal.nome,
        categoriaId: produtoOriginal.categoriaId,
        quantidade: produtoOriginal.quantidade,
        quantidadeMinima: produtoOriginal.quantidadeMinima,
        preco: produtoOriginal.preco,
        unidade: produtoOriginal.unidade as any,
        observacao: produtoOriginal.descricao ?? "",
      });
    }
  }, [produtoOriginal]);

  const onSubmit: SubmitHandler<ProdutoFormData> = async (data) => {
    try {
      await updateProduct(String(id), data);
      router.back();
    } catch (err: any) {
      const mensagem =
        err?.response?.data?.erro ?? "Não foi possível salvar as alterações.";
      Alert.alert("Erro", mensagem);
    }
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
          onPress: async () => {
            try {
              await deleteProduct(String(id));
              router.back();
            } catch (err: any) {
              const mensagem =
                err?.response?.data?.erro ??
                "Não foi possível excluir o produto.";
              Alert.alert("Erro", mensagem);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome do Produto *</Text>
          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, value } }) => (
              <View
                style={[styles.inputWrapper, errors.nome && styles.inputError]}
              >
                <Ionicons
                  name="cube-outline"
                  size={20}
                  color={Colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
          />
          {errors.nome && (
            <Text style={styles.errorText}>{errors.nome.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoria *</Text>
          <Controller
            control={control}
            name="categoriaId"
            render={({ field: { onChange, value } }) => (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {categorias.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[styles.chip, value === cat.id && styles.chipActive]}
                    onPress={() => onChange(cat.id)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        value === cat.id && styles.chipTextActive,
                      ]}
                    >
                      {cat.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          />
          {errors.categoriaId && (
            <Text style={styles.errorText}>{errors.categoriaId.message}</Text>
          )}
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Qtd em estoque *</Text>
            <Controller
              control={control}
              name="quantidade"
              render={({ field: { onChange, value } }) => (
                <View
                  style={[
                    styles.inputWrapper,
                    errors.quantidade && styles.inputError,
                  ]}
                >
                  <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    onChangeText={(text) =>
                      onChange(text === "" ? undefined : Number(text))
                    }
                    value={value === undefined ? "" : value.toString()}
                  />
                </View>
              )}
            />
            {errors.quantidade && (
              <Text style={styles.errorText}>{errors.quantidade.message}</Text>
            )}
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Qtd mínima *</Text>
            <Controller
              control={control}
              name="quantidadeMinima"
              render={({ field: { onChange, value } }) => (
                <View
                  style={[
                    styles.inputWrapper,
                    errors.quantidadeMinima && styles.inputError,
                  ]}
                >
                  <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    onChangeText={(text) =>
                      onChange(text === "" ? undefined : Number(text))
                    }
                    value={value === undefined ? "" : value.toString()}
                  />
                </View>
              )}
            />
            {errors.quantidadeMinima && (
              <Text style={styles.errorText}>
                {errors.quantidadeMinima.message}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Unidade de Medida *</Text>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
            {(["un", "kg", "cx", "L", "m"] as const).map((item) => (
              <Controller
                key={item}
                control={control}
                name="unidade"
                render={({ field: { onChange, value } }) => (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      height: 45,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: Radius.md,
                      borderWidth: 1,
                      borderColor:
                        value === item ? Colors.primary[600] : Colors.border,
                      backgroundColor:
                        value === item ? Colors.primary[600] : Colors.white,
                    }}
                    onPress={() => onChange(item)}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        color:
                          value === item ? Colors.white : Colors.textSecondary,
                      }}
                    >
                      {item.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Preço de venda (R$) *</Text>
          <Controller
            control={control}
            name="preco"
            render={({ field: { onChange, value } }) => (
              <View
                style={[styles.inputWrapper, errors.preco && styles.inputError]}
              >
                <Ionicons
                  name="cash-outline"
                  size={20}
                  color={Colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  onChangeText={(text) =>
                    onChange(text === "" ? undefined : Number(text))
                  }
                  value={value === undefined ? "" : value.toString()}
                />
              </View>
            )}
          />
          {errors.preco && (
            <Text style={styles.errorText}>{errors.preco.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Observação (opcional)</Text>
          <Controller
            control={control}
            name="observacao"
            render={({ field: { onChange, value } }) => (
              <View
                style={[
                  styles.inputWrapper,
                  { height: 100, alignItems: "flex-start", paddingTop: 10 },
                ]}
              >
                <TextInput
                  multiline
                  numberOfLines={4}
                  style={[styles.input, { textAlignVertical: "top" }]}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text style={styles.saveButtonText}>
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={confirmarExclusao}
        >
          <Ionicons name="trash-outline" size={20} color={Colors.danger.text} />
          <Text style={styles.deleteButtonText}>Excluir Produto</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  formContainer: { padding: Spacing[5] },
  inputGroup: { marginBottom: Spacing[4] },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    height: 52,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 15,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: Colors.textPrimary },
  inputError: { borderColor: Colors.danger.text },
  errorText: {
    color: Colors.danger.text,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Radius.full,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.primary[600],
    borderColor: Colors.primary[600],
  },
  chipText: { fontSize: 14, fontWeight: "500", color: "#6B7280" },
  chipTextActive: { color: Colors.white, fontWeight: "600" },
  saveButton: {
    backgroundColor: Colors.primary[600],
    height: 56,
    borderRadius: Radius.xl,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing[6],
    elevation: 4,
    shadowColor: Colors.primary[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  saveButtonText: { color: Colors.white, fontSize: 16, fontWeight: "bold" },
  deleteButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    gap: 8,
    paddingBottom: 20,
  },
  deleteButtonText: {
    color: Colors.danger.text,
    fontWeight: "600",
    fontSize: 15,
  },
});
