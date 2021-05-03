import Head from 'next/head';
import { Container } from "@chakra-ui/react";
import ConfigurationForm from '../components/ConfigurationForm';

export default function ConfigurationPage() {
    return (
        <Container maxW="lg" py={4} mt="60px">
            <Head>
                <title>Dela lag - Configuration</title>
                <meta name="description" content="Configuration for this app" />
            </Head>
            <ConfigurationForm />
        </Container>
    )
}
