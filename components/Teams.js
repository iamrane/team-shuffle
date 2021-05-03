import {Grid, Heading, Box, Stack, Text, Divider, Button} from "@chakra-ui/react";
import Bench from './Bench';
import PlayerAvatar from "./PlayerAvatar";
import {ChevronLeftIcon, RepeatIcon} from "@chakra-ui/icons";
import {useRecoilState} from "recoil";
import { playersState, nrOfPlayersPerTeamState, benchState, teamsState, viewState} from "../states";
import {splitTeams} from "../utils";

export default function Teams() {
    const [, setView] = useRecoilState(viewState);
    const [players] = useRecoilState(playersState);
    const [nrOfPlayersPerTeam] = useRecoilState(nrOfPlayersPerTeamState);
    const [teams, setTeams] = useRecoilState(teamsState);
    const [bench, setBench] = useRecoilState(benchState);

    return (
        <Stack spacing={10}>
            <Stack spacing={4}>
                <Button
                    size="lg"
                    alignSelf="start"
                    leftIcon={<ChevronLeftIcon />}
                    onClick={() => setView('players')}
                >
                    Go back
                </Button>
                <Heading size="md">Teams</Heading>
                {bench?.[0] && (
                    <Box mb={6}>
                        <Bench bench={bench} />
                    </Box>
                )}

                {teams.map((team, index) => (
                    <Box key={`team-${index}`} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
                        <Heading size="sm" mb={6}>Team {index + 1}</Heading>
                        <Stack spacing={4}>
                            {team.map((player, index) => (
                                <>
                                    <Grid templateColumns="50px 1fr" alignItems="center" gap={3}>
                                        <PlayerAvatar key={player?.name} player={player} size="md" />
                                        <Text>{player?.name}</Text>
                                    </Grid>
                                    {team.length !== index + 1 && <Divider /> }

                                </>
                            ))}
                        </Stack>
                    </Box>
                ))}
            </Stack>
            <Button
                size="lg"
                onClick={() => {
                    const [newTeams, newBench] = splitTeams(players, nrOfPlayersPerTeam);
                    setTeams(newTeams);
                    setBench(newBench);
                }}
                leftIcon={<RepeatIcon />}
            >
                Shuffle teams
            </Button>
        </Stack>
    );
}