import {useCallback} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {benchState, configurationState, playersState, teamsState} from "../states";

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
    return team.reduce((acc, player) =>
        player?.level ? acc + parseInt(player.level, 10) : acc
    ,0);
}

function teamsSort(nrOfPlayersPerTeam) {
    return (a,b) => {
        if (b.length === nrOfPlayersPerTeam) {
            return -1
        }

        return teamSum(a) - teamSum(b)
    }
}

function splitTeams(players, configuration) {
    const nrOfPlayersPerTeam = parseInt(configuration.nrOfPlayersPerTeam, 10);
    const useLevels = configuration?.useLevels;
    let nrOfTeams = Math.floor(players.length / nrOfPlayersPerTeam);
    let bench = [...players]
    let teams = []

    if (useLevels) {
        teams = Array.from(Array(nrOfTeams), () => []);
        bench.sort((a, b) => b.level - a.level);
        while (nrOfTeams > 0 && bench.length) {
            teams.sort(teamsSort(nrOfPlayersPerTeam));
            teams[0].push(bench.shift());

            if (teams[0]?.length === nrOfPlayersPerTeam) {
                nrOfTeams -= 1;
            }
        }
    } else {
        bench = shuffle(bench);
        while (nrOfTeams > 0 && bench.length) {
            teams.push(bench.splice(0, nrOfPlayersPerTeam))
            nrOfTeams += 1;
        }
    }


    return [ teams, bench ];
}

export function useShuffle() {
    const players = useRecoilValue(playersState);
    const configuration = useRecoilValue(configurationState);
    const setTeams = useSetRecoilState(teamsState);
    const setBench = useSetRecoilState(benchState);

    return useCallback(() => {
        const [teams, bench] = splitTeams(players, configuration);
        setTeams(teams);
        setBench(bench);
        return [teams, bench];
    }, [players, configuration]);
}

export function isEmptyArray(array) {
    return !array?.[0];
}