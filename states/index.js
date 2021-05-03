import {atom} from "recoil";

export const viewState = atom({
    key: 'viewState',
    default: 'players',
});

export const nrOfPlayersPerTeamState = atom({
    key: 'nrOfPlayersPerTeamState',
    default: 2,
});

export const playersState = atom({
    key: 'playersState',
    default: [],
});

export const benchState = atom({
    key: 'benchState',
    default: [],
});

export const teamsState = atom({
    key: 'teamsState',
    default: [],
});
