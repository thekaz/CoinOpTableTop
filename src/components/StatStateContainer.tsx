import React, {useCallback, useState} from 'react';
import StatsBlock from './StatsBlock';
import { AVAILABLE_POINTS, LOCAL_STORE_POINTS_KEY, LOCAL_STORE_STATS_KEY, TSTATS } from '../utils/CONSTANTS';
import CoinFlipArea from './CoinFlipArea';

const defaultStats = {
    combat: 0,
    coordination: 0,
    constitution: 0,
    cognition: 0,
    commonSense: 0,
    cooperation: 0,
} as TSTATS;

const localStorageStats = localStorage.getItem(LOCAL_STORE_STATS_KEY);
const initialStats: TSTATS = localStorageStats ? JSON.parse(localStorageStats) as TSTATS : defaultStats;

const localStoragePoints = localStorage.getItem(LOCAL_STORE_POINTS_KEY);
const initialPoints: number = localStoragePoints ? parseInt(localStoragePoints) : AVAILABLE_POINTS;

function StatStateContainer() {
    const [stats, setStats] = useState(initialStats);
    const [availablePoints, setAvailablePoints] = useState(initialPoints);

    const setStatsCallback = useCallback((newStats: TSTATS) => {
        setStats(newStats);
        localStorage.setItem(LOCAL_STORE_STATS_KEY, JSON.stringify(newStats));
    }, [setStats]);

    const setAvailablePointsCallback = useCallback((points: number) => {
        setAvailablePoints(points);
        localStorage.setItem(LOCAL_STORE_POINTS_KEY, points.toString());
    }, [setAvailablePoints])

    return <>
        <StatsBlock stats={stats}
            setStats={setStatsCallback}
            availablePoints={availablePoints}
            setAvailablePoints={setAvailablePointsCallback}
        />
        <CoinFlipArea stats={stats}/>
    </>
}

export default StatStateContainer;