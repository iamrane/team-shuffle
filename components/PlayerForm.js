import {Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import {useRecoilState} from "recoil";
import { useRouter } from 'next/router'
import {AddIcon} from "@chakra-ui/icons";
import {playersState} from '../states';
import PlayerGroup from "./PlayerGroup";

export default function PlayerForm() {
    const router = useRouter();
    const [players, setPlayers] = useRecoilState(playersState);

    function validateName(value) {
        let error

        if (!value) {
            error = "Name is required"
        }

        if (players.find(p => p.name === value)) {
            error = "Name already exists"
        }

        return error;
    }


    return (
        <Stack spacing={6}>
            <Formik
                validateOnBlur={false}
                initialValues={{
                    name: '',
                    level: '3',
                }}
                onSubmit={(values, actions) => {
                    const name = values?.name;
                    const level = values?.level;
                    setPlayers([...players, { name, level }]);
                    actions.resetForm();
                }}
            >
                {() => (
                    <Form>
                        <Stack spacing={4}>
                            <Heading size="md">Add player</Heading>

                            <Stack spacing={4} direction="row">
                                <Field name="name" validate={validateName}>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                                            <FormLabel htmlFor="name">Full name</FormLabel>
                                            <Input {...field} id="name" />
                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Stack>

                            <Button size="lg" type="submit" leftIcon={<AddIcon />}>Add</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
            {players?.[0] && (
                <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Heading size="sm" mb={6}>Players</Heading>
                    <PlayerGroup group={players} editable />
                </Box>
            )}
            {players?.[3] && (
                <Button
                    size="lg"
                    onClick={() => {
                        router.push('/teams');
                    }}
                >
                    Next
                </Button>
            )}
        </Stack>

    );
}