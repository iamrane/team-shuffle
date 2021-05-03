import { Fragment, useEffect } from 'react';
import {useRouter} from "next/router";
import {Grid, Heading, Box, Stack, Text, Divider, Button} from "@chakra-ui/react";
import Bench from './Bench';
import PlayerAvatar from "./PlayerAvatar";
import {ChevronLeftIcon, RepeatIcon} from "@chakra-ui/icons";
import {useRecoilState, useRecoilValue} from "recoil";
import { playersState, nrOfPlayersPerTeamState, benchState, teamsState} from "../states";
import {splitTeams} from "../utils";

export default function Teams() {
    const router = useRouter();
    const players = useRecoilValue(playersState);
    const nrOfPlayersPerTeam = useRecoilValue(nrOfPlayersPerTeamState);
    const [teams, setTeams] = useRecoilState(teamsState);
    const [bench, setBench] = useRecoilState(benchState);

    function shuffle() {
        const [newTeams, newBench] = splitTeams(players, nrOfPlayersPerTeam);
        setTeams(newTeams);
        setBench(newBench);
    }

    useEffect(() => {
        if (!teams?.[0]) {
          shuffle();
        }
    }, []);

    return (
        <Stack spacing={10}>
            <Stack spacing={4}>
                <Button
                    size="lg"
                    alignSelf="start"
                    leftIcon={<ChevronLeftIcon />}
                    onClick={() => router.push('/')}
                >
                    Add more players
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
                                <Fragment key={`player-${index}`}>
                                    <Grid templateColumns="50px 1fr" alignItems="center" gap={3}>
                                        <PlayerAvatar key={player?.name} player={player} size="md" />
                                        <Text>{player?.name}</Text>
                                    </Grid>
                                    {team.length !== index + 1 && <Divider /> }
                                </Fragment>
                            ))}
                        </Stack>
                    </Box>
                ))}
            </Stack>
            <Button
                size="lg"
                onClick={shuffle}
                leftIcon={<RepeatIcon />}
            >
                Shuffle teams
            </Button>
        </Stack>
    );
}