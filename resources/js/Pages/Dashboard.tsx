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
import type { Post, Status } from '@/@types';

type DashboardProps = {
    status: Status;
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
                <PageHeading>
                    <span
                        aria-label={__('name')}
                    >{name}</span>
                </PageHeading>
                <div aria-label={__('email')}>{email}</div>
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
