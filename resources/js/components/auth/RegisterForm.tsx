import { v4 } from "uuid";
import { useForm } from "@inertiajs/react";
import useTranslation from "@/hooks/useTranslation";
import { ChevronRight as Right } from 'lucide-react';
import Link from '@/components/base/atoms/Link';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
    Field,
    FieldItem,
    Message,
    Action
} from '../form';

export default () => {
    const { __ } = useTranslation();
    const fieldNames = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    };
    const { data, setData, post, errors, processing } = useForm(fieldNames);
    const uuid = v4();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        post('/register');
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name as keyof typeof fieldNames;
        const value = event.target.value;
        setData(name, value);
    }

    return <form onSubmit={handleSubmit}>
        <Field>
            <FieldItem>
            <Label htmlFor={`${uuid}-name`}>{__('name')}</Label>
                <Input
                    type="text"
                    name="name"
                    value={data.name}
                    id={`${uuid}-name`}
                    onChange={handleChange}
                />
                {errors.name && <Message variant="destructive">{errors.name}</Message>}
            </FieldItem>
            <FieldItem>
                <Label htmlFor={`${uuid}-email`}>{__('email')}</Label>
                <Input
                    type="email"
                    name="email"
                    value={data.email}
                    id={`${uuid}-email`}
                    onChange={handleChange}
                />
                {errors.email && <Message variant="destructive">{errors.email}</Message>}
            </FieldItem>
            <FieldItem>
                <Label htmlFor={`${uuid}-password`}>{__('password')}</Label>
                <Input
                    type="password"
                    name="password"
                    value={data.password}
                    id={`${uuid}-password`}
                    onChange={handleChange}
                />
                {errors.password && <Message variant="destructive">{errors.password}</Message>}
            </FieldItem>
            <FieldItem>
                <Label htmlFor={`${uuid}-password_confirm`}>{__('passwordConfirmation')}</Label>
                <Input
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    id={`${uuid}-password_confirm`}
                    onChange={handleChange}
                />
            </FieldItem>

            <Action>
                <Button type="submit" disabled={processing}>
                    <Check />
                    {__('registerButton')}
                </Button>
            </Action>
        </Field>

        <hr className="my-6" />

        <div className="gap-2 grid mt-6">
            <Link
                withIcon
                href="/login"
            >
                <Right size="1em" />
                {__('Pages.Register.login')}
            </Link>
        </div>
    </form>
};
