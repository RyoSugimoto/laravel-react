import { useForm } from "@inertiajs/react";
import useTranslation from "@/hooks/useTranslation";
import Layout from '@/layouts/default';

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
    const { posts } = props;
    return <Layout>
        <h1>{__('Dashboard.heading')}</h1>
        <div>{__('name')}: {props.name}</div>
        <div>{__('email')}: {props.email}</div>
        <div>{__('language')}: {
            props.language
            ?__(`languageLabel.${props.language}`)
            : __('notSet')
        }</div>
        <section>
            <h2>{__('posts')}</h2>
            {posts.length !== 0 && <div>
                {posts.map(post => {
                    return <article className="border-t">
                        <header></header>
                        <div>{post.body}</div>
                        <footer>{__('postCreatedAt')}: {post.created_at}</footer>
                    </article>
                })}
            </div> || <p>{__('noPostsMessage')}</p>}
        </section>
        <div><LogoutButton /></div>
    </Layout>
};
