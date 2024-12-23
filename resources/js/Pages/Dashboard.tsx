import { useForm, router } from "@inertiajs/react";
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
    const { data, put, setData, reset } = useForm({
        name: props.name,
        body: '',
    });

    function handleDeletePost(id: string) {
        if (confirm(__('postDeleteConfirm'))) {
            router.delete(`/posts/${id}`, {
                preserveScroll: true,
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        put('/posts', {
            onSuccess: () => {
                reset('body');
            }
        });
    }

    function handleChange(e) {
        setData('body', e.target.value);
    }

    return <Layout>
        <div>{props.status}</div>
        <h1>{__('Dashboard.heading')}</h1>
        <div>{__('name')}: {props.name}</div>
        <div>{__('email')}: {props.email}</div>
        <div>{__('language')}: {
            props.language
            ?__(`languageLabel.${props.language}`)
            : __('notSet')
        }</div>
        <section>
            <form method="POST" onSubmit={handleSubmit}>
                <textarea
                    name="body"
                    id=""
                    value={data.body}
                    onChange={handleChange}
                ></textarea>
                <div>
                    <button type="submit">投稿する</button>
                </div>
            </form>
        </section>
        <section>
            <h2>{__('posts')}</h2>
            {posts.length !== 0 && <div>
                {posts.map(post => {
                    return <article className="border-t">
                        <header>{__('postCreatedAt')}: {post.createdAt}</header>
                        <div>{post.body}</div>
                        <footer>
                            <button
                                onClick={ () => { handleDeletePost(post.id) }}
                            >{__('postDeleteButtonLabel')}</button>
                        </footer>
                    </article>
                })}
            </div> || <p>{__('noPostsMessage')}</p>}
        </section>
        <div><LogoutButton /></div>
    </Layout>
};
