import { v4 } from 'uuid';
import { useForm } from '@inertiajs/react';
import useTranslation from "@/hooks/useTranslation";
import LayoutNoFrame from '@/layouts/no-frame';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Container from '@/components/layout/Container';

type PasswordResetProps = {
    token: string;
    email: string;
};

export default ({ token, email }: PasswordResetProps) => {
    const { __ } = useTranslation();

    const fieldNames = {
        token,
        email,
        password: '',
        password_confirmation: '',
    };

    const { post, data, setData, errors } = useForm(fieldNames);

    const uuid = v4();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        post('/reset-password');
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name as keyof typeof fieldNames;
        const value = event.target.value;
        setData(name, value);
    }

    return <LayoutNoFrame>
        <Container maxWidth="sm">
            <div className="my-8">
                <form
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <input name="token" type="hidden" value={data.token} readOnly />
                    <input name="email" type="hidden" value={data.email} readOnly />
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <h1>{__('Pages.PasswordReset.heading')}</h1>
                            </CardTitle>
                            <CardDescription>{__('Pages.PasswordReset.newPasswordHelp')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label htmlFor={`${uuid}-password`}>{__('newPassword')}</Label>
                                <Input
                                    autoComplete="off"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    id={`${uuid}-password`}
                                    onChange={handleChange}
                                />
                                {errors.password && <div>{errors.password}</div>}

                                <Label htmlFor={`${uuid}-password_confirmation`}>{__('newPasswordConfirmation')}</Label>
                                <Input
                                    autoComplete="off"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    id={`${uuid}-password_confirmation`}
                                    onChange={handleChange}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">
                                <Send />
                                {__('submitButton')
                            }</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </Container>
    </LayoutNoFrame>;
};
