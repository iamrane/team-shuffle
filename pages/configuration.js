import Head from 'next/head';
import ConfigurationForm from '../components/ConfigurationForm';

export default function ConfigurationPage() {
    return (
        <>
            <Head>
                <title>Dela lag - Configuration</title>
                <meta name="description" content="Configuration for this app" />
            </Head>
            <ConfigurationForm />
        </>
    )
}
