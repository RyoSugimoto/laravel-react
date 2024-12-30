import { usePage } from '@inertiajs/react';
import { SharedProps } from '@/@types';

const useSharedProps = () => {
    const sharedProps = usePage<SharedProps>().props;

    return sharedProps;
}

export default useSharedProps;
