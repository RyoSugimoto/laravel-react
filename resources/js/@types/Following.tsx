type Following = {
    userName: string;
    followedUserName: string;
    followedUserDisplayName: string | null;
    followedUserIconUrl: string | null;
    muted: boolean;
    approved: boolean;
    createdAt: string;
}

export default Following;
