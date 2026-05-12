import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const themes = {
  light: {
    background: "#FBFBFE", // bg
    card: "#FFFFFF",
    text: "#050316", // text
    subtext: "#6E6B8F",
    accent: "#443DFF", // accent
    border: "#DDDBFF", // secondary
  },

  dark: {
    background: "#010104", // bg
    card: "#020024", // secondary
    text: "#EBE9FC", // text
    subtext: "#AAA7D1",
    accent: "#0600C2", // accent
    border: "#3A31D8", // primary
  },
};

const notes = [
  {
    id: "1",
    title: "Note 1",
    content: "Note 1, Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "May 01, 2026",
  },
  {
    id: "2",
    title: "Note 2",
    content: "Note 2, Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "May 02, 2026",
  },
  {
    id: "3",
    title: "Note 3",
    content: "Note 3, Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "May 03, 2026",
  },
];

export default function HomeScreen() {
  const systemScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const [manualDark, setManualDark] = useState<boolean | null>(null);
  const [search, setSearch] = useState("");

  const isDark =
    manualDark !== null ? manualDark : systemScheme === "dark";

  const theme = isDark ? themes.dark : themes.light;

  const isTablet = width > 768;

  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.heading, { color: theme.text }]}>
            My Notes
          </Text>
          <Text style={[styles.subHeading, { color: theme.subtext }]}>
            {filteredNotes.length} notes available
          </Text>
        </View>

        <Switch
          value={isDark}
          onValueChange={setManualDark}
          trackColor={{ false: "#DDD", true: theme.accent }}
          thumbColor="#FFF"
        />
      </View>

      {/* Search */}
      <TextInput
        placeholder="Search notes..."
        placeholderTextColor={theme.subtext}
        value={search}
        onChangeText={setSearch}
        style={[
          styles.searchInput,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
      />

      {/* Notes List */}
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        numColumns={isTablet ? 2 : 1}
        columnWrapperStyle={
          isTablet ? styles.columnWrapper : undefined
        }
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              StyleSheet.compose(
                styles.noteCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                }
              ),
              pressed && { opacity: 0.8 },
            ]}
          >
            <Text style={[styles.noteTitle, { color: theme.text }]}>
              {item.title}
            </Text>

            <Text
              numberOfLines={2}
              style={[styles.noteContent, { color: theme.subtext }]}
            >
              {item.content}
            </Text>

            <Text style={[styles.noteDate, { color: theme.accent }]}>
              {item.date}
            </Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
  },

  subHeading: {
    fontSize: 14,
    marginTop: 4,
  },

  searchInput: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 20,
  },

  noteCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },

  columnWrapper: {
    gap: 16,
  },

  noteTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  noteContent: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },

  noteDate: {
    fontSize: 13,
    fontWeight: "600",
  },
});