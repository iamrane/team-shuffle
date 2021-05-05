import {useRouter} from "next/router";
import {Box, Button, FormLabel, Heading, Stack, FormControl, Switch, Select} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import {Field, Form, Formik} from "formik";
import {configurationState} from '../states';

export default function ConfigurationForm() {
    const router = useRouter();
    const [configuration, setConfiguration] = useRecoilState(configurationState);

    return (
        <Formik
            onSubmit={values => {
                setConfiguration(values);
                router.back();
            }}
            initialValues={configuration}
        >
            {() => (
                <Form>
                    <Stack spacing={6}>
                        <Box mt={4}>
                            <Heading size="md" mb={6}>Configuration</Heading>
                            <Stack spacing={4}>
                                <Field name="nrOfPlayersPerTeam">
                                    {({ field }) => (
                                        <FormControl>
                                            <FormLabel htmlFor="nrOfPlayersPerTeam" mb={2}>Number of player per team</FormLabel>
                                            <Select id="nrOfPlayersPerTeam" {...field}>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="useLevels">
                                    {({ field }) => (
                                        <FormControl display="flex" alignItems="center">
                                            <FormLabel htmlFor="useLevels" mb="0">
                                                Use level on players?
                                            </FormLabel>
                                            <Switch {...field} isChecked={field?.value} id="useLevels" />
                                        </FormControl>
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