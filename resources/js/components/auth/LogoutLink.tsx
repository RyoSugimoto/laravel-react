import React from 'react';
import { useForm } from '@inertiajs/react';
import Button from '@/components/base/Button';

export default () => {
    const { processing, post } = useForm({});

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        post('/logout');
    }

    return <form action="/logout" method="POST" onSubmit={handleSubmit}>
        <Button type="submit" disabled={processing}>Logout</Button>
    </form>
};
