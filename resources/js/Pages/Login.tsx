import useStatus from '@/hooks/useStatus';
import useTranslation from '@/hooks/useTranslation';
import Layout from '@/layouts/welcome';
import Container from '@/components/base/atoms/Container';
import { LoginForm } from "@/components/auth";
import { ChevronRight as Right } from 'lucide-react';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import Link from '@/components/base/atoms/Link';

export default () => {
    useStatus();

    const { __ } = useTranslation();

    return <Layout>
        <Container
            className="max-w-[30rem] py-8"
        >
            <Card>
                <CardHeader>
                    <CardTitle>{__('Pages.Login.title')}</CardTitle>
                    <CardDescription>{__('Pages.Login.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </Container>
    </Layout>;
};
