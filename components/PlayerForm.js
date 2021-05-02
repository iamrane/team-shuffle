import {Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack} from "@chakra-ui/react";
import {Field, Form} from "formik";
import {useRecoilState} from "recoil";
import {AddIcon, ChevronLeftIcon} from "@chakra-ui/icons";
import { viewState } from '../states';

function validateName(value) {
    let error

    if (!value) {
        error = "Name is required"
    }

    return error;
}

export default function PlayerForm() {
    const [, setView] = useRecoilState(viewState);
    return (
        <Form>
            <Stack spacing={4}>
                <Button
                    size="lg"
                    w="100px"
                    leftIcon={<ChevronLeftIcon />}
                    onClick={() => setView('configuration')}
                >
                    Go back
                </Button>

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
    );
}