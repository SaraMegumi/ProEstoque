import { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import LogoProEstoque from "@/src/components/LogoProEstoque";
import { Colors, Typography, Spacing } from "@/src/constants/theme";

export default function CustomSplashScreen() {
  const barWidth = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    Animated.timing(barWidth, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inner, { opacity }]}>
        <LogoProEstoque size="lg" />
        <Text style={styles.appName}>ProEstoque</Text>
        <Text style={styles.tagline}>Gestão de estoque simplificada</Text>

        <View style={styles.barContainer}>
          <Animated.View
            style={[
              styles.barFill,
              {
                width: barWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>

        <Text style={styles.verificando}>Verificando sessão...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary[600],
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    alignItems: "center",
    gap: Spacing[3],
  },
  appName: {
    color: Colors.white,
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.black,
  },
  tagline: {
    color: Colors.primary[300],
    fontSize: Typography.fontSize.sm,
  },
  barContainer: {
    width: 200,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    marginTop: Spacing[6],
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
  verificando: {
    color: Colors.primary[300],
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing[2],
  },
});
