export type Post = {
    id: string;
    body: string;
    createdAt: string;
    userName: string;
    userDisplayName: string | null;
    userIconUrl: string | null;
};

export default Post;
