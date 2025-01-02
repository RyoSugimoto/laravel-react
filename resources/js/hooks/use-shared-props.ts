import { usePage } from '@inertiajs/react';
import { SharedProps } from '@/@types';

const useSharedProps = () => {
    const { shared, ...props } = usePage<SharedProps>().props;

    return {
        ...shared,
        ...props,
    };
}

export default useSharedProps;
