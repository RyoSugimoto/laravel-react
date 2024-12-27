import useStatus from '@/hooks/useStatus';
import useTranslation from '@/hooks/useTranslation';
import Layout from '@/layouts/default';
import { FormInputIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoginForm, RegisterForm } from "@/components/auth";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type WelcomeProps = {};

export default (props: WelcomeProps) => {
    useStatus();

    const { __ } = useTranslation();

    return <Layout>
        {/* メインコピー */}
        <div className="grid place-items-center px-2 py-6">
            <p
                className="text-3xl font-bold ff-pm"
            >{__('Pages.Welcome.copy')}</p>
            <h1 className="text-lg mt-4 ff-pm">{__('Pages.Welcome.lead')}</h1>
        </div>

        {/* ログインもしくは新規登録のアクションUI */}
        <div
            className="bg-card border grid gap-4 max-w-96 mx-auto my-4 p-2 py-8 place-items-center rounded-sm"
        >

            {/* ログイン */}
            <section className="grid gap-4 place-items-center">
                <h2
                    className="font-bold text-md"
                >{__('Pages.Welcome.haveAccount')}</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg">
                            <FormInputIcon />
                            {__('Pages.Welcome.openLoginForm')}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{__('Pages.Welcome.LoginForm.title')}</DialogTitle>
                            <DialogDescription>{__('Pages.Welcome.LoginForm.description')}</DialogDescription>
                        </DialogHeader>

                        <LoginForm />

                    </DialogContent>
                </Dialog>
            </section>

            <p className="text-sm">{__('Pages.Welcome.or')}</p>

            {/* 新規登録 */}
            <section className="grid gap-4 place-items-center">
                <h2
                    className="font-bold text-md"
                >{__('Pages.Welcome.haveNoAccount')}</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg">
                            <Sparkles />
                            {__('Pages.Welcome.openRegisterForm')}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{__('Pages.Welcome.RegisterForm.title')}</DialogTitle>
                            <DialogDescription>{__('Pages.Welcome.RegisterForm.description')}</DialogDescription>
                        </DialogHeader>

                        <RegisterForm />

                    </DialogContent>
                </Dialog>
            </section>
        </div>
    </Layout>;
};
