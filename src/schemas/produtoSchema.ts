import { z } from "zod";

export const produtoSchema = z.object({
  id: z.string().optional(),
  nome: z
    .string()
    .min(3, "O nome deve ter ao menos 3 caracteres")
    .max(80, "Nome muito longo"),
  categoria: z
    .string()
    .min(1, "Selecione uma categoria"),
  quantidade: z
    .number({ message: "Informe a quantidade" })  
    .int("Quantidade deve ser um número inteiro")
    .min(0, "Quantidade não pode ser negativa"),
  minimo: z
    .number({ message: "Informe a quantidade mínima" })  
    .int("Deve ser um número inteiro")
    .min(0, "Não pode ser negativa"),
  preco: z
    .number({ message: "Informe o preço" })  
    .min(0.01, "Preço deve ser maior que zero"),
   unidade: z.enum(["un", "kg", "cx", "L", "m"], {
    message: "Selecione uma unidade",
    }),
  descricao: z
    .string()
    .max(200, "Máximo 200 caracteres")
    .optional(),
});

export type ProdutoFormData = z.infer<typeof produtoSchema>;