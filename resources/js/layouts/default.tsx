import type { PropsWithChildren } from "react";
import LanguageSwitch from "@/components/LanguageSwitch";

type LayoutProps = PropsWithChildren<{}>;

export default ({ children }: LayoutProps) => {
    return <div>
        <header>
            <LanguageSwitch />
        </header>
        <main>
            {children}
        </main>
        <footer>

        </footer>
    </div>;
}
