import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    useWindowDimensions,
    View
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

export default function EditorScreen() {
    const systemScheme = useColorScheme();
    const isDark = systemScheme === "dark";

    const theme = isDark ? themes.dark : themes.light;

    const { width } = useWindowDimensions();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: theme.background },
            ]}
        >
            <StatusBar style={isDark ? "light" : "dark"} />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.container}
            >

                {/* Header */}
                <ImageBackground
                    source={{
                        uri: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
                    }}
                    style={styles.header}
                    imageStyle={styles.headerImage}
                >
                    <View style={styles.overlay}>
                        <Text style={styles.headerTitle}>Edit Note</Text>
                    </View>
                </ImageBackground>

                {/* Buttons */}
                <View style={styles.buttonRow}>
                    <Pressable
                        style={[
                            styles.button,
                            { backgroundColor: theme.card },
                        ]}
                    >
                        <Text style={[styles.buttonText, { color: theme.text }]}>
                            Back
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.button,
                            { backgroundColor: theme.accent },
                        ]}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </Pressable>
                </View>

                {/* Inputs */}
                <View
                    style={[
                        styles.editorContainer,
                        {
                            width: "100%",
                            alignSelf: "center",
                        },
                    ]}
                >
                    <TextInput
                        placeholder="Note Title"
                        placeholderTextColor={theme.subtext}
                        value={title}
                        onChangeText={setTitle}
                        style={[
                            styles.titleInput,
                            {
                                color: theme.text,
                            },
                        ]}
                    />

                    <TextInput
                        multiline
                        textAlignVertical="top"
                        placeholder="Write your note here..."
                        placeholderTextColor={theme.subtext}
                        value={content}
                        onChangeText={setContent}
                        style={[
                            styles.contentInput,
                            { color: theme.text },
                        ]}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        height: 220,
        justifyContent: "flex-end",
    },

    headerImage: {
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },

    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        padding: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },

    headerTitle: {
        color: "#FFF",
        fontSize: 30,
        fontWeight: "700",
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginTop: 20,
        marginBottom: 16,
    },

    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 14,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "600",
    },

    saveButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },

    editorContainer: {
        flex: 1,
        marginHorizontal: 16,
        borderRadius: 2,
        borderWidth: 1,
        padding: 18,
    },

    titleInput: {
        fontSize: 24,
        fontWeight: "700",
        paddingBottom: 12,
        borderBottomWidth: 1,
        marginBottom: 16,
    },

    contentInput: {
        flex: 1,
        fontSize: 16,
        lineHeight: 26,
    },
});