import {Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import {useRecoilState} from "recoil";
import {AddIcon, RepeatIcon} from "@chakra-ui/icons";
import {viewState, playersState, teamsState, benchState, nrOfPlayersPerTeamState} from '../states';
import Players from "./Players";
import {splitTeams} from "../utils";

function validateName(value) {
    let error

    if (!value) {
        error = "Name is required"
    }

    return error;
}

export default function PlayerForm() {
    const [, setView] = useRecoilState(viewState);
    const [players, setPlayers] = useRecoilState(playersState);
    const [, setTeams] = useRecoilState(teamsState);
    const [, setBench] = useRecoilState(benchState);
    const [nrOfPlayersPerTeam] = useRecoilState(nrOfPlayersPerTeamState);

    return (
        <Stack spacing={6}>
            <Formik
                validateOnBlur={false}
                onSubmit={(values, actions) => {
                    const name = values?.name;
                    const level = values?.level;
                    setPlayers([...players, { name, level }]);
                    actions.resetForm();
                }}
                initialValues={{
                    name: '',
                    level: '3',
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
            {players?.[0] && <Players players={players} />}
            {players?.[3] && (
                <Button
                    size="lg"
                    onClick={() => {
                        const [newTeams, newBench] = splitTeams(players, nrOfPlayersPerTeam);
                        setTeams(newTeams);
                        setBench(newBench);
                        setView('teams');
                    }}
                    leftIcon={<RepeatIcon />}
                >
                    Generate teams
                </Button>
            )}
        </Stack>

    );
}