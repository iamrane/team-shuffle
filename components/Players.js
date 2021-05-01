import {Heading, Stack, Button, AvatarGroup, Avatar} from "@chakra-ui/react";
import {ChevronLeftIcon} from '@chakra-ui/icons';
import {useRecoilState} from "recoil";
import {playersState} from "../states";

export default function Players() {
    const [players] = useRecoilState(playersState);
    return (
        <Stack spacing={6}>
            <Heading size="md">Players</Heading>
            <AvatarGroup size="md" max={10}>
                {players.map(player => <Avatar key={player?.name} name={player?.name} />)}
            </AvatarGroup>
        </Stack>
    );
}