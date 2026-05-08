import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';
import { Colors, Typography, Spacing, Radius } from '@/src/constants/theme';

function MenuItem({
  icone,
  label,
  onPress,
}: {
  icone: string;
  label: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuIcone}>{icone}</Text>
      <Text style={styles.menuLabel}>{label}</Text>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );
}

export default function Configuracoes() {
  const { user, logout } = useAuth();
  const inicial = user?.nome?.charAt(0).toUpperCase() ?? 'U';

  function handleLogout() {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair? Você precisará fazer login novamente.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => { await logout(); },
        },
      ]
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Configurações</Text>

      <View style={styles.perfilCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{inicial}</Text>
        </View>
        <View style={styles.perfilInfo}>
          <Text style={styles.perfilNome}>{user?.nome ?? '—'}</Text>
          <Text style={styles.perfilEmail}>{user?.email ?? '—'}</Text>
        </View>
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Preferências</Text>
        <View style={styles.menuGrupo}>
          <MenuItem icone="🔔" label="Notificações" />
          <MenuItem icone="🎨" label="Aparência" />
          <MenuItem icone="🌐" label="Idioma" />
        </View>
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Suporte</Text>
        <View style={styles.menuGrupo}>
          <MenuItem icone="❓" label="Ajuda e FAQ" />
          <MenuItem icone="📋" label="Termos de uso" />
          <MenuItem icone="🔒" label="Privacidade" />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>

      <Text style={styles.versao}>ProEstoque v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingBottom: Spacing[10] },
  titulo: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.black,
    color: Colors.textPrimary,
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[10],
    paddingBottom: Spacing[5],
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  perfilCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing[4],
    marginTop: Spacing[5],
    borderRadius: Radius.xl,
    padding: Spacing[4],
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing[3],
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.black,
  },
  perfilInfo: { flex: 1 },
  perfilNome: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  perfilEmail: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  secao: { marginTop: Spacing[6], paddingHorizontal: Spacing[4] },
  secaoTitulo: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral[400],
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: Spacing[2],
    marginLeft: Spacing[1],
  },
  menuGrupo: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  menuIcone: { fontSize: Typography.fontSize.lg, marginRight: Spacing[3] },
  menuLabel: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },
  menuArrow: { fontSize: Typography.fontSize.xl, color: Colors.neutral[200] },
  logoutBtn: {
    marginHorizontal: Spacing[4],
    marginTop: Spacing[8],
    backgroundColor: Colors.danger.bg,
    borderRadius: Radius.lg,
    paddingVertical: Spacing[4],
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.danger.border,
  },
  logoutText: {
    color: Colors.danger.text,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  versao: {
    textAlign: 'center',
    color: Colors.neutral[200],
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing[6],
  },
});