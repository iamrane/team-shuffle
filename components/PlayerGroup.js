import {Fragment} from "react";
import {Divider, Grid, Stack, Text} from "@chakra-ui/react";
import PlayerAvatar from "./PlayerAvatar";

export default function PlayerGroup({ group }) {
    return (
        <Stack spacing={4}>
            {group.map((player, index) => (
                <Fragment key={`player-${index}`}>
                    <Grid templateColumns="50px 1fr" alignItems="center" gap={3}>
                        <PlayerAvatar key={player?.name} player={player} size="md" />
                        <Text>{player?.name}</Text>
                    </Grid>
                    {group.length !== index + 1 && <Divider /> }
                </Fragment>
            ))}
        </Stack>
    )
}