import type { PageProps } from '@inertiajs/core';
import type { Status } from '@/@types';
import type { TranslationData } from '@/hooks/use-translation';

type SharedProps = {
    shared: {
        status: Status | null;
        translationData: TranslationData | null;
        translationLocale: string | null;
    };
} & PageProps;

export default SharedProps;
