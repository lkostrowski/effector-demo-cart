import ReactDOM from 'react-dom';
import { PokemonList } from './pokemon-list';

const App = () => (
    <div>
        <PokemonList />
    </div>
);

const app = document.getElementById('app');
ReactDOM.render(<App />, app);
