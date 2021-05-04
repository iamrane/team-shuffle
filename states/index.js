import {atom} from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const configurationState = atom({
    key: 'configurationState',
    default: {
        useLevels: false,
        nrOfPlayersPerTeam: '2',
    },
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
