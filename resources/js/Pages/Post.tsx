import type { Post } from "@/@types";
import Layout from '@/layouts/default';
import Container from "@/components/layout/Container";
import { router, Link } from '@inertiajs/react';
import useTranslation from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type PostProps = {
    post: Post;
};

export default ({ post }: PostProps) => {
    const { __ } = useTranslation();

    function handleDelete() {
        if (confirm(__('postDeleteConfirm'))) {
            router.delete(`/posts/${post.id}`);
        }
    }

    return <Layout>
        <Container>
            <article>
                <header>
                    <h1>{}</h1>
                    <div>{post.user}</div>
                    <div>{post.createdAt}</div>
                </header>
                <div>
                    {post.body}
                </div>
                <footer>

                <Link
                    href={`/posts/${post.id}`}
                >{__('readMore')}</Link>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={ handleDelete }
                >
                    <Trash />
                    {__('postDeleteButtonLabel')}
                </Button>
                </footer>
            </article>
        </Container>
    </Layout>
}
