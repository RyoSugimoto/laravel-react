import type { Post, User } from '@/@types';
import useTranslation from '@/hooks/use-translation';
import Layout from '@/layouts/default';
import PostList from '@/components/post/PostList';
import PostItem from '@/components/post/PostItem';

type UserPageProps = {
    user: User;
    posts: Post[];
};

export default ({ posts, user }: UserPageProps) => {

    const { __ } = useTranslation();

    const {
        name,
        displayName,
        profile,
        iconUrl,
    } = user;

    return <Layout>
        <article>
            <header>
                <h1>{displayName}</h1>
                <div>{name}</div>
            </header>

            <div>
                <section>
                    <h2>ユーザの投稿</h2>
                    <PostList>
                        {posts.map((post, index) => {
                            return <PostItem
                                key={index}
                                post={post}
                            />
                        })}
                    </PostList>
                </section>
            </div>
        </article>
    </Layout>
};
