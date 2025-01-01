import type { Following } from '@/@types';
import Layout from '@/layouts/home';
import Container from '@/components/base/atoms/Container';
import useTranslation from '@/hooks/useTranslation';
import Link from '@/components/base/atoms/Link';
import { Button } from '@/components/ui/button';

type FollowingProps = {
    followings: Following[];
};

export default ({ followings }: FollowingProps) => {
    const { __ } = useTranslation();

    return <Layout>
        <Container>
            <h1>{__('Pages.Following.followingUsers')}</h1>
            <div className="gap-2 grid">
                {followings.map(({followedUserName, approved, muted, createdAt, followedUserDisplayName, followedUserIconUrl}, index) => {
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
                            <Button size="sm">{__('unfollow')}</Button>
                            <Button size="sm">{__('toMute')}</Button>
                        </div>
                    </div>
                })}
            </div>
        </Container>
    </Layout>
};
