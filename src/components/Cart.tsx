import { useEvent, useStore } from 'effector-react/effector-react.cjs';
import {
    CartEvents,
    cartProductsView$,
    totalPrice$,
} from '../store/cart.store';
import { Box, IconButton, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi';

const cartProducts = [];
const totalPrice = 0;
const removeFromCart = (params: { id: string }) => {};

export const Cart = () => {
    // const cartProducts = useStore(cartProductsView$);
    // const totalPrice = useStore(totalPrice$);
    // const removeFromCart = useEvent(cartEvents.productRemovedFromCart);

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
