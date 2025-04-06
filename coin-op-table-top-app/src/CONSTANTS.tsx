export type STATS = {
    combat: number;
    coordination: number;
    constitution: number;
    cognition: number;
    commonSense: number;
    cooperation: number;
}

type StatsArray = Array<keyof STATS>;

export const orderedStatsList: StatsArray = [
    'combat', 'coordination', 'constitution', 'cognition', 'commonSense', 'cooperation'
];

export const statsLabelLookup: Readonly<Map<keyof STATS, string>> = new Map([
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