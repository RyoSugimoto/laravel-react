import useTranslation from "@/hooks/useTranslation";
import useStatus from '@/hooks/useStatus';
import Layout from '@/layouts/home';
import Container from "@/components/base/atoms/Container";
import { LogoutButton } from "@/components/auth";
import PostCreationForm from "@/components/post/PostCreationForm";
import PostItem from "@/components/post/PostItem";
import PostList from '@/components/post/PostList';
import PageHeading from "@/components/PageHeading";
import SectionHeading from "@/components/SectionHeading";
import type { Post } from '@/@types';
import Link from "@/components/base/atoms/Link";
import useSharedProps from '@/hooks/use-shared-props';

type DashboardProps = {
    posts: Post[];
};

export default ({  posts }: DashboardProps) => {
    const { __ } = useTranslation();

    const { user } = useSharedProps();

    useStatus();

    return <Layout>
        <div className="grid gap-8">
            {user !== null && <>
            <section>
                <Container>
                    <ul>
                        <li>{user.profile}</li>
                    </ul>
                </Container>
            </section>

            <section>
                <Container>
                    <PostCreationForm
                        userName={user.name}
                    />
                </Container>
            </section>
            </>}

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
