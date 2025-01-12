import type { AuthenticatedUser, Post } from '@/@types';
import useTranslation from '@/hooks/use-translation';
import useStatus from '@/hooks/use-status';
import Layout from '@/layouts/home';
import Container from '@/components/base/atoms/Container';
import PostCreationForm from '@/components/post/PostCreationForm';
import PostItem from '@/components/post/PostItem';
import PostList from '@/components/post/PostList';
import SectionHeading from '@/components/SectionHeading';

export type DashboardProps = {
    user: AuthenticatedUser;
    posts: Post[];
};

export default ({ user, posts }: DashboardProps) => {
    const { __ } = useTranslation();

    useStatus();

    const {
        name,
        email,
        language,
        displayName,
        profile,
        iconUrl,
    } = user;

    return <Layout
        name={name}
        displayName={displayName}
    >
        <div className="grid gap-8">

            <section>
                <Container>
                    <ul>
                        <li>{profile}</li>
                    </ul>
                </Container>
            </section>

            <section>
                <Container>
                    <PostCreationForm
                        userName={name}
                    />
                </Container>
            </section>

            <section>
                <Container>
                    <div className="grid gap-4">
                        <SectionHeading>{__('Pages.Dashboard.yourPosts')}</SectionHeading>
                        {posts.length !== 0 && <PostList>
                            {posts.map((post, index) => {
                                return <PostItem
                                    key={index}
                                    post={post}
                                />
                            })}
                        </PostList> || <p>{__('noPostsMessage')}</p>}
                    </div>
                </Container>
            </section>
        </div>
    </Layout>
};
