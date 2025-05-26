import { Stack } from "expo-router";
import { I18nextProvider } from 'react-i18next';
import "../services/i18n"
import i18n from "../services/i18n"

export default function RootLayout() {
  return (
  <I18nextProvider i18n={i18n}>
    <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  </Stack>
  </I18nextProvider>
  );
}
