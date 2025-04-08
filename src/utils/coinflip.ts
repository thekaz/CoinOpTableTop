import { TFLIP_RESULT, TFLIP_RESULTS } from "./CONSTANTS";

export type TFLIP_RETURN = {
    result: TFLIP_RESULT,
    modifier: number
}

const flipACoin = () => Math.random() < 0.5;
export const doFlip = (modifier: number): TFLIP_RETURN => {
    if (modifier > 0) {
        return {result: {pass: true, auto: true}, modifier: modifier - 1};
    }
    if (modifier < 0) {
        return {result: {pass: false, auto: true}, modifier: modifier + 1};
    }
    return {result: {pass: flipACoin(), auto: false}, modifier}
};

export const collateResults = (results: TFLIP_RESULTS) => {
    const flipResultsKeys: Array<keyof TFLIP_RESULTS> = Object.keys(results) as any;
    return flipResultsKeys.reduce((prev, curr) => {
        return results[curr]?.pass ? prev + 1 : prev;
    }, 0);
}