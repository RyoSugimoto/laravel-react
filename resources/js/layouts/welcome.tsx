import useTranslation from '@/hooks/useTranslation';
import Layout from './default';
import Container from '@/components/base/atoms/Container';

type WelcomeLayoutProps = React.PropsWithChildren<{
}>;

const WelcomeLayout: React.FC<WelcomeLayoutProps> = ({ children }) => {
    const { __ } = useTranslation();

    return <Layout>
        {/* Hero */}
        <div
        >
            <Container
                className="grid place-items-center px-2 py-6"
            >
                <p
                    className="text-3xl font-bold ff-pm"
                >{__('layouts.welcome.copy')}</p>
                <h1 className="text-lg mt-4 ff-pm">{__('layouts.welcome.lead')}</h1>
            </Container>
        </div>

        <div>
            {children}
        </div>
    </Layout>
}

export default WelcomeLayout;
