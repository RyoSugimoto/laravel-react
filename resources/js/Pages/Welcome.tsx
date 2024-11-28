import Layout from '@/layouts/Main';
import LoginForm from "@/components/auth/LoginForm";
import Link from '@/components/base/TextLink';

export default (props) => {
    return <Layout>
        <h1 className="mb-2 text-4xl leading-snug">Welcome</h1>
        <div className="grid gap-8 my-4">
            <section className="border container max-w-screen-sm mx-auto px-4 py-2">
                <h2 className="mb-2 text-xl leading-snug">Login</h2>
                <p className="mb-2">If you don't have an account, <Link href="/register" className="text-cyan-300 underline">register here</Link>.</p>
                <LoginForm />
            </section>
        </div>
    </Layout>;
};
