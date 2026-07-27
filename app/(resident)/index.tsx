import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "@/context/AppContext";
import StatCard from "@/components/StatCard";
import IncidentCard from "@/components/IncidentCard";

export default function Home() {
  const { userName, reports } = useApp();
  const active = reports.filter((r) => r.status === "Active").length;
  const resolved = reports.filter((r) => r.status === "Resolved").length;

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={["top"]}>
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-4 mb-5">
          <Text className="font-body text-mist text-[13px]">Welcome back</Text>
          <Text className="font-display-bold text-2xl text-navy">
            {userName}
          </Text>
        </View>

        <Pressable
          onPress={() => router.push("/(resident)/feed")}
          className="flex-row items-center gap-2 bg-card border border-hairline rounded-2xl px-4 py-3.5 mb-5"
        >
          <Ionicons name="search" size={18} color="#9A9CA5" />
          <Text className="font-body text-mist text-[14px]">
            Search incidents, alerts...
          </Text>
        </Pressable>

        <StatCard label="Today's reports" value={reports.length} icon="document-text-outline" accent="amber" />
        <StatCard label="Active emergencies" value={active} icon="trending-up-outline" accent="coral" />
        <StatCard label="Resolved cases" value={resolved} icon="checkmark-circle-outline" accent="teal" />

        <View className="flex-row items-center justify-between mt-3 mb-3">
          <Text className="font-display text-[17px] text-navy">
            Recent activity
          </Text>
          <Pressable onPress={() => router.push("/(resident)/feed")}>
            <Text className="font-body-medium text-navy text-[13px]">
              View all
            </Text>
          </Pressable>
        </View>

        {reports.slice(0, 3).map((r) => (
          <IncidentCard key={r.id} report={r} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
