import ReactDOM from 'react-dom';
import { useStore } from 'effector-react';
import { products$ } from './products';
import {
    Button,
    ChakraProvider,
    Text,
    Container,
    Grid,
    Image,
    Box,
} from '@chakra-ui/react';

const ProductsList = () => {
    const products = useStore(products$);

    return (
        <Container className="grid">
            {products.map((product) => (
                <Box p={2} key={product.id}>
                    <Image src={product.imageUrl} />
                    <Text fontSize="lg">{product.name}</Text>
                    <Text sx={{ my: 2 }} fontSize="sm">
                        ${product.price}
                    </Text>
                    <Button isFullWidth colorScheme="blue">
                        Add to cart
                    </Button>
                </Box>
            ))}
        </Container>
    );
};

const Cart = () => {
    return (
        <Box border="1px solid #ddd" p={4}>
            <Text fontSize="xl">Cart</Text>
            <Text>TODO Implement me</Text>
        </Box>
    );
};

const App = () => (
    <ChakraProvider>
        <Grid templateColumns="3fr 1fr">
            <ProductsList />
            <Cart />
        </Grid>
    </ChakraProvider>
);

const app = document.getElementById('app');
ReactDOM.render(<App />, app);
