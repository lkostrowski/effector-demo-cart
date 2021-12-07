import { pokemonFetcher } from './pokemon-fetcher';
import { useEffect, useRef, useState } from 'react';
import { combine, createDomain, restore } from 'effector';
import { PaginationStore } from './pagination.store';

export const PokemonList = () => {
    const paginationStore = useRef(new PaginationStore('PokemonListPagination'));
    const { page, decrementPage, incrementPage, setLimit, limit, offset } =
        paginationStore.current.use();

    const { pokemonData, fetchPokemons, loading } = pokemonFetcher.use();

    useEffect(() => {
        fetchPokemons({ limit: limit, offset: offset });
    }, []);

    useEffect(() => {
        fetchPokemons({ limit: limit, offset: offset });
    }, [offset]);

    return (
        <div>
            <ul>
                <h1>Pokemons</h1>
                {pokemonData &&
                    pokemonData.map((pokemonName) => (
                        <li key={pokemonName}>{pokemonName}</li>
                    ))}
            </ul>
            <div>
                <div style={{ margin: 50 }}>
                    <span style={{ marginRight: 50 }}>Limit</span>
                    <select
                        value={limit}
                        onChange={(e) => {
                            const newValue = parseInt(e.target.value);
                            setLimit(newValue);
                        }}
                    >
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div style={{ margin: 50 }}>
                    <span style={{ marginRight: 50 }}>Page</span>
                    <button
                        onClick={() => decrementPage()}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <span style={{ margin: 20 }}>{page}</span>
                    <button onClick={() => incrementPage()}>Next</button>
                </div>
            </div>
            {loading && <p>Loading...</p>}
        </div>
    );
};
