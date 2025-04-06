export interface STATS {
    combat: number;
    coordination: number;
    constitution: number;
    cognition: number;
    commonSense: number;
    cooperation: number;
}

type StatsArray = Array<keyof STATS>;

export const orderedStatsList: StatsArray = ['combat', 'coordination', 'constitution', 'cognition', 'commonSense', 'cooperation'];