import type { PropsWithChildren } from 'react';

type MainProps = PropsWithChildren<{}>;

export default ({ children }: MainProps) => {
    return <div className="grid">
        <header className="py-2">
            <p className="font-bold text-center text-sm">Inertia App</p>
        </header>
        <main
            className="container mx-auto px-4"
        >{children}</main>
        <footer>

        </footer>
    </div>;
};
