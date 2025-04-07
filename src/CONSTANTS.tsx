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
    pass: boolean,
    auto: boolean
};

export type TFLIP_RESULTS = {
    1: TFLIP_RESULT | null,
    2: TFLIP_RESULT | null,
    3: TFLIP_RESULT | null,
    4: TFLIP_RESULT | null,
    5: TFLIP_RESULT | null,
    6: TFLIP_RESULT | null,
    7: TFLIP_RESULT | null,
}

export const DEFAULT_FLIP_RESULTS: TFLIP_RESULTS = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
}

export const orderedStatsList: Array<TSTAT> = [
    'combat', 'coordination', 'constitution', 'cognition', 'commonSense', 'cooperation'
];

export const statsLabelLookup: Readonly<Map<TSTAT, string>> = new Map([
    ['combat', 'Combat'],
    ['coordination', 'Coordination'],
    ['constitution', 'Constitution'],
    ['cognition', 'Cognition'],
    ['commonSense', 'Common Sense'],
    ['cooperation', 'Cooperation']
]);

export const AVAILABLE_POINTS = 2;
export const MIN_STATS = -2;
export const MAX_STATS = 2;
export const FLIP_TOTAL = 7;