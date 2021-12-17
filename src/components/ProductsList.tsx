import { useEvent, useStore } from 'effector-react/effector-react.cjs';
import { products$ } from '../store/products.store';
import { CartEvents, loading$ } from '../store/cart.store';
import { Box, Button, Container, Image, Text } from '@chakra-ui/react';

export const ProductsList = () => {
    const products = useStore(products$);
    const addToCart = useEvent(CartEvents.productAddedToCart);
    const loading = useStore(loading$)

    return (
        <Container className='grid'>
            {products.map((product) => (
                <Box p={2} key={product.id}>
                    <Image src={product.imageUrl} />
                    <Text fontSize='lg'>{product.name}</Text>
                    <Text sx={{ my: 2 }} fontSize='sm'>
                        ${product.price}
                    </Text>
                    <Button
                        onClick={() => addToCart({ id: product.id })}
                        isFullWidth
                        colorScheme='blue'
                    >
                        Add to cart
                    </Button>
                </Box>
            ))}
            {loading && <Text>Updating something in server...</Text>}
        </Container>
    );
};