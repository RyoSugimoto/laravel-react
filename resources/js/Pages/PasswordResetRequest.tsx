import { Link } from '@inertiajs/react';
import useStatus from '@/hooks/useStatus';
import useTranslation from '@/hooks/useTranslation';
import Layout from '@/layouts/default';
import Container from "@/components/layout/Container";
import { PasswordResetRequestForm } from "@/components/auth";

type PasswordResetEntryProps = {
    email: string;
};

export default ({ email = '' }: PasswordResetEntryProps) => {
    useStatus();

    const { __ } = useTranslation();

    return <Layout>
        <Container maxWidth="sm">
            {/* メインコピー */}
            <div className="grid place-items-center">
                <h1
                    className="text-2xl font-bold ff-pm"
                >{__('Pages.PasswordResetRequest.title')}</h1>
                <p className="text-md mt-4 ff-pm">{__('Pages.PasswordResetRequest.description')}</p>
            </div>

            {/* アクションUI */}
            <div
                className="bg-card border grid gap-4 max-w-96 mx-auto mt-8 p-2 py-8 place-items-center rounded-sm"
            >
                <section className="grid gap-4 place-items-center">
                    <PasswordResetRequestForm
                        email={email}
                    />
                </section>
            </div>

            <div className="grid place-items-center mt-8">
                <p><Link href="/">{__('returnToPrevious')}</Link></p>
            </div>
        </Container>
    </Layout>;
};
