import { useForm } from "@inertiajs/react";

function LogoutButton() {
    const { post } = useForm({});
    return <form onSubmit={event => {
            event.preventDefault();
            post('logout');
        }}>
        <button type="submit">&laquo; Logout</button>
    </form>;
}

export default (props) => {
    return <div>
        <h1>Home</h1>
        <div>Name: {props.name}</div>
        <div>Email: {props.email}</div>
        <div><LogoutButton /></div>
    </div>
};
