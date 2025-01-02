import useTranslation from '@/hooks/useTranslation';
import Layout from './default';
import Container from '@/components/base/atoms/Container';
import { LogoutButton } from "@/components/auth";
import Link from "@/components/base/atoms/Link";
import useSharedProps from '@/hooks/use-shared-props';

type HomeLayoutProps = React.PropsWithChildren<{
}>;

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
    const { __ } = useTranslation();

    const { user } = useSharedProps();

    return <Layout>
        {user !== null && (
            <Container className="my-8">
                <h1
                    aria-label={__('layouts.home.userName')}
                    className="font-bold text-2xl"
                >{user.displayName ?? user.name}</h1>
                <div aria-label={__('layouts.home.name')}>{user.name}</div>
                <nav className="flex flex-wrap gap-4">
                    <Link href="/home">{__('layouts.home.home')}</Link>
                    <Link href="/followings">{__('layouts.home.followings')}</Link>
                    <Link href="/follow-requests">{__('layouts.home.followRequests')}</Link>
                    <LogoutButton />
                </nav>
            </Container>
        )}

        <div>
            {children}
        </div>
    </Layout>
}

export default HomeLayout;
