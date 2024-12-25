import { v4 } from "uuid";
import { useForm } from "@inertiajs/react";
import useTranslation from "@/hooks/useTranslation";
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
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
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    };
    const { data, setData, post, errors } = useForm(fieldNames);
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
        <Card>
            <CardHeader>
                <CardTitle>{__('auth.RegisterForm.title')}</CardTitle>
                <CardDescription>{__('auth.RegisterForm.description')}</CardDescription>
            </CardHeader>
            <CardContent>
            <Label htmlFor={`${uuid}-name`}>{__('name')}</Label>
                <Input
                    type="text"
                    name="name"
                    value={data.name}
                    id={`${uuid}-name`}
                    onChange={handleChange}
                />
                {errors.name && <div>{errors.name}</div>}
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
                <Label htmlFor={`${uuid}-password_confirm`}>{__('passwordConfirmation')}</Label>
                <Input
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    id={`${uuid}-password_confirm`}
                    onChange={handleChange}
                />
            </CardContent>
            <CardFooter>
                <Button type="submit">
                    <Check />
                    {__('registerButton')}
                </Button>
            </CardFooter>
        </Card>
    </form>
};
