import {Box, Button, FormLabel, Heading, Select, Stack} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import {Field, Form, Formik} from "formik";
import {nrOfPlayersPerTeamState, viewState} from '../states';

export default function ConfigurationForm() {
    const [,setView] = useRecoilState(viewState);
    const [nrOfPlayersPerTeam, setNrOfPlayersPerTeam] = useRecoilState(nrOfPlayersPerTeamState);

    return (
        <Formik
            onSubmit={(values) => {
                setNrOfPlayersPerTeam(parseInt(values?.nrOfPlayersPerTeam, 10));
                setView('players');
            }}
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