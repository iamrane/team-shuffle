import { useEffect } from 'react';
import {useRouter} from "next/router";
import {AnimateSharedLayout} from "framer-motion";
import {Heading, Box, Stack, Button} from "@chakra-ui/react";
import {ChevronLeftIcon, RepeatIcon} from "@chakra-ui/icons";
import {useRecoilValue} from "recoil";
import {benchState, configurationState, teamsState} from "../states";
import {useShuffle, isEmptyArray, teamSum} from "../utils";
import PlayerGroup from "./PlayerGroup";

export default function Teams() {
    const shuffle = useShuffle();
    const router = useRouter();
    const teams = useRecoilValue(teamsState);
    const bench = useRecoilValue(benchState);
    const configuration = useRecoilValue(configurationState);

    useEffect(() => {
        shuffle();
    }, []);

    return (
        <AnimateSharedLayout>
            <Stack spacing={10}>
                <Stack spacing={4}>
                    <Button
                        colorScheme="primary"
                        size="lg"
                        alignSelf="start"
                        leftIcon={<ChevronLeftIcon />}
                        onClick={() => router.push('/')}
                    >
                        Players
                    </Button>
                    <Heading size="md">Teams</Heading>

                    {!isEmptyArray(bench) && (
                        <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <Heading size="sm" mb={6}>
                                <>Bench</>
                                {configuration.useLevels && (
                                    <> ({teamSum(bench)})</>
                                )}
                            </Heading>
                            <PlayerGroup group={bench} />
                        </Box>
                    )}

                    {teams.map((team, index) => (
                        <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" key={`team-${index}`}>
                            <Heading size="sm" mb={6}>
                                <>Team {index + 1}</>
                                {configuration.useLevels && (
                                    <> ({teamSum(team)})</>
                                )}
                            </Heading>
                            <PlayerGroup group={team} />
                        </Box>
                    ))}
                </Stack>
                <Button
                    colorScheme="primary"
                    size="lg"
                    onClick={shuffle}
                    leftIcon={<RepeatIcon />}
                >
                    Shuffle teams
                </Button>
            </Stack>
        </AnimateSharedLayout>
    );
}