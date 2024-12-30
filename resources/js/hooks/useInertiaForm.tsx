import type { VisitOptions } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';

export type useInertiaFormProps = {
    fields: Record<string, string>;
    action: string;
    method?: 'get' | 'post' | 'put' | 'delete';
    options?: VisitOptions;
};

type FieldTypes = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function useInertiaForm({
    fields,
    action,
    method = 'post',
    options = {}
}: useInertiaFormProps) {

    const { setData, setError, ...props } = useForm(fields);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        props[method](action, options);
    }

    function handleChange(event: React.ChangeEvent<FieldTypes>) {
        const name = event.target.name;
        const value = event.target.value;
        setError(name, '');
        setData(name, value);
    }

    return {
        handleSubmit,
        handleChange,
        setData,
        ...props,
    }
}

export default useInertiaForm;
