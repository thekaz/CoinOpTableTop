import React, {useState, useCallback} from 'react';
import { TSTATS, AVAILABLE_POINTS, DEFAULT_STATS, defaultButtonStyle } from '../utils/CONSTANTS';
import StatRow from './StatRow';
import styled from '@emotion/styled';

const StyledWrapperDiv = styled.div`padding:12px;`
const StyledGridContainerDiv = styled.div`display: grid; grid-template-columns: 200px 40px 50px;`;

interface PROPS {
    stats: TSTATS,
    setStats: (stats: TSTATS) => void,
    availablePoints: number,
    setAvailablePoints: (points: number) => void
}

const StyledButton = styled.button`
    ${defaultButtonStyle}
`;

function StatsBlock({stats, setStats, availablePoints, setAvailablePoints}: PROPS) {
    const [inWriteMode, setWriteMode] = useState(false);
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
        <StyledWrapperDiv>
            <StyledGridContainerDiv>
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
            <div>Available points:</div><div>{availablePoints}</div><div />
            </StyledGridContainerDiv>

            <div>
                {inWriteMode ? 
                    <>
                        <StyledButton onClick={doneCallback}>Done</StyledButton>
                        <StyledButton onClick={resetCallback}>Reset</StyledButton>
                    </> : 
                    <StyledButton onClick={editCallback}>Edit</StyledButton>
                }
            </div>
        </StyledWrapperDiv>
    )
}

export default StatsBlock