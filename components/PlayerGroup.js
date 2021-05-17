import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import {
	Button,
	Divider,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
	IconButton,
	Input,
	Select,
	Stack,
	Text,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import PlayerAvatar from './PlayerAvatar';
import { benchState, playersState, teamsState, useLevelsState } from '../states';

const itemVariants = {
	hidden: (i) => ({
		opacity: 0,
		y: 36,
		transition: {
			delay: i * 0.1,
		},
	}),
	visible: (i) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.1,
		},
	}),
};

export default function PlayerGroup({ group, editable }) {
	const [players, setPlayers] = useRecoilState(playersState);
	const [teams, setTeams] = useRecoilState(teamsState);
	const [bench, setBench] = useRecoilState(benchState);
	const useLevels = useRecoilValue(useLevelsState);
	const [inEdit, setInEdit] = useState();

	function validateName(value) {
		let error;

		if (!value) {
			error = 'Name is required';
		}

		if (players.filter((p) => p.name !== inEdit.name).find((p) => p.name === value)) {
			error = 'Name already exists';
		}

		return error;
	}

	function deletePlayer(player) {
		return () => {
			setPlayers(players.filter((p) => p.name !== player.name));
			setTeams(teams.map((team) => team?.filter((p) => p.name !== player.name)));
			setBench(bench?.filter((p) => p.name !== player.name));
		};
	}

	return (
		<Stack spacing={4}>
			{group.map((player, index) => (
				<motion.div
					key={player?.name}
					variants={itemVariants}
					initial="hidden"
					animate="visible"
					custom={index}
				>
					{inEdit?.name === player?.name ? (
						<Formik
							validateOnBlur={false}
							initialValues={inEdit}
							onSubmit={(values) => {
								setPlayers(players.map((p) => (p.name === inEdit?.name ? values : p)));
								setTeams(teams.map((team) => team.map((p) => (p.name === inEdit?.name ? values : p))));
								setBench(bench.map((p) => (p.name === inEdit?.name ? values : p)));
								setInEdit(false);
							}}
						>
							{() => (
								<Form>
									<Grid
										templateColumns="1fr 1fr"
										templateRows="auto auto"
										alignItems="center"
										gap={3}
									>
										<GridItem colSpan={2}>
											<Stack spacing={4}>
												<Field name="name" validate={validateName}>
													{({ field, form }) => (
														<FormControl isInvalid={form.errors.name && form.touched.name}>
															<Input {...field} id="name" autoFocus />
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
										</GridItem>
										<GridItem>
											<Button colorScheme="primary" isFullWidth type="submit">
												Save
											</Button>
										</GridItem>
										<GridItem>
											<Button
												colorScheme="primary"
												variant="outline"
												isFullWidth
												onClick={() => setInEdit(false)}
											>
												Cancel
											</Button>
										</GridItem>
									</Grid>
								</Form>
							)}
						</Formik>
					) : (
						<motion.div layoutId={player?.name}>
							<Grid templateColumns="1fr auto" alignItems="center" gap={3}>
								<Grid templateColumns="50px 1fr" alignItems="center" gap={3}>
									<PlayerAvatar key={player?.name} player={player} size="md" />
									<Text>{player?.name}</Text>
								</Grid>
								{editable && (
									<Stack direction="row" wrap="nowrap" spacing={4}>
										<IconButton
											aria-label="Edit"
											icon={<EditIcon />}
											onClick={() => setInEdit(player)}
										/>
										<IconButton
											aria-label="Delete"
											icon={<DeleteIcon />}
											onClick={deletePlayer(player)}
										/>
									</Stack>
								)}
							</Grid>
						</motion.div>
					)}
					{group.length !== index + 1 && <Divider mt={4} />}
				</motion.div>
			))}
		</Stack>
	);
}
