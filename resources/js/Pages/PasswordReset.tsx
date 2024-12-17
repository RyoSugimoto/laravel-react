import { useForm } from '@inertiajs/react';
import useTranslation from "@/hooks/useTranslation";

export default (props) => {
    const { __ } = useTranslation();
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

    return <div>
        <h1>{__('PasswordReset.heading')}</h1>
        <p>{__('PasswordReset.newPasswordHelp')}</p>
        <form onSubmit={handleSubmit}>
            <input name="token" type="hidden" value={data.token} readOnly />
            <input name="email" type="hidden" value={data.email} readOnly />
            {__('newPassword')}: <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
            />
            {errors.password && <div>{errors.password}</div>}
            <br />
            {__('newPasswordConfirmation')}: <input
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                onChange={handleChange}
            />
            <br />
            <button type="submit">{__('submitButton')}</button>
        </form>
    </div>;
};
