import { v4 } from 'uuid';
import { Link } from '@inertiajs/react';
import { useForm, router } from '@inertiajs/react';
import useTranslation from '@/hooks/useTranslation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

export default () => {
    const { __ } = useTranslation();

    const fieldNames = {
        email: '',
        password: '',
    };

    const { data, setData, post, errors } = useForm(fieldNames);

    const uuid = v4();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        post('/login');
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name as keyof typeof fieldNames;
        const value = event.target.value;
        setData(name, value);
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
        {errors.email && <div>{errors.email}</div>}

        <Label htmlFor={`${uuid}-password`}>{__('password')}</Label>
        <Input
            type="password"
            name="password"
            value={data.password}
            id={`${uuid}-password`}
            onChange={handleChange}
        />
        {errors.password && <div>{errors.password}</div>}

        <Button type="submit">
            <LogIn />
            {__('loginButton')}
        </Button>

        {/* パスワードリセットリンク */}
        <p className="mt-2">
            <Link
                href="/password-reset/request"
                onClick={event => {
                    event.preventDefault();
                    router.get('/password-reset/request', {
                        email: data.email,
                    });
                }}
            >{__('Pages.Welcome.forgotPassword')}</Link>
        </p>
    </form>
};
