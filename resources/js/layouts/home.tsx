import useTranslation from '@/hooks/use-translation';
import Layout from './default';
import Container from '@/components/base/atoms/Container';
import { LogoutButton } from '@/components/auth';
import Link from '@/components/base/atoms/Link';

type HomeLayoutProps = React.PropsWithChildren<{
    name: string;
    displayName: string | null;
}>;

const HomeLayout: React.FC<HomeLayoutProps> = ({ children, name, displayName }) => {
    const { __ } = useTranslation();

    return <Layout>
        <Container className="my-8">
            <h1
                aria-label={__('layouts.home.userName')}
                className="font-bold text-2xl"
            >{displayName ?? name}</h1>
            <div aria-label={__('layouts.home.name')}>{name}</div>
            <nav className="flex flex-wrap gap-4">
                <Link href={route('home')}>{__('layouts.home.home')}</Link>
                <Link href={route('followings')}>{__('layouts.home.followings')}</Link>
                <Link href={``}>{__('layouts.home.followRequests')}</Link>
                <LogoutButton />
            </nav>
        </Container>

        <div>
            {children}
        </div>
    </Layout>
}

export default HomeLayout;
