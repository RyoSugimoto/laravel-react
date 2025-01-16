import type { AuthenticatedUser, Following } from '@/@types';
import { router } from '@inertiajs/react';
import Layout from '@/layouts/home';
import Container from '@/components/base/atoms/Container';
import useTranslation from '@/hooks/use-translation';
import Link from '@/components/base/atoms/Link';
import { Button } from '@/components/ui/button';

type FollowingProps = {
    user: AuthenticatedUser;
    followings: Following[];
};

export default ({ followings, user }: FollowingProps) => {
    const { __ } = useTranslation();

    const { name, displayName } = user;

    return <Layout
        name={name}
        displayName={displayName}
    >
        <Container>
            <h1>{__('Pages.Followings.followingUsers')}</h1>
            <div className="gap-2 grid">
                {followings.map(({
                    followedUserName,
                    approved,
                    muted,
                    createdAt,
                    followedUserDisplayName,
                    followedUserIconUrl
                }, index) => {
                    return <div
                        key={index}
                        className="gap-2 flex border p-2 rounded-sm"
                    >
                        <ul>
                            <li>
                                <Link
                                    href={`/user/${followedUserName}`}
                                    title={`${__('userDetails', {
                                        name: followedUserName,
                                    })}`}
                                >
                                    {followedUserIconUrl && <img src={followedUserIconUrl} alt="" />}
                                    {followedUserDisplayName && <span>{followedUserDisplayName}</span>}
                                    <span>{followedUserName}</span>
                                </Link>
                            </li>
                            {muted && <li>{__('muting')}</li>}
                            <li>{approved ? __('followingNow') : __('waitingApprovement')}</li>
                        </ul>
                        <div>
                            <Button size="sm"
                                type="button"
                                onClick={ () => {
                                    router.put(`/followings/unfollow/${followedUserName}`);
                                }}
                            >{__('unfollow')}</Button>
                            <Button size="sm"
                                type="button"
                                onClick={ () => {
                                    router.put(`/followings/mute/${followedUserName}`);
                                }}
                            >{__('toMute')}</Button>
                        </div>
                    </div>
                })}
            </div>
        </Container>
    </Layout>
};
