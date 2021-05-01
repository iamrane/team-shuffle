import {Box, FormControl, FormLabel, Heading, Select, Stack} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import { nrOfPlayersPerTeamState } from '../states';

export default function ConfigurationForm() {
    const [nrOfPlayersPerTeam, setNrOfPlayersPerTeam] = useRecoilState(nrOfPlayersPerTeamState);

    function onNrOfPlayersPerTeamChange(event) {
        const value = parseInt(event.target.value);
        setNrOfPlayersPerTeam(value);
    }

    return (
        <Box mt={4}>
            <Heading size="md" mb={6}>Configuration</Heading>

            <Stack spacing={4}>
                <FormControl>
                    <FormLabel htmlFor="numberOfPlayerPerTeam">Number of player per team</FormLabel>
                    <Select
                        id="numberOfPlayerPerTeam"
                        onChange={onNrOfPlayersPerTeamChange}
                        value={nrOfPlayersPerTeam}
                    >
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Select>
                </FormControl>
            </Stack>
        </Box>
    );
}