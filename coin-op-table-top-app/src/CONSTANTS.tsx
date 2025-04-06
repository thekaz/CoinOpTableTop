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