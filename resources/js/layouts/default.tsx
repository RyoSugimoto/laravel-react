import type { PropsWithChildren } from "react";
import { ThemeProvider } from '@/components/theme-provider';
import LanguageSwitch from "@/components/LanguageSwitch";

type LayoutProps = PropsWithChildren<{}>;

export default ({ children }: LayoutProps) => {
    return <ThemeProvider
        defaultTheme="dark"
        storageKey="ui-theme"
    >
        <header>
            <LanguageSwitch />
        </header>
        <main>
            {children}
        </main>
        <footer>

        </footer>
    </ThemeProvider>;
}
