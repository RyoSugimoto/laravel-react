import Layout from '@/layouts/Main';
import RegisterForm from "@/components/auth/RegisterForm";
import Link from '@/components/base/TextLink';

export default (props) => {
    return <Layout>
        <h1 className="mb-2 text-4xl leading-snug">Register</h1>
        <p className="mb-2">If you have an account, <Link href="/">login here.</Link></p>
        <div className="grid gap-8 my-4">
            <section className="border px-4 py-2">
                <RegisterForm />
            </section>
        </div>
    </Layout>;
};
