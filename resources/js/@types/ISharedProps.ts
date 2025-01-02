import type { PageProps } from "@inertiajs/core";
import type { Status } from '@/@types';
import type { User } from '@/@types';
import type { TranslationData } from '@/hooks/useTranslation';

export default interface SharedProps extends PageProps {
    shared: {
        status: Status | null;
        translationData: TranslationData | null;
        translationLocale: string | null;
        user: User | null;
    };
};
