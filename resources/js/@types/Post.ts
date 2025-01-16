export type Post = {
    id: string;
    title: string;
    slug: string;
    body: string;
    createdAt: string;
    userName: string;
    userDisplayName: string | null;
    userIconUrl: string | null;
};

export default Post;
