import ReactDOM from 'react-dom';

import { ChakraProvider, Grid } from '@chakra-ui/react';
import { Cart } from './components/Cart';
import { ProductsList } from './components/ProductsList';


const App = () => (
    <ChakraProvider>
        <Grid templateColumns='3fr 1fr'>
            <ProductsList />
            <Cart />
        </Grid>
    </ChakraProvider>
);

const app = document.getElementById('app');
ReactDOM.render(<App />, app);
