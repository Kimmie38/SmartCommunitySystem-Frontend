import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp, Report } from "@/context/AppContext";
import StatusBadge from "@/components/StatusBadge";
import FilterPills from "@/components/FilterPills";

const STATUS_FILTERS = ["All", "Active", "Responding", "Resolved"] as const;
const NEXT_STATUS: Record<Report["status"], Report["status"]> = {
  Active: "Responding",
  Responding: "Resolved",
  Resolved: "Active",
};

export default function ManageReports() {
  const { reports, updateReportStatus } = useApp();
  const [filter, setFilter] = useState<(typeof STATUS_FILTERS)[number]>("All");

  const filtered =
    filter === "All" ? reports : reports.filter((r) => r.status === filter);

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={["top"]}>
      <View className="px-5 pt-4">
        <Text className="font-display-bold text-2xl text-navy mb-0.5">
          Manage reports
        </Text>
        <Text className="font-body text-mist text-[13px] mb-4">
          Update case status as your team responds
        </Text>
        <FilterPills options={STATUS_FILTERS} selected={filter} onSelect={setFilter} />
      </View>

      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((r) => (
          <View
            key={r.id}
            className="bg-card border border-hairline rounded-2xl p-4 mb-3"
          >
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-body-medium text-xs text-mist">{r.id}</Text>
              <StatusBadge status={r.status} />
            </View>
            <Text className="font-display text-[15px] text-ink mb-1">
              {r.title}
            </Text>
            <Text className="font-body text-[13px] text-mist mb-3" numberOfLines={2}>
              {r.description}
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="font-body text-xs text-mist">
                {r.location} • {r.timeAgo}
              </Text>
              <Pressable
                onPress={() => updateReportStatus(r.id, NEXT_STATUS[r.status])}
                className="bg-navy px-3.5 py-2 rounded-xl"
              >
                <Text className="font-body-semibold text-white text-xs">
                  Mark as {NEXT_STATUS[r.status]}
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
