type Following = {
    userName: string;
    followedUserName: string;
    followedUserDisplayName?: string;
    followedUserIconUrl?: string;
    muted: boolean;
    approved: boolean;
    createdAt: string;
}

export default Following;
