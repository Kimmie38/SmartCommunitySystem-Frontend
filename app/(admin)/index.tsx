import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "@/context/AppContext";
import StatCard from "@/components/StatCard";
import IncidentCard from "@/components/IncidentCard";

export default function AdminDashboard() {
  const { userName, reports } = useApp();
  const active = reports.filter((r) => r.status === "Active").length;
  const responding = reports.filter((r) => r.status === "Responding").length;
  const resolved = reports.filter((r) => r.status === "Resolved").length;

  const urgent = reports
    .filter((r) => r.status !== "Resolved")
    .slice(0, 3);

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={["top"]}>
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-4 mb-5">
          <Text className="font-body text-mist text-[13px]">Admin dashboard</Text>
          <Text className="font-display-bold text-2xl text-navy">
            {userName}
          </Text>
        </View>

        <StatCard label="Awaiting response" value={active} icon="alert-circle-outline" accent="coral" />
        <StatCard label="Responding" value={responding} icon="pulse-outline" accent="amber" />
        <StatCard label="Resolved this week" value={resolved} icon="checkmark-done-outline" accent="teal" />

        <Text className="font-display text-[17px] text-navy mt-3 mb-3">
          Needs attention
        </Text>

        {urgent.length === 0 ? (
          <Text className="font-body text-mist">Nothing pending — all clear.</Text>
        ) : (
          urgent.map((r) => <IncidentCard key={r.id} report={r} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
