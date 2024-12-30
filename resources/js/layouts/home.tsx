import { usePage } from '@inertiajs/react';
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
            <p>
                <span
                    aria-label={__('name')}
                >{user.name}</span>
            </p>
            <div aria-label={__('email')}>{user.email}</div>
            <nav className="flex gap-4">
                <Link href="/home">{__('home')}</Link>
                <Link href="/followings">{__('followings')}</Link>
                <Link href="/follow-requests">{__('followRequests')}</Link>
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
