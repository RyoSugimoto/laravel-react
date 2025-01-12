import Post from './Post';

type UserSummary = {
    name: string;
    createdAt: string;
    displayName: string | null;
    profile: string | null;
    iconUrl: URL | null;
    posts: Post[];
};

export default UserSummary;
