import type { PropsWithChildren } from "react";
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from "@/components/mode-toggle";
import LanguageSwitch from "@/components/LanguageSwitch";

type LayoutProps = PropsWithChildren<{}>;

export default ({ children }: LayoutProps) => {
    return <ThemeProvider
        defaultTheme="dark"
        storageKey="ui-theme"
    >
        <header>
            <ModeToggle />
            <LanguageSwitch />
        </header>
        <main>
            {children}
        </main>
        <footer>

        </footer>
    </ThemeProvider>;
}
