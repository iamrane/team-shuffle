import { useRouter } from 'next/router';
import { Box, Button, FormLabel, Heading, Stack, FormControl, Switch, Select, useColorMode } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { nrOfPlayersPerTeamState, useLevelsState } from '../states';
import { ChevronLeftIcon } from '@chakra-ui/icons';

export default function ConfigurationForm() {
	const router = useRouter();
	const [useLevels, setUseLevel] = useRecoilState(useLevelsState);
	const [nrOfPlayersPerTeam, setNrOfPlayersPerTeam] = useRecoilState(nrOfPlayersPerTeamState);
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Stack spacing={4}>
			<Button
				colorScheme="primary"
				size="lg"
				alignSelf="start"
				leftIcon={<ChevronLeftIcon />}
				onClick={router.back}
			>
				Back
			</Button>
			<Box mt={4}>
				<Heading size="md" mb={6}>
					Configuration
				</Heading>
				<Stack spacing={4}>
					<FormControl>
						<FormLabel htmlFor="nrOfPlayersPerTeam" mb={2}>
							Number of player per team
						</FormLabel>
						<Select
							id="nrOfPlayersPerTeam"
							value={nrOfPlayersPerTeam}
							onChange={(event) => setNrOfPlayersPerTeam(event.target.value)}
						>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</Select>
					</FormControl>

					<FormControl display="flex" alignItems="center">
						<FormLabel htmlFor="useLevels" mb="0">
							Use level on players?
						</FormLabel>
						<Switch
							isChecked={useLevels}
							id="useLevels"
							onChange={(event) => setUseLevel(event.target.value)}
						/>
					</FormControl>

					<FormControl display="flex" alignItems="center">
						<FormLabel htmlFor="useLevels" mb="0">
							Dark mode
						</FormLabel>
						<Switch isChecked={colorMode === 'dark'} id="darkMode" onChange={toggleColorMode} />
					</FormControl>
				</Stack>
			</Box>
		</Stack>
	);
}
