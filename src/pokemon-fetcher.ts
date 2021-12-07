import { createDomain } from 'effector-logger';
import { useStore } from 'effector-react';
import { useCallback } from 'react';

const apiUrl = 'https://pokeapi.co/api/v2/pokemon';

type PaginationParams = { offset: number; limit: number };

type PokemonListFetchFn = (params: PaginationParams) => Promise<{
    results: Array<{ name: string }>;
}>;

export class PokemonFetcher {
    private domain = createDomain('PokemonFetcher');

    private fetchPokemonsFx = this.domain.createEffect({
        name: 'Fetch pokemons FX',
        handler: (params: PaginationParams) => {
            return this.fetchFn(params);
        },
    });

    pokemonList$ = this.domain
        .createStore<Array<string> | null>(null, { name: 'pokemonList$' })
        .on(this.fetchPokemonsFx.doneData, (state, doneData) => {
            return doneData.results.map((r) => r.name);
        });

    loading$ = this.domain
        .createStore<boolean>(false, { name: 'loading$' })
        .on(this.fetchPokemonsFx, () => {
            return true;
        })
        .on(this.fetchPokemonsFx.done, () => {
            return false;
        })
        .on(this.fetchPokemonsFx.fail, () => {
            return false;
        });

    constructor(private fetchFn: PokemonListFetchFn) {}

    use() {
        const loading = useStore(this.loading$);
        const pokemonData = useStore(this.pokemonList$);

        const fetchPokemons = useCallback((params: PaginationParams) => {
            this.fetchPokemonsFx(params);
        }, []);

        return { loading, pokemonData, fetchPokemons };
    }
}

const fetchFn: PokemonListFetchFn = async (params: PaginationParams) => {
    return window
        .fetch(`${apiUrl}?limit=${params.limit}&offset=${params.offset}`)
        .then((r) => r.json());
};

export const pokemonFetcher = new PokemonFetcher(fetchFn);
