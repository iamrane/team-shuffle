import {useRouter} from "next/router";
import {Box, Button, FormLabel, Heading, Stack, FormControl, Switch, Select, useColorMode} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import {Field, Form, Formik} from "formik";
import {configurationState} from '../states';

export default function ConfigurationForm() {
    const router = useRouter();
    const [configuration, setConfiguration] = useRecoilState(configurationState);
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Formik
            onSubmit={values => {
                if (values?.colorMode !== colorMode) {
                    toggleColorMode();
                }

                setConfiguration({
                    nrOfPlayersPerTeam: values?.nrOfPlayersPerTeam,
                    useLevels: values?.useLevels,
                });

                router.back();
            }}
            initialValues={{...configuration, colorMode}}
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
                                <Field name="colorMode">
                                    {({ field }) => (
                                        <FormControl>
                                            <FormLabel htmlFor="colorMode" mb={2}>Color mode</FormLabel>
                                            <Select id="colorMode" {...field}>
                                                <option value="dark">Dark</option>
                                                <option value="light">Light</option>
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                            </Stack>
                        </Box>
                        <Button colorScheme="primary" type="submit" size="lg">
                            Save
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}