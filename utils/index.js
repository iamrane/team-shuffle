import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { benchState, useLevelsState, nrOfPlayersPerTeamState, playersState, teamsState } from '../states';

function shuffle(array) {
	let currentIndex = array.length;
	let temporaryValue;
	let randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

export function teamSum(team) {
	return team.reduce((acc, player) => (player?.level ? acc + parseInt(player.level, 10) : acc), 0);
}

function teamsSort(nrOfPlayersPerTeam) {
	return (a, b) => {
		if (b.length === nrOfPlayersPerTeam) {
			return -1;
		}

		return teamSum(a) - teamSum(b);
	};
}

function getRandomIndex(teams) {
	const targetSum = teamSum(teams[0]);
	const indexesToChooseFrom = teams.reduce((acc, team, index) => {
		if (targetSum === teamSum(team)) {
			return [...acc, index];
		}
		return acc;
	}, []);

	return indexesToChooseFrom[Math.floor(Math.random() * indexesToChooseFrom.length)];
}

function splitTeams(players, configuration) {
	const nrOfPlayersPerTeam = parseInt(configuration?.nrOfPlayersPerTeam, 10);
	const useLevels = configuration?.useLevels;
	let nrOfTeams = Math.floor(players.length / nrOfPlayersPerTeam);
	let bench = [...players];
	let teams = [];

	if (useLevels) {
		// Create all teams before hand
		teams = Array.from(Array(nrOfTeams), () => []);

		// Sort bench so the best are in the top
		bench.sort((a, b) => b.level - a.level);
		while (nrOfTeams > 0 && bench.length) {
			// Sort team so the team with the lowest total score is in the top
			teams.sort(teamsSort(nrOfPlayersPerTeam));
			// Get a random index from all teams with the same score as the team with the lowest score
			const randomIndex = getRandomIndex(teams);
			// Place the best player in that team
			teams[randomIndex].push(bench.shift());
			//If that team is full, reduce it with one.
			if (teams[randomIndex]?.length === nrOfPlayersPerTeam) {
				nrOfTeams -= 1;
			}
		}
	} else {
		// Shuffle the bench
		bench = shuffle(bench);
		while (nrOfTeams > 0 && bench.length) {
			// Place as many players from the bench into each team
			teams.push(bench.splice(0, nrOfPlayersPerTeam));
			nrOfTeams += 1;
		}
	}

	return [teams, bench];
}

export function useShuffle() {
	const players = useRecoilValue(playersState);
	const useLevels = useRecoilValue(useLevelsState);
	const nrOfPlayersPerTeam = useRecoilValue(nrOfPlayersPerTeamState);
	const setTeams = useSetRecoilState(teamsState);
	const setBench = useSetRecoilState(benchState);

	return useCallback(() => {
		const [teams, bench] = splitTeams(players, { useLevels, nrOfPlayersPerTeam });
		setTeams(teams);
		setBench(bench);
		return [teams, bench];
	}, [players, nrOfPlayersPerTeam, useLevels]);
}

export function isEmptyArray(array) {
	return !array?.[0];
}
