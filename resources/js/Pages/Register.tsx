import useStatus from '@/hooks/useStatus';
import useTranslation from '@/hooks/useTranslation';
import Layout from '@/layouts/welcome';
import Container from '@/components/base/atoms/Container';
import { RegisterForm } from "@/components/auth";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
    CardDescription
} from '@/components/ui/card';

export default () => {
    useStatus();

    const { __ } = useTranslation();

    return <Layout>
        <Container
            className="max-w-[30rem] py-8"
        >
            <Card>
                <CardHeader>
                    <CardTitle>{__('Pages.Register.title')}</CardTitle>
                    <CardDescription>{__('Pages.Register.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
        </Container>
    </Layout>;
};
