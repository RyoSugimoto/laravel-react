import type { SharedProps } from '@/@types';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { useToast } from '@/hooks/use-toast';

export default () => {
    const { status } = usePage<SharedProps>().props;

    if (!status) {
        return;
    }

    const { toast } = useToast();

    useEffect(() => {
        if (status.message && !status.read) {
            toast({
                description: status.message,
            });
            // NOTE: ブラウザバック時に再度表示されないようにする。
            // REVIEW: トーストが消える前に高速で戻る進むを繰り返すと表示され続けてしまう。
            status.read = true;
        }
    }, [status]);
};
