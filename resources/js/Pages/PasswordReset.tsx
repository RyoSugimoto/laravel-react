import { useForm } from '@inertiajs/react';

export default (props) => {
    const { post, data, setData, errors } = useForm({
        token: props.token,
        email: props.email,
        password: '',
        password_confirmation: '',
    });

    function handleChange(event) {
        setData(event.target.name, event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        post('/reset-password');
    }

    return <form onSubmit={handleSubmit}>
        <input name="token" type="hidden" value={data.token} readOnly />
        <input name="email" type="hidden" value={data.email} readOnly />
        New password: <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
        />
        {errors.password && <div>{errors.password}</div>}
        <br />
        New password(confirmation): <input
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
    </form>;
};
