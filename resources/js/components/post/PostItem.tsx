import type { Post } from '@/@types';
import { router, Link } from '@inertiajs/react';
import useTranslation from '@/hooks/use-translation';
import { ChevronRight as Right, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

    const {
        id,
        title,
        slug,
        body,
        createdAt,
        userName,
        userDisplayName,
        userIconUrl
    } = post;

    function handleDelete() {
        if (confirm(__('postDeleteConfirm'))) {
            router.delete(route('post.delete', [post.id]), {
                preserveScroll: true,
            });
        }
    }

    return <article>
        <Card className="border-border">
            <CardHeader>
                <div
                    className="flex flex-wrap justify-between"
                >
                    {userIconUrl !== null && (
                        <span>
                            <img
                                src={userIconUrl}
                                alt=""
                            />
                        </span>
                    )}
                    <span
                        className="basis-1/2 grow-1"
                    >{userDisplayName} {userName}</span>
                    <span
                        aria-label={__('postCreatedAt')}
                        className="text-sm basis-auto shrink-1"
                    >
                        {createdAt}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <h2 className="text-lg font-bold">{title}</h2>
                    {/* <div>{body}</div> */}
                </div>
            </CardContent>
            <CardFooter
                className="flex gap-2"
            >
                <Link href={route('post', [userName, slug])}>{__('readMore')}</Link>
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
