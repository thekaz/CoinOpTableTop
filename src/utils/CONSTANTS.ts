export const CROSS_CHAR = '❌';
export const CHECK_CHAR = '✔️';
export const BLANK_CHAR = '__';

export type TSTATS = {
    combat: number,
    coordination: number,
    constitution: number,
    cognition: number,
    commonSense: number,
    cooperation: number,
}

export type TSTAT = keyof TSTATS;

export const DEFAULT_STATS: TSTATS = {
    combat: 0,
    coordination: 0,
    constitution: 0,
    cognition: 0,
    commonSense: 0,
    cooperation: 0,
};

export type TFLIP_RESULT = {
    pass?: boolean,
    auto?: boolean,
    inProgress?: boolean,
};

export type TFLIP_RESULTS = {
    0: TFLIP_RESULT | null,
    1: TFLIP_RESULT | null,
    2: TFLIP_RESULT | null,
    3: TFLIP_RESULT | null,
    4: TFLIP_RESULT | null,
    5: TFLIP_RESULT | null,
    6: TFLIP_RESULT | null,
}

export const DEFAULT_FLIP_RESULTS: TFLIP_RESULTS = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
}

export const MAX_HP = 3;

export const DEFAULT_HP = 2;

export const orderedStatsList: Array<TSTAT> = [
    'combat', 'coordination', 'constitution', 'cognition', 'commonSense', 'cooperation'
];

export type TDC = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const DC_LIST: Array<TDC> = [0, 1,2,3,4,5,6,7];

export const statsLabelLookup: Readonly<Map<TSTAT, string>> = new Map([
    ['combat', 'Combat'],
    ['coordination', 'Coordination'],
    ['constitution', 'Constitution'],
    ['cognition', 'Cognition'],
    ['commonSense', 'Common Sense'],
    ['cooperation', 'Cooperation']
]);

export const challengeRatingLabelLookup: Readonly<Map<TDC, string>> = new Map([
    [0, '? - Unknown'],
    [1, '1 - Trivial'],
    [2, '2 - Simple'],
    [3, '3 - Easy'],
    [4, '4 - 50/50'],
    [5, '5 - Difficult'],
    [6, '6 - Epic'],
    [7, '7 - Legendary'],

])

export const AVAILABLE_POINTS = 2;
export const MIN_STATS = -2;
export const MAX_STATS = 2;
export const FLIP_TOTAL = 7;

export const STORAGE_STATS_KEY = 'stats';
export const STORAGE_POINTS_KEY = 'points';
export const STORAGE_NAME_KEY = 'name';
export const STORAGE_HP_KEY = 'hp';

export const defaultButtonStyle = `
    background: none;
    color: inherit;
    border: 1px solid white;
    padding-right: 2px;
    padding-left: 2px;
    font: inherit;
    outline: inherit;
    margin-left: 2px;
    margin-right: 2px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    &:focus {
        border: 1px solid teal;
    }
`;

export const defaultSelectStyle = `
    border: 1px solid white;
    margin-left: 2px;
    margin-right: 2px;
    cursor: pointer;
`;
