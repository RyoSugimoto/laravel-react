import { router } from '@inertiajs/react';
import useStatus from '@/hooks/useStatus';
import useTranslation from '@/hooks/useTranslation';
import Layout from '@/layouts/welcome';
import Container from '@/components/base/atoms/Container';
import { FormInput, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
} from '@/components/ui/card';

type WelcomeProps = {};

export default ({}: WelcomeProps) => {
    useStatus();

    const { __ } = useTranslation();

    return <Layout>
        <Container
            className="gap-4 grid py-8 sm:grid-cols-2"
        >
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle><h2
                        className="font-bold text-md text-center"
                    >{__('Pages.Welcome.haveAccount')}</h2></CardTitle>
                    </CardHeader>
                    <CardContent className="grid place-items-center">
                        <Button
                            type="button"
                            size="lg"
                            onClick={event => {
                                event.preventDefault();
                                router.get('/login');
                            }}
                        >
                            <FormInput />
                            {__('Pages.Welcome.openLoginForm')}
                        </Button>
                    </CardContent>
                </Card>
            </section>

            <section>
                <Card>
                    <CardHeader>
                        <CardTitle><h2
                        className="font-bold text-md text-center"
                    >{__('Pages.Welcome.haveNoAccount')}</h2></CardTitle>
                    </CardHeader>
                    <CardContent className="grid place-items-center">
                        <Button
                            type="button"
                            size="lg"
                            onClick={event => {
                                event.preventDefault();
                                router.get('/register');
                            }}
                        >
                            <Sparkles />
                            {__('Pages.Welcome.openRegisterForm')}
                        </Button>
                    </CardContent>
                </Card>
            </section>
        </Container>
    </Layout>;
};
