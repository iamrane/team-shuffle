import {atom} from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const nrOfPlayersPerTeamState = atom({
    key: 'nrOfPlayersPerTeamState',
    default: 2,
    effects_UNSTABLE: [persistAtom],
});

export const playersState = atom({
    key: 'playersState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const benchState = atom({
    key: 'benchState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const teamsState = atom({
    key: 'teamsState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
