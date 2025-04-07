import React, {useState, useCallback} from 'react';
import { TSTATS, AVAILABLE_POINTS, DEFAULT_STATS } from '../CONSTANTS';
import StatRow from './StatRow';
import styled from '@emotion/styled';

const StyledDiv = styled.div`padding:12px;`

interface PROPS {
    stats: TSTATS,
    setStats: (stats: TSTATS) => void,
}

function StatsBlock({stats, setStats}: PROPS) {
    const [inWriteMode, setWriteMode] = useState(false);

    const [availablePoints, setAvailablePoints] = useState(AVAILABLE_POINTS);

    const increaseStat = useCallback((statToUpdate: keyof TSTATS) => {
        if (stats[statToUpdate] >=2) {
            return;
        }

        if (availablePoints <= 0) {
            return;
        }

        setStats({
            ...stats,
            [statToUpdate]: stats[statToUpdate] + 1
        });

        setAvailablePoints(availablePoints - 1);
        
    }, [stats, setStats, availablePoints, setAvailablePoints]);

    const decreaseStat = useCallback((statToUpdate: keyof TSTATS) => {
        if (stats[statToUpdate] <= -2) {
            return;
        }

        setStats({
            ...stats,
            [statToUpdate]: stats[statToUpdate] - 1
        });

        setAvailablePoints(availablePoints + 1);
        
    }, [stats, setStats, availablePoints, setAvailablePoints])

    const editCallback = useCallback(() => {
        setWriteMode(true);
    }, [setWriteMode]);

    const doneCallback = useCallback(() => {
        setWriteMode(false);
    }, [setWriteMode]);

    const resetCallback = useCallback(() => {
        setStats(DEFAULT_STATS);
        setAvailablePoints(AVAILABLE_POINTS);
    }, [setStats, setAvailablePoints]);

    const listOfStats = Object.keys(stats) as Array<keyof TSTATS>;

    return (
        <StyledDiv>
            {listOfStats.map((stat, idx) => {
                return <StatRow key={idx}
                    statName={stat}
                    statValue={stats[stat]}
                    availablePoints={availablePoints}
                    increaseStatCallback={increaseStat}
                    decreaseStatCallback={decreaseStat}
                    writeMode={inWriteMode}
                />
                }
            )}
            {inWriteMode ?
                <div>
                    <div>
                        <label>Available points: {availablePoints}</label>
                        <button onClick={resetCallback}>Reset</button>
                    </div>
                    <button onClick={doneCallback}>Done</button>
                </div>
            : <div><button onClick={editCallback}>Edit</button></div>}
        </StyledDiv>
    )
}

export default StatsBlock