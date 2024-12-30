import type { PageProps } from "@inertiajs/core";
import type { Status } from '@/@types';
import type { User } from '@/@types';
import type { TranslationProps } from '@/hooks/useTranslation';

export default interface SharedProps extends PageProps {
    status: Status;
    translation: TranslationProps;
    user: User;
};
