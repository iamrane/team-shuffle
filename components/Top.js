import {Box, Center, Heading, IconButton, Container, useColorModeValue} from "@chakra-ui/react";
import { useResetRecoilState } from 'recoil';
import { SettingsIcon, DeleteIcon } from "@chakra-ui/icons";
import {useRouter} from "next/router";
import { teamsState, benchState, playersState, configurationState } from "../states";

export default function Top() {
    const bg = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');
    const router = useRouter();
    const resetTeams = useResetRecoilState(teamsState);
    const resetBench = useResetRecoilState(benchState);
    const resetPlayers = useResetRecoilState(playersState);
    const resetConfiguration = useResetRecoilState(configurationState);

    function reset() {
        resetTeams();
        resetBench();
        resetPlayers();
        resetConfiguration();
    }

    return (
        <Box zIndex={1} pos="fixed" top={0} left={0} bg={bg} w="100%" h="60px" boxShadow="base">
            <Container pos="relative" maxW="lg">
                <Center pos="absolute" top={0} left={0} h="60px" px={4}>
                    <IconButton colorScheme="secondary" size="lg" onClick={() => router.push('/configuration')} aria-label="Settings" icon={<SettingsIcon />} />
                </Center>
                <Center h="60px" w="100%">
                    <Heading size="lg">Team Shuffle</Heading>
                </Center>
                <Center pos="absolute" top={0} right={0} h="60px" px={4}>
                    <IconButton colorScheme="secondary" size="lg" onClick={reset} aria-label="Settings" icon={<DeleteIcon />} />
                </Center>
            </Container>
        </Box>
    );
}