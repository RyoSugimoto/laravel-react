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
            <h1>{__('usersFollowed')}</h1>
            <div className="gap-2 grid">
                {followings.map(following => {
                    return <div className="gap-2 flex border p-2 rounded-sm">
                        <ul>
                            <li>name: {following.name}</li>
                            {following.muted && <li>{__('muting')}</li>}
                            <li>{following.approved ? __('followingNow') : __('waitingApprovement')}</li>
                        </ul>
                        <div>
                            <Link href={`/user/${following.name}`}>{__('userDetails')}</Link>
                            </div>
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
