import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Stack } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { AddIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { playersState, useLevelsState } from '../states';
import PlayerGroup from './PlayerGroup';

export default function PlayerForm() {
	const router = useRouter();
	const [players, setPlayers] = useRecoilState(playersState);
	const useLevels = useRecoilValue(useLevelsState);

	function validateName(value) {
		let error;

		if (!value) {
			error = 'Name is required';
		}

		if (players.find((p) => p.name === value)) {
			error = 'Name already exists';
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
								{useLevels && (
									<Field name="level">
										{({ field }) => (
											<FormControl>
												<FormLabel htmlFor="level">Players level</FormLabel>
												<Select {...field}>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
												</Select>
											</FormControl>
										)}
									</Field>
								)}
							</Stack>

							<Button colorScheme="primary" size="lg" type="submit" leftIcon={<AddIcon />}>
								Add
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
			{players?.[0] && (
				<Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
					<Heading size="sm" mb={6}>
						Players
					</Heading>
					<PlayerGroup group={players} editable />
				</Box>
			)}
			{players?.[3] && (
				<Button
					colorScheme="primary"
					rightIcon={<ChevronRightIcon />}
					size="lg"
					onClick={() => {
						router.push('/teams');
					}}
				>
					Teams
				</Button>
			)}
		</Stack>
	);
}
