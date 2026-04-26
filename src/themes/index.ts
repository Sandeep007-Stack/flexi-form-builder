import type { FlexiTheme, ThemeName } from "../core/types";
import { bootstrapTheme } from "./bootstrap";
import { customTheme } from "./custom";
import { tailwindTheme } from "./tailwind";

export const themeMap: Record<ThemeName, FlexiTheme> = {
  tailwind: tailwindTheme,
  bootstrap: bootstrapTheme,
  custom: customTheme
};

export function getTheme(themeName: ThemeName = "tailwind"): FlexiTheme {
  return themeMap[themeName];
}

export { bootstrapTheme, customTheme, tailwindTheme };
