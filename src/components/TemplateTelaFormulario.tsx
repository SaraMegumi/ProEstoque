import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/src/constants/theme";

interface TemplateProps {
  children: React.ReactNode;
}

export default function TemplateTelaFormulario({ children }: TemplateProps) {
  return (
    
    <SafeAreaView style={styles.safe}>

      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
   
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled" 
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { 
    flex: 1, 
    backgroundColor: Colors.surface
  },
  flex:   { 
    flex: 1 
  },
  scroll: { 
    flexGrow: 1, 
    padding: 24 
  },
});