import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "@/context/AppContext";

const FIELDS = [
  { key: "name", label: "Full name", placeholder: "John Doe" },
  { key: "email", label: "Email address", placeholder: "you@example.com" },
  { key: "phone", label: "Phone number", placeholder: "+234 800 000 0000" },
  { key: "estate", label: "Community / estate", placeholder: "Lekki Phase 1" },
  { key: "password", label: "Password", placeholder: "Create a strong password", secure: true },
  { key: "confirm", label: "Confirm password", placeholder: "Re-enter your password", secure: true },
];

export default function Register() {
  const { login } = useApp();
  const [values, setValues] = useState<Record<string, string>>({});

  const handleRegister = () => {
    login("resident", values.name || "John Doe");
    router.replace("/(resident)");
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          className="px-6"
        >
          <Pressable
            onPress={() => router.back()}
            className="mt-4 mb-4 w-9 h-9 items-center justify-center"
          >
            <Ionicons name="chevron-back" size={22} color="#1B1B1D" />
          </Pressable>

          <Text className="font-display-bold text-2xl text-navy mb-1">
            Create account
          </Text>
          <Text className="font-body text-mist text-[14px] mb-6">
            Join SafeGuard to report and stay informed
          </Text>

          {FIELDS.map((f) => (
            <View key={f.key} className="mb-4">
              <Text className="font-body-medium text-ink text-[13px] mb-1.5">
                {f.label}
              </Text>
              <TextInput
                value={values[f.key] ?? ""}
                onChangeText={(t) =>
                  setValues((prev) => ({ ...prev, [f.key]: t }))
                }
                placeholder={f.placeholder}
                placeholderTextColor="#9A9CA5"
                secureTextEntry={f.secure}
                autoCapitalize="none"
                className="bg-card border border-hairline rounded-xl px-4 py-3.5 font-body text-ink"
              />
            </View>
          ))}

          <Pressable
            onPress={handleRegister}
            className="bg-navy rounded-2xl py-4 items-center mt-2"
          >
            <Text className="font-body-semibold text-white text-[15px]">
              Register
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
