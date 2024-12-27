import type { Post } from '@/@types';
import { router } from '@inertiajs/react';
import useTranslation from "@/hooks/useTranslation";
import { ChevronRight as Right, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

type PostItemProps = {
    post: Post;
};

export default ({ post }: PostItemProps) => {
    const { __ } = useTranslation();

    function handleDelete() {
        if (confirm(__('postDeleteConfirm'))) {
            router.delete(`/posts/${post.id}`, {
                preserveScroll: true,
            });
        }
    }

    return <article>
        <Card className="border-border">
            <CardHeader>
                <div
                    className="flex flex-wrap justify-between items-center"
                >
                    <div
                        className="basis-1/2 grow-1"
                    >{post.user}</div>
                    <div
                        aria-label={__('postCreatedAt')}
                        className="text-sm basis-auto shrink-1"
                    >
                        {post.createdAt}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div>{post.body}</div>
            </CardContent>
            <CardFooter
                className="flex gap-2"
            >
                <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                        router.get(`/posts/${post.id}`);
                    }}
                >
                    <Right />
                    {__('readMore')}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={ handleDelete }
                >
                    <Trash />
                    {__('postDeleteButtonLabel')}
                </Button>
            </CardFooter>
        </Card>
    </article>
};
