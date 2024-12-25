import useStatus from '@/hooks/useStatus';
import Layout from '@/layouts/default';
import { LoginForm, RegisterForm, PasswordResetForm } from "@/components/auth";
import Container from "@/components/layout/Container";

type AuthProps = {
    status: string;
};

export default ({ status }: AuthProps) => {
    useStatus(status);

    return <Layout>
        <div className="grid gap-8">
            <section>
                <Container maxWidth="sm">
                    <LoginForm />
                </Container>
            </section>

            <section>
                <Container maxWidth="sm">
                    <PasswordResetForm />
                </Container>
            </section>

            <section>
                <Container maxWidth="sm">
                    <RegisterForm />
                </Container>
            </section>
        </div>
    </Layout>;
};
