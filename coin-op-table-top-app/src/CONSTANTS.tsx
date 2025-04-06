export interface ISTATS {
    combat: number;
    coordination: number;
    constitution: number;
    cognition: number;
    commonSense: number;
    cooperation: number;
}

export type TSTAT = keyof ISTATS;

export const DEFAULT_STATS: ISTATS = {
    combat: 0,
    coordination: 0,
    constitution: 0,
    cognition: 0,
    commonSense: 0,
    cooperation: 0,
};

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