import {Box, Heading, Stack} from "@chakra-ui/react";
import PlayerAvatar from "./PlayerAvatar";

export default function Bench({ bench }) {

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Heading size="sm" mb={6}>Bench</Heading>
            <Stack spacing={4} direction="row">
                {bench.map(player => <PlayerAvatar key={player?.name} player={player} />)}
            </Stack>
        </Box>
    );
}