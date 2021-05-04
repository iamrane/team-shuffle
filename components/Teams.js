import { Fragment, useEffect } from 'react';
import {useRouter} from "next/router";
import {Heading, Box, Stack, Button} from "@chakra-ui/react";
import {ChevronLeftIcon, RepeatIcon} from "@chakra-ui/icons";
import {useRecoilValue} from "recoil";
import { benchState, teamsState} from "../states";
import {useShuffle} from "../utils";
import PlayerGroup from "./PlayerGroup";

export default function Teams() {
    const shuffle = useShuffle();
    const router = useRouter();
    const teams = useRecoilValue(teamsState);
    const bench = useRecoilValue(benchState);

    useEffect(() => {
        shuffle();
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
                    <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
                        <Heading size="sm" mb={6}>Bench</Heading>
                        <PlayerGroup group={bench} />
                    </Box>
                )}

                {teams.map((team, index) => (
                    <Box key={`team-${index}`} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
                        <Heading size="sm" mb={6}>Team {index + 1}</Heading>
                        <PlayerGroup group={team} />
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