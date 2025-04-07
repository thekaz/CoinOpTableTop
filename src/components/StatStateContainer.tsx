import React, {useState} from 'react';
import StatsBlock from './StatsBlock';
import { TSTATS } from '../CONSTANTS';
import CoinFlipArea from './CoinFlipArea';

function StatStateContainer() {
    const defaultStats = {
        combat: 0,
        coordination: 0,
        constitution: 0,
        cognition: 0,
        commonSense: 0,
        cooperation: 0,
    } as TSTATS;
    const [stats, setStats] = useState(defaultStats);

    return <>
        <StatsBlock stats={stats} setStats={setStats} />
        <CoinFlipArea stats={stats}/>
    </>
}

export default StatStateContainer;