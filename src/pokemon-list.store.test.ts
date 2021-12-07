import { PokemonListFetchFn, PokemonListStore } from './pokemon-list.store';

describe('PokemonListStore', () => {
    let store: PokemonListStore;
    let fetchFn: jest.MockedFunction<PokemonListFetchFn>;

    beforeEach(() => {
        fetchFn = jest.fn();
        fetchFn.mockImplementation(async () => {
            return {
                results: [{ name: 'Charizard' }, { name: 'Bulbasaur' }],
            };
        });
        store = new PokemonListStore(fetchFn);
    });

    it('List is empty by default', () => {
        expect(store.pokemonList$.getState()).toBeNull();
    });

    it('Loading is false initially', () => {
        expect(store.loading$.getState()).toBe(false);
    });

    it('Calls fetch function with proper params and saves results in store', async () => {
        await store.fetchPokemonsList({ offset: 50, limit: 50 });

        expect(fetchFn).toBeCalledWith({ offset: 50, limit: 50 });
        expect(store.pokemonList$.getState()).toEqual([
            'Charizard',
            'Bulbasaur',
        ]);
    });

    it('Sets loading flag to true, when loading and false when resolved', async () => {
        const loadingStates: boolean[] = [];

        store.loading$.watch((state) => {
            loadingStates.push(state);
        });

        await store.fetchPokemonsList({ offset: 50, limit: 50 });

        expect(loadingStates).toEqual([false, true, false]);
    });
});
