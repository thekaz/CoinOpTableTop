import React, {useCallback, useEffect, useRef, useState} from 'react';
import StatsBlock from './StatsBlock';
import {
    AVAILABLE_POINTS, 
    STORAGE_NAME_KEY, 
    STORAGE_POINTS_KEY, 
    STORAGE_STATS_KEY, 
    TSTATS
} from '../utils/CONSTANTS';
import CoinFlipArea from './CoinFlipArea';
import { validateStats } from '../utils/statsValidator';

const defaultStats = {
    combat: 0,
    coordination: 0,
    constitution: 0,
    cognition: 0,
    commonSense: 0,
    cooperation: 0,
} as TSTATS;

function StatStateContainer() {
    const initialStatsRef = useRef(defaultStats);
    const initialPointsRef = useRef(AVAILABLE_POINTS);
    const initialNameRef = useRef('')

    const [stats, setStats] = useState(initialStatsRef.current);
    const [availablePoints, setAvailablePoints] = useState(initialPointsRef.current);
    const [name, setName] = useState(initialNameRef.current);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);

        const urlStatsBase64 = urlSearchParams.get(STORAGE_STATS_KEY);
        const stats = urlStatsBase64 ? JSON.parse(atob(urlStatsBase64)) as TSTATS : defaultStats;
        const urlStoragePoints = urlSearchParams.get(STORAGE_POINTS_KEY);
        const points = urlStoragePoints ? parseInt(urlStoragePoints) : AVAILABLE_POINTS;

        const isValid = validateStats(stats, points);

        if (isValid) {
            initialStatsRef.current = stats;
            setStats(stats);
            initialPointsRef.current = points;
            setAvailablePoints(points);
        } else {
            initialStatsRef.current = defaultStats;
            setStats(defaultStats);
            initialPointsRef.current = AVAILABLE_POINTS;
            setAvailablePoints(AVAILABLE_POINTS);
        }
        
        const urlStorageName = urlSearchParams.get(STORAGE_NAME_KEY);
        initialNameRef.current = urlStorageName || '';
        setName(initialNameRef.current);
    }, []);

    const setStatsCallback = useCallback((newStats: TSTATS) => {
        const url = new URL(window.location.href);
        setStats(newStats);
        url.searchParams.set(STORAGE_STATS_KEY, btoa(JSON.stringify(newStats)));
        window.history.pushState({}, '', url);
    }, [setStats]);

    const setAvailablePointsCallback = useCallback((newPoints: number) => {
        const url = new URL(window.location.href);
        setAvailablePoints(newPoints);
        url.searchParams.set(STORAGE_POINTS_KEY, newPoints.toString());
        window.history.pushState({}, '', url);
    }, [setAvailablePoints])

    const setNameCallback = useCallback((newName: string) => {
        const url = new URL(window.location.href);
        setName(newName);
        url.searchParams.set(STORAGE_NAME_KEY, newName);
        window.history.pushState({}, '', url);
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