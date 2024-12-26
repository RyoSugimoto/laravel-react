import useStatus from '@/hooks/useStatus';
import Layout from '@/layouts/default';
import { LoginForm, RegisterForm, PasswordResetForm } from "@/components/auth";
import Container from "@/components/layout/Container";
import { Button } from '@/components/ui/button';
import type { Status } from '@/@types';

type AuthProps = {
    status: Status;
};

export default ({ status }: AuthProps) => {
    useStatus(status);

    return <Layout>
        <div className="grid gap-8">

            {/* <section>
                <Container>
                    <h1 className="text-2xl font-bold ff-pm">ログインして始めましょう。</h1>
                    <p>すでにアカウントをお持ちですか？</p>
                    <Button>はい ログイン</Button>
                    <Button>いいえ 新規登録</Button>
                </Container>
            </section> */}

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
