import {Box, Center, Heading, IconButton, Container} from "@chakra-ui/react";
import { useResetRecoilState } from 'recoil';
import { SettingsIcon, DeleteIcon } from "@chakra-ui/icons";
import {useRouter} from "next/router";
import { teamsState, benchState, playersState, nrOfPlayersPerTeamState } from "../states";

export default function Top() {
    const router = useRouter();
    const resetTeams = useResetRecoilState(teamsState);
    const resetBench = useResetRecoilState(benchState);
    const resetPlayers = useResetRecoilState(playersState);
    const resetNrOfPlayersPerTeamState = useResetRecoilState(nrOfPlayersPerTeamState);

    function reset() {
        resetTeams();
        resetBench();
        resetPlayers();
        resetNrOfPlayersPerTeamState();
    }

    return (
        <Box zIndex={1} pos="fixed" top={0} left={0} bg="gray.700" w="100%" h="60px" boxShadow="base">
            <Container pos="relative" maxW="lg">
                <Center pos="absolute" top={0} left={0} h="60px" px={4}>
                    <IconButton size="lg" onClick={() => router.push('/configuration')} aria-label="Settings" icon={<SettingsIcon />} />
                </Center>
                <Center h="60px" w="100%">
                    <Heading size="lg">Team Shuffle</Heading>
                </Center>
                <Center pos="absolute" top={0} right={0} h="60px" px={4}>
                    <IconButton size="lg" onClick={reset} aria-label="Settings" icon={<DeleteIcon />} />
                </Center>
            </Container>
        </Box>
    );
}