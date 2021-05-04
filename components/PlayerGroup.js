import {Fragment, useState} from "react";
import {useRecoilState} from "recoil";
import {Field, Form, Formik} from "formik";
import {
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    Grid,
    IconButton,
    Input,
    Stack,
    Text
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import PlayerAvatar from "./PlayerAvatar";
import {benchState, playersState, teamsState} from "../states";

export default function PlayerGroup({ group, editable }) {
    const [players, setPlayers] = useRecoilState(playersState);
    const [teams, setTeams] = useRecoilState(teamsState);
    const [bench, setBench] = useRecoilState(benchState);
    const [inEdit, setInEdit] = useState();

    function validateName(value) {
        let error

        if (!value) {
            error = "Name is required"
        }

        if (players.filter(p => p.name !== inEdit.name).find(p => p.name === value)) {
            error = "Name already exists"
        }

        return error;
    }

    function deletePlayer(player) {
        return () => {
            setPlayers(players.filter(p => p.name !== player.name));
            setTeams(teams.map(team => team?.filter(p => p.name !== player.name)));
            setBench(bench?.filter(p => p.name !== player.name));
        }
    }

    return (
        <Stack spacing={4}>
            {group.map((player, index) => (
                <Fragment key={`player-${index}`}>
                    {inEdit?.name === player?.name ? (
                        <Grid templateColumns="50px 1fr" alignItems="center" gap={3}>
                            <PlayerAvatar key={player?.name} player={player} size="md" />
                            <Formik
                                validateOnBlur={false}
                                initialValues={inEdit}
                                onSubmit={(values) => {
                                    setPlayers(players.map(p => p.name === inEdit?.name ? values : p));
                                    setTeams(teams.map(team => team.map(p => p.name === inEdit?.name ? values : p)));
                                    setBench(bench.map(p => p.name === inEdit?.name ? values : p));
                                    setInEdit(false);
                                }}
                            >
                                {() => (
                                    <Form>
                                        <Grid templateColumns="1fr auto auto" alignItems="center" gap={3}>
                                            <Field name="name" validate={validateName}>
                                                {({field, form}) => (
                                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                        <Input {...field} id="name" autoFocus />
                                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Button type="submit">Save</Button>
                                            <Button onClick={() => setInEdit(false)}>Cancel</Button>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </Grid>
                    ) : (
                        <Grid templateColumns="1fr auto" alignItems="center" gap={3}>
                            <Grid templateColumns="50px 1fr" alignItems="center" gap={3}>
                                <PlayerAvatar key={player?.name} player={player} size="md" />
                                <Text>{player?.name}</Text>
                            </Grid>
                            {editable && (
                                <Stack direction="row" wrap="nowrap" spacing={4}>
                                    <IconButton aria-label="Edit" icon={<EditIcon />} onClick={() => setInEdit(player)}/>
                                    <IconButton aria-label="Delete" icon={<DeleteIcon />} onClick={deletePlayer(player)} />
                                </Stack>
                            )}
                        </Grid>
                    )}
                    {group.length !== index + 1 && <Divider /> }
                </Fragment>
            ))}
        </Stack>
    )
}