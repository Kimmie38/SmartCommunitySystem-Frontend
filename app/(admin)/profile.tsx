import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "@/context/AppContext";

export default function AdminProfile() {
  const { userName, logout } = useApp();

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={["top"]}>
      <View className="px-5 pt-4">
        <Text className="font-display-bold text-2xl text-navy mb-5">
          Admin profile
        </Text>

        <View className="items-center mb-6">
          <View className="w-20 h-20 rounded-full bg-navy items-center justify-center mb-3">
            <Ionicons name="shield-checkmark" size={32} color="#F2A93B" />
          </View>
          <Text className="font-display text-[17px] text-ink">{userName}</Text>
          <Text className="font-body text-mist text-[13px]">Security personnel</Text>
        </View>

        <View className="bg-card border border-hairline rounded-2xl overflow-hidden mb-6">
          <View className="flex-row items-center gap-3 px-4 py-3.5 border-b border-hairline">
            <Ionicons name="people-outline" size={19} color="#14213D" />
            <Text className="font-body-medium text-ink text-[14px] flex-1">
              Response team
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#9A9CA5" />
          </View>
          <View className="flex-row items-center gap-3 px-4 py-3.5 border-b border-hairline">
            <Ionicons name="stats-chart-outline" size={19} color="#14213D" />
            <Text className="font-body-medium text-ink text-[14px] flex-1">
              Incident analytics
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#9A9CA5" />
          </View>
          <View className="flex-row items-center gap-3 px-4 py-3.5">
            <Ionicons name="settings-outline" size={19} color="#14213D" />
            <Text className="font-body-medium text-ink text-[14px] flex-1">
              System settings
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#9A9CA5" />
          </View>
        </View>

        <Pressable
          onPress={handleLogout}
          className="flex-row items-center justify-center gap-2 bg-coral-light rounded-2xl py-3.5"
        >
          <Ionicons name="log-out-outline" size={18} color="#D8492F" />
          <Text className="font-body-semibold text-coral text-[14px]">
            Log out
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
