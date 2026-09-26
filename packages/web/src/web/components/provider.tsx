import { LanguageProvider } from "./language-provider";
import { ThemeProvider } from "./theme-provider";

interface ProviderProps {
  children: React.ReactNode;
}

// App-level providers — add theme/context providers here, wrapping children.
export function Provider({ children }: ProviderProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
