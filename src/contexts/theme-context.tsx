import { createContext } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const defaultThemeContext: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export default ThemeContext;
export type { ThemeContextType };
