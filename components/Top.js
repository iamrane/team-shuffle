import {Box, Center, Heading, IconButton, Container} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import {useRouter} from "next/router";

export default function Top() {
    const router = useRouter();

    return (
        <Box zIndex={1} pos="fixed" top={0} left={0} bg="whiteAlpha.200" w="100%" h="60px" boxShadow="base">
            <Container pos="relative" maxW="lg">
                <Center pos="absolute" top={0} left={0} h="60px" px={4}>
                    <IconButton size="lg" onClick={() => router.push('/configuration')} aria-label="Settings" icon={<SettingsIcon />} />
                </Center>
                <Center h="60px" w="100%">
                    <Heading size="lg">Dela lag app</Heading>
                </Center>
            </Container>
        </Box>
    );
}