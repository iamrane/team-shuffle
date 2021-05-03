import {useRouter} from "next/router";
import {Box, Button, FormLabel, Heading, Select, Stack} from "@chakra-ui/react";
import {useRecoilState, useSetRecoilState, useRecoilValue} from "recoil";
import {Field, Form, Formik} from "formik";
import {nrOfPlayersPerTeamState, teamsState, playersState, benchState} from '../states';
import {splitTeams} from "../utils";

export default function ConfigurationForm() {
    const router = useRouter();
    const players = useRecoilValue(playersState);
    const [nrOfPlayersPerTeam, setNrOfPlayersPerTeam] = useRecoilState(nrOfPlayersPerTeamState);
    const setTeams = useSetRecoilState(teamsState);
    const setBench = useSetRecoilState(benchState);

    function handleSave(values) {
        const newNrOfPlayersTeam = parseInt(values?.nrOfPlayersPerTeam, 10);
        setNrOfPlayersPerTeam(newNrOfPlayersTeam);
        const [newTeams, newBench] = splitTeams(players, newNrOfPlayersTeam);
        setTeams(newTeams);
        setBench(newBench);

        if (newTeams?.length?.[0]) {
            router.push('/');
        }

        router.back();
    }

    return (
        <Formik
            onSubmit={handleSave}
            initialValues={{
                nrOfPlayersPerTeam,
            }}
        >
            {() => (
                <Form>
                    <Stack spacing={6}>
                        <Box mt={4}>
                            <Heading size="md" mb={6}>Configuration</Heading>
                            <Stack spacing={4}>
                                <Field name="nrOfPlayersPerTeam">
                                    {({ field }) => (
                                        <>
                                            <FormLabel htmlFor="nrOfPlayersPerTeam">Number of player per team</FormLabel>
                                            <Select id="nrOfPlayersPerTeam" {...field}>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </Select>
                                        </>
                                    )}
                                </Field>
                            </Stack>
                        </Box>
                        <Button type="submit" size="lg">
                            Save
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}