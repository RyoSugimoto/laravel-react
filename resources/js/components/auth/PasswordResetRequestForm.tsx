import { v4 } from 'uuid';
import { useForm } from '@inertiajs/react';
import useTranslation from '@/hooks/useTranslation';
import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldItem,
    Message,
    Action
} from '../form';

type PasswordResetRequestFormProps = {
    email: string;
    onSuccess?: () => void;
};

export default ({ email = '', onSuccess = () => {} }: PasswordResetRequestFormProps) => {
    const { __ } = useTranslation();

    const fieldNames = {
        email: email,
    };

    const { post, data, setData, errors, processing } = useForm(fieldNames);

    const uuid = v4();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        post('/forgot-password', {
            onSuccess,
        });
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setData('email', value);
    }

    return <form onSubmit={handleSubmit}>
        <Field>
            <FieldItem>
                <Label htmlFor={`${uuid}-email`}>{__('email')}</Label>
                <Input
                    type="email"
                    name="email"
                    value={data.email}
                    id={`${uuid}-email`}
                    onChange={handleChange}
                />
                {errors.email && <Message variant="destructive">{errors.email}</Message> }
            </FieldItem>
            <Action>
                <Button type="submit" disabled={processing}>
                    <Mail />
                    {__('submitButton')}
                </Button>
            </Action>
        </Field>
    </form>
};
