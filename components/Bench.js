import {Box, Divider, Grid, Heading, Stack, Text} from "@chakra-ui/react";
import PlayerAvatar from "./PlayerAvatar";
import {Fragment} from "react";
import {useRecoilValue} from "recoil";
import {benchState} from "../states";

export default function Bench() {
    const bench = useRecoilValue(benchState);

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Heading size="sm" mb={6}>Bench</Heading>
            <Stack spacing={4} direction="row">
                {bench.map((player, index) => (
                    <Fragment key={`player-${index}`}>
                        <Grid templateColumns="50px 1fr" alignItems="center" gap={3}>
                            <PlayerAvatar key={player?.name} player={player} size="md" />
                            <Text>{player?.name}</Text>
                        </Grid>
                        {bench.length !== index + 1 && <Divider /> }
                    </Fragment>
                ))}
            </Stack>
        </Box>
    );
}