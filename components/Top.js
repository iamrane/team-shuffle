import {Box, Center, Heading, Menu, MenuButton, MenuList, MenuItem, IconButton, Container} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Top({onMenuClick}) {
    function handleMenuClick(view) {
        return event => {
            event.preventDefault();
            onMenuClick(view);
        }
    }

    return (
        <Box zIndex={1} pos="fixed" top={0} left={0} bg="whiteAlpha.200" w="100%" h="50px" boxShadow="base">
            <Container pos="relative" maxW="lg">
                <Center pos="absolute" top={0} left={0} h="50px" px={4}>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<HamburgerIcon />}
                            variant="outline"
                        />
                        <MenuList>
                            <MenuItem command="⌘T" onClick={handleMenuClick('configuration')}>
                                Configure
                            </MenuItem>
                            <MenuItem command="⌘N" onClick={handleMenuClick('players')}>
                                Add players
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Center>
                <Center h="50px" w="100%">
                    <Heading size="lg">Dela lag app</Heading>
                </Center>
            </Container>
        </Box>
    );
}