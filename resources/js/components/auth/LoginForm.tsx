import { v4 } from 'uuid';
import { useState } from 'react';
import Link from '@/components/base/atoms/Link';
import { useForm } from '@inertiajs/react';
import useTranslation from '@/hooks/useTranslation';
import { LogIn, ChevronRight as Right, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {
    Field,
    FieldItem,
    Message,
    Action
} from '../form';
import { PasswordResetRequestForm } from "@/components/auth";

export default () => {
    const { __ } = useTranslation();

    const fieldNames = {
        email: '',
        password: '',
    };

    const { data, setData, post, errors, setError, reset, processing } = useForm(fieldNames);

    const uuid = v4();

    const [passwordResetOpen, setPasswordResetOpen] = useState<boolean>(false);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        post('/login', {
            onError: () => {
                reset('password');
            },
        });
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name as keyof typeof fieldNames;
        const value = event.target.value;
        setError(name, '');
        setData(name, value);
    }

    return <>
        <form onSubmit={handleSubmit}>
            <Field>
                <FieldItem>
                    <Label htmlFor={`${uuid}-email`}>{__('email')}</Label>
                    <Input
                        data-error={errors.email}
                        type="email"
                        name="email"
                        value={data.email}
                        id={`${uuid}-email`}
                        onChange={handleChange}
                    />
                    {errors.email && <Message
                        variant="destructive"
                    >{errors.email}</Message>}
                </FieldItem>

                <FieldItem>
                    <Label htmlFor={`${uuid}-password`}>{__('password')}</Label>
                    <Input
                        autoComplete="off"
                        data-error={errors.password}
                        type="password"
                        name="password"
                        value={data.password}
                        id={`${uuid}-password`}
                        onChange={handleChange}
                    />
                    {errors.password && <Message
                        variant="destructive"
                    >{errors.password}</Message>}
                </FieldItem>

                <Action>
                    <Button type="submit" disabled={processing}>
                        <LogIn />
                        {__('loginButton')}
                    </Button>
                </Action>
            </Field>
        </form>

        <hr className="my-6" />

        <div className="gap-2 grid mt-6">
            <div>
                {/* パスワードリセットフォーム */}
                <Dialog open={passwordResetOpen} onOpenChange={setPasswordResetOpen}>
                    <DialogTrigger asChild>
                        <button
                            className="link-like-button"
                            type="button"
                        >
                            <Right size="1em" />
                            {__('components.auth.LoginForm.forgotPassword')}
                            <span title={__('components.auth.LoginForm.forgotPasswordHelp')}>
                                <ExternalLink size="1em" />
                            </span>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="w-[calc(100%_-_4rem)]">
                        <DialogHeader>
                            <DialogTitle>{__('components.auth.PasswordResetRequestForm.title')}</DialogTitle>
                            <DialogDescription>{__('components.auth.PasswordResetRequestForm.description')}</DialogDescription>
                        </DialogHeader>
                        <PasswordResetRequestForm
                            email={data.email}
                            onSuccess={() => {
                                // パスワードリセットのリクエストメールの送信が成功したら、
                                // ダイアログを閉じてログインフォームのエラーを解消する。
                                setPasswordResetOpen(false);
                                reset('password');
                                const errorKeys = Object.keys(errors) as (keyof typeof data)[];
                                errorKeys.forEach(key => setError(key, ''));
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                {/* 新規アカウント登録フォームへの誘導 */}
                <Link
                    withIcon
                    href="/register"
                >
                    <Right size="1em" />
                    {__('components.auth.LoginForm.register')}
                </Link>
            </div>
        </div>
    </>;
};
