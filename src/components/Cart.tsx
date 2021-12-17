import { useEvent, useStore } from 'effector-react/effector-react.cjs';
import {
     cartProductsView$, totalPrice$, CartEvents, loading$,
} from '../store/cart.store';
import { Box, IconButton, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi';

export const Cart = () => {
    const cartProducts = useStore(cartProductsView$);
    const totalPrice = useStore(totalPrice$);
    const removeFromCart = useEvent(CartEvents.productRemovedFromCart);

    const renderEmpty = () => <Text>Empty</Text>;
    const renderProducts = () => (
        <Table variant="simple">
            <Tbody>
                {cartProducts.map((product) => (
                    <Tr key={product.id}>
                        <Td>{product.name}</Td>
                        <Td>
                            Count:
                            {product.count}
                        </Td>
                        <Td>
                            <IconButton
                                onClick={() => {
                                    removeFromCart({ id: product.id });
                                }}
                                aria-label="Remove"
                            >
                                <FiTrash />
                            </IconButton>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );

    return (
        <Box border="1px solid #ddd" p={4}>
            <Text fontSize="xl">Cart</Text>
            {cartProducts.length > 0 ? renderProducts() : renderEmpty()}
            <Text sx={{ py: 4 }}>Total: ${totalPrice}</Text>
        </Box>
    );
};
