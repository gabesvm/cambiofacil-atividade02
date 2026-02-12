import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5B2EFF",
    secondary: "#2A9D8F",
    tertiary: "#F4A261",
    surface: "#FFFFFF",
    background: "#F6F7FB",
  },
  roundness: 14,
};
