import { Stack, Redirect } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from "../contexts/ThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../hooks/useTheme";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

function RootLayoutNav() {
  const { theme, themeMode } = useTheme();
  console.log("RootLayoutNav rendered", themeMode);

  return (
    <>
      <StatusBar style={themeMode === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" />
        <Redirect href="/(tabs)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  console.log("RootLayout rendered");

  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootLayoutNav />
        </GestureHandlerRootView>
      </ThemeProvider>
    </ConvexProvider>
  );
}
