import type { PropsWithChildren } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster'
import DisplayOptions from '@/components/DisplayOptions';

type LayoutProps = PropsWithChildren<{}>;

export default ({ children }: LayoutProps) => {
    return <ThemeProvider
        defaultTheme="dark"
        storageKey="ui-theme"
    >
        <div
            className="grid gap-8 relative"
        >
            <header
                className="sticky inset-0"
            >
                <div
                    className="flex items-center p-2"
                >
                    <div className="absolute right-2 top-2">
                        <DisplayOptions />
                    </div>
                </div>
            </header>
            <main>
                {children}
                <Toaster />
            </main>
            <footer>

            </footer>
        </div>
    </ThemeProvider>;
}
