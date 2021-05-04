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

function splitTeams(players, nrOfPlayersPerTeam) {
    const teams = [];
    let nrOfTeams = Math.floor(players.length / nrOfPlayersPerTeam);
    let bench = shuffle([...players]);

    while (nrOfTeams > 0) {
        teams.push(bench.splice(0, Math.floor(nrOfPlayersPerTeam)))
        nrOfTeams--;
    }

    return [ teams, bench ];
}

export function useShuffle() {
    const players = useRecoilValue(playersState);
    const configuration = useRecoilValue(configurationState);
    const setTeams = useSetRecoilState(teamsState);
    const setBench = useSetRecoilState(benchState);

    return useCallback(() => {
        const [teams, bench] = splitTeams(players, parseInt(configuration.nrOfPlayersPerTeam, 10));
        setTeams(teams);
        setBench(bench);
        return [teams, bench];
    }, [players, configuration]);
}

export function isEmptyArray(array) {
    return !array?.[0];
}