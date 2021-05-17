import { Box, Center, Heading, IconButton, Container, useColorModeValue } from '@chakra-ui/react';
import { useResetRecoilState } from 'recoil';
import { SettingsIcon, DeleteIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { teamsState, benchState, playersState, useLevelsState, nrOfPlayersPerTeamState } from '../states';

export default function Top() {
	const bg = useColorModeValue('whiteAlpha.800', 'blackAlpha.800');
	const router = useRouter();
	const resetTeams = useResetRecoilState(teamsState);
	const resetBench = useResetRecoilState(benchState);
	const resetPlayers = useResetRecoilState(playersState);
	const resetNrOfPlayers = useResetRecoilState(nrOfPlayersPerTeamState);
	const resetUseLevels = useResetRecoilState(useLevelsState);

	function reset() {
		resetTeams();
		resetBench();
		resetPlayers();
		resetNrOfPlayers();
		resetUseLevels();
	}

	return (
		<Box zIndex={1} pos="fixed" top={0} left={0} bg={bg} w="100%" h="60px" boxShadow="base">
			<Container pos="relative" maxW="lg">
				<Center pos="absolute" top={0} left={0} h="60px" px={4}>
					<IconButton
						size="lg"
						onClick={() => router.push('/configuration')}
						aria-label="Settings"
						icon={<SettingsIcon />}
					/>
				</Center>
				<Center h="60px" w="100%">
					<Heading size="lg">Delalag</Heading>
				</Center>
				<Center pos="absolute" top={0} right={0} h="60px" px={4}>
					<IconButton size="lg" onClick={reset} aria-label="Settings" icon={<DeleteIcon />} />
				</Center>
			</Container>
		</Box>
	);
}
