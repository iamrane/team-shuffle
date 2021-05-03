import Head from 'next/head'
import { Container } from "@chakra-ui/react";
import Teams from '../components/Teams';

export default function TeamsPage() {
    return (
        <Container maxW="lg" py={4} mt="60px">
            <Head>
                <title>Dela lag - Teams</title>
                <meta name="description" content="Shuffle the team" />
            </Head>
            <Teams />
        </Container>
    )
}
