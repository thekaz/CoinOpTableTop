import { STATS, orderedStatsList, statsLabelLookup } from '../CONSTANTS';

function statValidate(stats: STATS): string | null {
    const invalidStat = orderedStatsList.find((curr) => stats[curr] > 2 || stats[curr] < -2);
    if (invalidStat) {
        return `Stat ${statsLabelLookup.get(invalidStat)} can't be more than 2`;
    }
    const netStats = orderedStatsList.reduce(
        (prev: number, curr) => stats[curr] + prev, 0
    );
    if (netStats > 2) {
        return 'Stat total cannot exceed 2';
    }
    return null;
}

export default statValidate;
