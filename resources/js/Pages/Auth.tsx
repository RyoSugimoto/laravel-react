import { useForm } from "@inertiajs/react";
import useTranslation from "@/hooks/useTranslation";
import Layout from '@/layouts/default';

function LoginForm() {
    const { __ } = useTranslation();
    const { data, setData, post, errors } = useForm({
        email: '',
        password: '',
    });

    function handleSubmit(event) {
        event.preventDefault();
        post('/login');
    }

    function handleChange(event) {
        setData(event.target.name, event.target.value);
    }

    return <form onSubmit={handleSubmit}>
        {__('email')}: <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
        /><br />
        {errors.email && <div>{errors.email}</div>}
        {__('password')}: <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
        /><br />
        {errors.password && <div>{errors.password}</div>}
        <button type="submit">&raquo; {__('loginButton')}</button>
    </form>
}

function RegisterForm() {
    const { __ } = useTranslation();
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(event) {
        event.preventDefault();
        post('/register');
    }

    function handleChange(event) {
        setData(event.target.name, event.target.value);
    }

    return <form onSubmit={handleSubmit}>
        {__('name')}: <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
        /><br />
        {errors.name && <div>{errors.name}</div>}
        {__('email')}: <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
        /><br />
        {errors.email && <div>{errors.email}</div>}
        {__('password')}: <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
        /><br />
        {errors.password && <div>{errors.password}</div>}
        {__('passwordConfirmation')}: <input
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            onChange={handleChange}
        /><br />
        <button type="submit">&raquo; {__('registerButton')}</button>
    </form>
}

function PasswordResetForm() {
    const { __ } = useTranslation();
    const { post, data, setData, errors } = useForm({ email: '', });

    function handleSubmit(event) {
        event.preventDefault();
        post('/forgot-password');
    }

    function handleChange(event) {
        setData('email', event.target.value);
    }

    return <form onSubmit={handleSubmit}>
        {__('email')}: <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p> }
        <div>
            <button type="submit">&raquo; {__('submitButton')}</button>
        </div>
    </form>
}

export default (props) => {
    const { __ } = useTranslation();
    return <Layout>
        <div>{props.status && <p>{props.status}</p>}</div>
        <section>
            <h2>{__('login')}</h2>
            <LoginForm />
        </section>
        <hr />
        <section>
            <h2>{__('Auth.forgotPassword')}</h2>
            <p>{__('Auth.forgotPasswordHelp')}</p>
            <PasswordResetForm />
        </section>
        <hr />
        <section>
            <h2>{__('register')}</h2>
            <RegisterForm />
        </section>
    </Layout>;
};
