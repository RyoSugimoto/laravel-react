import { v4 } from "uuid";
import { useForm } from "@inertiajs/react";
import useTranslation from "@/hooks/useTranslation";
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

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
        <Card>
            <CardHeader>
                <CardTitle>{__('auth.LoginForm.title')}</CardTitle>
                <CardDescription>{__('auth.LoginForm.description')}</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
            <CardFooter>
                <Button type="submit">
                    <LogIn />
                    {__('loginButton')}
                </Button>
            </CardFooter>
        </Card>
    </form>
};
