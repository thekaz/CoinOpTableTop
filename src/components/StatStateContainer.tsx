import React, {useCallback, useState} from 'react';
import StatsBlock from './StatsBlock';
import {
    AVAILABLE_POINTS, 
    LOCAL_STORE_NAME_KEY, 
    LOCAL_STORE_POINTS_KEY, 
    LOCAL_STORE_STATS_KEY, 
    TSTATS
} from '../utils/CONSTANTS';
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

const localStorageName = localStorage.getItem(LOCAL_STORE_NAME_KEY);
const initialName: string = localStorageName || '';

function StatStateContainer() {
    const [stats, setStats] = useState(initialStats);
    const [availablePoints, setAvailablePoints] = useState(initialPoints);
    const [name, setName] = useState(initialName);

    const setStatsCallback = useCallback((newStats: TSTATS) => {
        setStats(newStats);
        localStorage.setItem(LOCAL_STORE_STATS_KEY, JSON.stringify(newStats));
    }, [setStats]);

    const setAvailablePointsCallback = useCallback((newPoints: number) => {
        setAvailablePoints(newPoints);
        localStorage.setItem(LOCAL_STORE_POINTS_KEY, newPoints.toString());
    }, [setAvailablePoints])

    const setNameCallback = useCallback((newName: string) => {
        setName(newName);
        localStorage.setItem(LOCAL_STORE_NAME_KEY, newName);
    }, [setName])

    return <>
        <StatsBlock stats={stats}
            setStats={setStatsCallback}
            availablePoints={availablePoints}
            setAvailablePoints={setAvailablePointsCallback}
            name={name}
            setName={setNameCallback}
        />
        <CoinFlipArea stats={stats}/>
    </>
}

export default StatStateContainer;