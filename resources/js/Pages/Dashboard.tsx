import { useForm } from "@inertiajs/react";
import useTranslation from "@/hooks/useTranslation";

function LogoutButton() {
    const { __ } = useTranslation();
    const { post } = useForm({});
    return <form onSubmit={event => {
            event.preventDefault();
            post('logout');
        }}>
        <button type="submit">&laquo; {__('logoutButton')}</button>
    </form>;
}

export default (props) => {
    const { __ } = useTranslation();
    return <div>
        <h1>{__('Dashboard.heading')}</h1>
        <div>{__('name')}: {props.name}</div>
        <div>{__('email')}: {props.email}</div>
        <div><LogoutButton /></div>
    </div>
};
