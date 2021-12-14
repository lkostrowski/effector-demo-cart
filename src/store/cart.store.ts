import { combine, createEvent, createStore, merge } from 'effector-logger';
import { products$ } from './products.store';
import { createEffect } from 'effector/effector.cjs';
gs
const productAddedToCart = createEvent<{ id: string }>();
const productRemovedFromCart = createEvent<{ id: string }>();

export const cartEvents = {
    productAddedToCart,
    productRemovedFromCart,
};

type ProductsInCard = {
    [productID: string]: number;
};

const cartProducts$ = createStore<ProductsInCard>({})
    .on(productAddedToCart, (state, payload) => {
        return {
            ...state,
            [payload.id]: state[payload.id] ? state[payload.id] + 1 : 1,
        };
    })
    .on(productRemovedFromCart, (state, payload) => {
        const newState = { ...state };
        delete newState[payload.id];

        return newState;
    });

const addProductFx = createEffect(async (id: string) => {
    // Fetch POST

    await new Promise(res => setTimeout(res, 1000))
});

const removeProductFx = createEffect(async (id: string) => {
    // Fetch DELETE
    await new Promise(res => setTimeout(res, 1000))
});

const fetchEvents = merge([addProductFx, removeProductFx]);
const fetchEventsDone = merge([addProductFx.finally, removeProductFx.finally]);

export const loading$ = createStore(false).on(fetchEvents, () => true).on(fetchEventsDone, () => false);

productAddedToCart.watch((payload) => addProductFx(payload.id));
productRemovedFromCart.watch((payload) => removeProductFx(payload.id));

const cartProductsArray$ = cartProducts$.map((productsRecord) =>
    Object.entries(productsRecord).map(([productID, productCount]) => {
        return {
            id: productID,
            count: productCount,
        };
    }),
);

export const cartProductsView$ = combine(
    {
        allProducts: products$,
        cartProductsArr: cartProductsArray$,
    },
    ({ cartProductsArr, allProducts }) => {
        return cartProductsArr.map((cartProduct) => ({
            ...cartProduct,
            ...allProducts.find((p) => p.id === cartProduct.id)!,
        }));
    },
);

export const totalPrice$ = cartProductsView$.map((products) =>
    products.reduce(
        (price, product) => price + product.price * product.count,
        0,
    ),
);
