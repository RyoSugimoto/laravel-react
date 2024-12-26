import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import Cookies from 'js-cookie';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
        return pages[`./Pages/${name}.tsx`]
    },
    setup({ el, App, props }) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        Cookies.set('timezone', timezone, {
            expires: 30,
        });
        createRoot(el).render(<App {...props} />)
    },
})
