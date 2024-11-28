import Layout from '@/layouts/Main';
import Link from '@/components/base/TextLink';
import LogoutLink from '@/components/auth/LogoutLink';

export default (props) => {
    return <Layout>
        <h1 className="mb-2 text-4xl leading-snug">Your profile</h1>
        <div className="grid gap-8 my-4">
            <section className="">
                <dl>
                    <div>
                        <dt>Your name:</dt>
                        <dd>{props.name}</dd>
                    </div>
                    <div>
                        <dt>Email address:</dt>
                        <dd>{props.email}</dd>
                    </div>
                </dl>
            </section>
            <section>
                <LogoutLink />
            </section>
        </div>
    </Layout>;
};
