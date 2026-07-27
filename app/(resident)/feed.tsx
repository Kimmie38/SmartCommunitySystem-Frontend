import { useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "@/context/AppContext";
import { CATEGORIES, SEVERITY_ORDER } from "@/constants/theme";
import FilterPills from "@/components/FilterPills";
import IncidentCard from "@/components/IncidentCard";

const SORTS = ["Latest", "Nearest", "Most severe"] as const;

export default function Feed() {
  const { reports } = useApp();
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Latest");

  const filtered = useMemo(() => {
    let list =
      category === "All"
        ? reports
        : reports.filter((r) => r.category === category);

    if (sort === "Most severe") {
      list = [...list].sort(
        (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]
      );
    }
    // "Latest" keeps seed order (already most-recent-first);
    // "Nearest" has no real location data to sort by in this mock, so it mirrors Latest.
    return list;
  }, [reports, category, sort]);

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={["top"]}>
      <View className="px-5 pt-4">
        <Text className="font-display-bold text-2xl text-navy mb-0.5">
          Emergency feed
        </Text>
        <Text className="font-body text-mist text-[13px] mb-4">
          Real-time emergency reports
        </Text>

        <FilterPills options={CATEGORIES} selected={category} onSelect={setCategory} />

        <View className="flex-row items-center gap-2 mb-4">
          <Text className="font-body text-mist text-[12px] mr-1">Sort:</Text>
          {SORTS.map((s) => (
            <Pressable
              key={s}
              onPress={() => setSort(s)}
              className={`px-3 py-1.5 rounded-lg ${
                sort === s ? "bg-navy" : "bg-card border border-hairline"
              }`}
            >
              <Text
                className={`font-body-medium text-xs ${
                  sort === s ? "text-white" : "text-mist"
                }`}
              >
                {s}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <Text className="font-body text-mist text-center mt-10">
            No reports in this category yet.
          </Text>
        ) : (
          filtered.map((r) => <IncidentCard key={r.id} report={r} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
