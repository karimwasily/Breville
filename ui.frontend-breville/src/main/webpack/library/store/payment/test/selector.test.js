import { selectState, selectResults, selectIsLoading } from '../selector';
import { SLICE_NAME } from '../constant';

describe('selector', () => {
    const state = {
        [SLICE_NAME]: {
            isLoading: 'true',
            results: 'foo',
        },
    };

    it('selects the sub-state', () => {
        expect(selectState(state)).toEqual(state[SLICE_NAME]);
    });

    it('selects the results', () => {
        expect(selectResults(state)).toEqual('foo');
    });

    it('selects the loading state', () => {
        expect(selectIsLoading(state)).toEqual('true');
    });
});
