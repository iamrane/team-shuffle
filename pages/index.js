import Head from 'next/head'
import {Formik} from "formik";
import {useRecoilState} from "recoil";
import { Container, Stack, Button } from "@chakra-ui/react";
import {RepeatIcon} from "@chakra-ui/icons";
import Top from '../components/Top';
import ConfigurationForm from '../components/ConfigurationForm';
import PlayerForm from '../components/PlayerForm';
import Players from '../components/Players';
import Teams from '../components/Teams';
import { viewState, nrOfPlayersPerTeamState, benchState, teamsState, playersState } from '../states';
import { splitTeams } from "../utils";

export default function Home() {
    const [view, setView] = useRecoilState(viewState);
    const [players, setPlayers] = useRecoilState(playersState);
    const [teams, setTeams] = useRecoilState(teamsState);
    const [bench, setBench] = useRecoilState(benchState);
    const [nrOfPlayersPerTeam] = useRecoilState(nrOfPlayersPerTeamState);

    console.log('teams', teams);

    function handleGenerateTeams() {
        const [newTeams, newBench] = splitTeams(players, nrOfPlayersPerTeam);
        setTeams(newTeams);
        setBench(newBench);
    }

    return (
        <Container maxW="lg" py={4} mt="50px">
            <Head>
                <title>Dela lag</title>
                <meta name="description" content="Ett app för att enkelt kunna dela lag" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Top onMenuClick={setView} />

            {view === 'configuration' && (
                <Stack spacing={10}>
                    <ConfigurationForm />
                    <Button size="lg" onClick={() => setView('players')}>
                        Next
                    </Button>
                </Stack>
            )}

            {view === 'players' && (
                <Stack spacing={6}>
                    <Formik
                        validateOnBlur={false}
                        onSubmit={(values, actions) => {
                            const name = values?.name;
                            const level = values?.level;
                            setPlayers([...players, { name, level }]);
                            actions.resetForm();
                        }}
                        initialValues={{
                            name: '',
                            level: '3',
                        }}
                    >
                        {() => <PlayerForm />}
                    </Formik>
                    {players?.[0] && <Players players={players} />}
                    {players?.[3] && (
                        <Button
                            size="lg"
                            onClick={() => {
                                handleGenerateTeams();
                                setView('teams');
                            }}
                            leftIcon={<RepeatIcon />}
                        >
                            Generate teams
                        </Button>
                    )}
                </Stack>
            )}

            {view === 'teams' && (
                <Stack spacing={10}>
                    <Teams teams={teams} bench={bench} />
                    <Button
                        size="lg"
                        onClick={handleGenerateTeams}
                        leftIcon={<RepeatIcon />}
                    >
                        Shuffle teams
                    </Button>
                </Stack>
            )}
        </Container>
    )
}
