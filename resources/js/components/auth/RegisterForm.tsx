import { v4 } from 'uuid';
import { useForm } from '@inertiajs/react'
import { Fields, Item, Label, Message, Input } from '@/components/form';
import Button from '@/components/base/Button';
import type { HTMLFieldElement } from '@/components/form';

/** フォームの名前 */
const formName = 'register-form';

/** 送信先のURL */
const endPoint = '/register';

/** 項目名（ `name` ）とデフォルト値 */
const defaults = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
};

/** 送信ボタンのラベル  */
const submitLabel = "Register";

export default () => {
    const id = v4();
    const formId = `${formName}-${id}`;
    const { data, setData, post, processing, errors, reset } = useForm(defaults);

    /** フォームの内容 */
    const Form = <form id={`${formName}-${id}`} name={formName} method="POST" action={endPoint} onSubmit={handleSubmit} autoComplete="off">
        <Fields>
            <Item>
                <Label htmlFor={`${formId}-name`}>Name</Label>
                <Input
                    id={`${formId}-name`}
                    name="name"
                    type="name"
                    value={data.name}
                    onChange={handleChange}
                />
                {errors.name && <Message variant="error">{errors.name}</Message>}
            </Item>
            <Item>
                <Label htmlFor={`${formId}-email`}>Email</Label>
                <Input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                />
                {errors.email && <Message variant="error">{errors.email}</Message>}
            </Item>
            <Item>
                <Label htmlFor={`${formId}-password`}>Password</Label>
                <Input
                    id={`${formId}-password`}
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                />
                {errors.password && <Message variant="error">{errors.password}</Message>}
            </Item>
            <Item>
                <Label htmlFor={`${formId}-password_confirmation`}>Password(confirmation)</Label>
                <Input
                    id={`${formId}-password_confirmation`}
                    name="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={handleChange}
                />
            </Item>
            <div className="py-3">
                <Button
                    type="submit"
                    disabled={processing}
                >{processing ? 'Submitting now' : submitLabel}</Button>
            </div>
        </Fields>
    </form>;

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        post(endPoint, {
            preserveScroll: true,
            onSuccess: () => {
                reset('password');
            },
        });
    }

    function handleChange(event: React.ChangeEvent<HTMLFieldElement>) {
        const key = event.target.name;
        const value = event.target.value;
        if (Object.keys(defaults).includes(key)) {
            setData(key as keyof typeof defaults, value);
        }
    }

    return Form;
};
