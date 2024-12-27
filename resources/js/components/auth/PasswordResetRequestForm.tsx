import { v4 } from 'uuid';
import { useForm } from '@inertiajs/react';
import useTranslation from '@/hooks/useTranslation';
import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type PasswordResetRequestFormProps = {
    email: string;
};

export default ({ email = '' }: PasswordResetRequestFormProps) => {
    const { __ } = useTranslation();

    const fieldNames = {
        email,
    };

    const { post, data, setData, errors } = useForm(fieldNames);

    const uuid = v4();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        post('/forgot-password');
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setData('email', value);
    }

    return <form onSubmit={handleSubmit}>
        <Label htmlFor={`${uuid}-email`}>{__('email')}</Label>
        <Input
            type="email"
            name="email"
            value={data.email}
            id={`${uuid}-email`}
            onChange={handleChange}
        />
        {errors.email && <div>{errors.email}</div> }

        <Button type="submit">
            <Mail />
            {__('submitButton')}
        </Button>
    </form>
};
