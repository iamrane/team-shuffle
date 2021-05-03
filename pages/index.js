import Head from 'next/head'
import {useRecoilState} from "recoil";
import { Container } from "@chakra-ui/react";
import Top from '../components/Top';
import ConfigurationForm from '../components/ConfigurationForm';
import PlayerForm from '../components/PlayerForm';
import Teams from '../components/Teams';
import { viewState, benchState, teamsState } from '../states';

export default function Home() {
    const [view] = useRecoilState(viewState);
    const [teams] = useRecoilState(teamsState);
    const [bench] = useRecoilState(benchState);


    return (
        <Container maxW="lg" py={4} mt="60px">
            <Head>
                <title>Dela lag</title>
                <meta name="description" content="Ett app för att enkelt kunna dela lag" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Top />
            {view === 'configuration' && <ConfigurationForm />}
            {view === 'players' && <PlayerForm /> }
            {view === 'teams' && <Teams teams={teams} bench={bench} />}
        </Container>
    )
}
