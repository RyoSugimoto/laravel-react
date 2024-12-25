import useTranslation from "@/hooks/useTranslation";
import useStatus from '@/hooks/useStatus';
import Layout from '@/layouts/default';
import Container from "@/components/layout/Container";
import { LogoutButton } from "@/components/auth";
import PostCreationForm from "@/components/post/PostCreationForm";
import PostItem from "@/components/post/PostItem";
import PostList from '@/components/post/PostList';
import PageHeading from "@/components/PageHeading";
import SectionHeading from "@/components/SectionHeading";
import type { Post } from '@/@types';

type DashboardProps = {
    status: string;
    name: string;
    email: string;
    language: string;
    posts: Post[];
};

export default ({ status, name, email, posts }: DashboardProps) => {
    const { __ } = useTranslation();
    useStatus(status);

    return <Layout>
        <div className="my-8">
            <Container>
                <PageHeading>{__('Dashboard.heading')}</PageHeading>
            </Container>
            <Container>
                <div>{__('name')}: {name}</div>
                <div>{__('email')}: {email}</div>
                <div><LogoutButton /></div>
            </Container>
        </div>

        <div className="grid gap-8">
            <section>
                <Container>
                    <PostCreationForm userName={name} />
                </Container>
            </section>

            <section>
                <Container>
                    <div className="grid gap-4">
                        <SectionHeading>{__('Dashboard.yourPosts')}</SectionHeading>
                        {posts.length !== 0 && <PostList>
                            {posts.map(post => {
                                return <PostItem post={post} />
                            })}
                        </PostList> || <p>{__('noPostsMessage')}</p>}
                    </div>
                </Container>
            </section>
        </div>
    </Layout>
};
