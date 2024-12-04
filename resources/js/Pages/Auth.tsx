import { useForm } from "@inertiajs/react";

function LoginForm() {
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
        Email: <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
        /><br />
        {errors.email && <div>{errors.email}</div>}
        Password: <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
        /><br />
        {errors.password && <div>{errors.password}</div>}
        <button type="submit">&raquo; Login</button>
    </form>
}

function RegisterForm() {
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
        Name: <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
        /><br />
        {errors.name && <div>{errors.name}</div>}
        Email: <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
        /><br />
        {errors.email && <div>{errors.email}</div>}
        Password: <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
        /><br />
        {errors.password && <div>{errors.password}</div>}
        Password(confirmation): <input
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            onChange={handleChange}
        /><br />
        <button type="submit">&raquo; Register</button>
    </form>
}

function PasswordResetForm() {
    const { post, data, setData, errors } = useForm({ email: '', });

    function handleSubmit(event) {
        event.preventDefault();
        post('/forgot-password');
    }

    function handleChange(event) {
        setData('email', event.target.value);
    }

    return <form onSubmit={handleSubmit}>
        Email: <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p> }
        <div>
            <button type="submit">&raquo; Submit</button>
        </div>
    </form>
}

export default (props) => {
    return <div>
        <div>{props.status && <p>{props.status}</p>}</div>
        <section>
            <h2>Login form</h2>
            <LoginForm />
        </section>
        <hr />
        <section>
            <h2>Forgot your password?</h2>
            <PasswordResetForm />
        </section>
        <hr />
        <section>
            <h2>Register form</h2>
            <RegisterForm />
        </section>
    </div>;
};
