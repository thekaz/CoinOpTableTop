import { AVAILABLE_POINTS, MAX_STATS, MIN_STATS, TSTAT, TSTATS } from "./CONSTANTS";

export function validateStats(stats: TSTATS, points: number): boolean {
    // check for invalid stat
    const invalidStatValue = Object.keys(stats).find((statStr) => {
        const stat = statStr as TSTAT;
        return stats[stat] > MAX_STATS || stats[stat] < MIN_STATS;
    });
    if (invalidStatValue) {
        return false;
    }

    // check for invalid total stats
    const totalStats = Object.keys(stats).reduce((prev, statStr) => {
        const stat = statStr as TSTAT;
        return prev+stats[stat];
    }, points);
    if (totalStats !== AVAILABLE_POINTS) {
        return false
    }

    return true;
}