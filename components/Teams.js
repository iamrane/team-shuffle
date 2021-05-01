import {Grid, Heading, Box, Stack, Text, Divider, Button} from "@chakra-ui/react";
import Bench from './Bench';
import PlayerAvatar from "./PlayerAvatar";
import {ChevronLeftIcon} from "@chakra-ui/icons";
import {useRecoilState} from "recoil";
import {benchState, teamsState, viewState} from "../states";

export default function Teams() {
    const [, setView] = useRecoilState(viewState);
    const [teams] = useRecoilState(teamsState);
    const [bench] = useRecoilState(benchState);

    return (
        <Stack spacing={4}>
            <Button
                w="100px"
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
    );
}